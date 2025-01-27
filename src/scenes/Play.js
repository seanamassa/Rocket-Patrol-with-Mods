const TIME_PENALTY = 2000; // Time penalty in milliseconds (2 seconds)

class Play extends Phaser.Scene{
    constructor() {
        super('playScene')
    }

    

    create(){
        //place tile sprite
        this.starfield = this.add.tileSprite(0 ,0 ,640 , 480, 'starfield').setOrigin(0,0)

        // green UI backround
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0)
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(0,0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)
        
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0,0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2,'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship',0 ,10).setOrigin(0,0)
        this.UFO01 = new UFO(this, game.config.width, borderUISize*7 + borderPadding*4, 'ufo',0 ,50).setOrigin(0,0)
        this.UFO01.moveSpeed = game.settings.ufoSpeed 
        //define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        // initialize score
        this.p1Score = 0
        //display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: "#843605",
            align: 'right',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)
        
        // GAME OVER flag
        this.gameOver = false

        // 60 second play clock 
        scoreConfig.fixedWidth = 0

        // console.log(game.settings.gameTimer); // Debugging log
        this.remainingTime = game.settings.gameTimer
        this.clock = this.time.delayedCall (game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null,this)

        // timer display
        
        this.timerText = this.add.text(
            game.config.width - borderUISize - borderPadding, // Position (right side)
            borderUISize + borderPadding,                   // Top margin
            `Time: ${(this.remainingTime / 1000).toFixed(1)}`, // Initial time in seconds
            {
                fontFamily: 'Courier',
                fontSize: '28px',
                color: '#FFFFFF',
                backgroundColor: '#F3B141',
                align: 'center',
                
            }
        ).setOrigin(1, 0); // Align text to the top-right corner


    }

    update(){
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.scene.restart()
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
          }
        this.starfield.tilePositionX -= 4

        if(!this.gameOver){
        this.p1Rocket.update() // update Rocket
        this.ship01.update() //update spaceships
        this.ship02.update()
        this.ship03.update()
        this.UFO01.update() // update UFO
        }
        // check collisions
        if(this.checkCollisionUFO(this.p1Rocket, this.UFO01)){
            //console.log('kaboom ship 01')
            this.p1Rocket.reset()
            //this.ship01.reset()
            this.UFOExplode(this.UFO01)

        }

        if(this.checkCollision(this.p1Rocket, this.ship03)){
            //console.log('kaboom ship 03')
            this.p1Rocket.reset()
            //this.ship03.reset()
            this.shipExplode(this.ship03)
          
        }

        if(this.checkCollision(this.p1Rocket, this.ship02)){
            //console.log('kaboom ship 02')
            this.p1Rocket.reset()
            //this.ship02.reset()
            this.shipExplode(this.ship02)

        }

        if(this.checkCollision(this.p1Rocket, this.ship01)){
            //console.log('kaboom ship 01')
            this.p1Rocket.reset()
            //this.ship01.reset()
            this.shipExplode(this.ship01)

        }
        
        
        let remainingTime = Math.max(0, this.clock.getRemaining()) / 1000 // Convert ms to seconds, avoid negatives
        this.timerText.text = `Time: ${remainingTime.toFixed(1)}` // Show to 1 decimal point
        console.log("Remaining Time: " + remainingTime)
        console.log("Current Timer Delay: " + this.clock.delay);

    }

    checkCollision(rocket,ship){
        // simple AABB checking
        if(rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y) {
                return true
            } else {
                return false
            }
    }


    shipExplode(ship){
        // temp hide ship
        ship.alpha = 0
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0)
        boom.anims.play('explode')              // play explosion animation
        boom.on('animationcomplete', () =>{     // callback after anim completes
            ship.reset()                        // reset ship position
            ship.alpha = 1                      // make ship visible
            boom.destroy()
            this.sound.play('sfx-explosion')                      // remove explosion sprite
        })
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score

        // add time to the clock on successful hit (3 seconds)
        this.clock.delay += 3000

        this.clock.delay = Phaser.Math.Clamp(this.clock.delay, 0, 120000); // max added time 120 seconds
 
    }
    checkCollisionUFO(rocket, UFO) {
        if(rocket.x < UFO.x + UFO.width &&
            rocket.x + rocket.width > UFO.x &&
            rocket.y < UFO.y + UFO.height &&
            rocket.height + rocket.y > UFO.y) {
            return true;
        } else {
            return false;
        }
    }
    
        
    UFOExplode(UFO){
         // temp hide ship
        UFO.alpha = 0
        //create explosion sprite at ship's position
        let boom = this.add.sprite(UFO.x, UFO.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode')              // play explosion animation
        boom.on('animationcomplete', () =>{     // callback after anim completes
            UFO.reset()                        // reset ship position
            UFO.alpha = 1                      // make ship visible
            boom.destroy()
            this.sound.play('sfx-explosion')                      // remove explosion sprite
        })
        this.p1Score += UFO.points
        this.scoreLeft.text = this.p1Score

        // add time to the clock on successful hit (5 seconds)
        this.clock.delay += 5000

        this.clock.delay = Phaser.Math.Clamp(this.clock.delay, 0, 120000); // max time added 120 seconds
    }

        
        
}


        
