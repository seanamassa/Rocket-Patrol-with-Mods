class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene")
    }

    preload(){
        // load images/ tile sprires
        this.load.image('rocket', './assets/rocket3.png')
        this.load.image('spaceship', './assets/spaceship2-1.png')
        this.load.image('starfield', './assets/starfield.png')
        this.load.image('ufo', './assets/ufo3.png')
        this.load.image('menu', './assets/mainMenu.png')
        
        // load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
        this.load.audio('music', 'assets/music.wav');
                
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })


    }

    create(){
    // Add the menu image and position it at the top-left corner
    let menuImage = this.add.image(0, 0, 'menu').setOrigin(0, 0);

    // FORCE IT TO FILL THE SCREEN
    menuImage.setDisplaySize(game.config.width, game.config.height);


        //animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0, 
                end: 9, 
                first: 0
            }),
            frameRate: 30
        })

        let menuConfig = {
            fontFamily: 'Impact',
            fontSize: '28px',
            backgroundColor: "#ff66ff",
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }

        // display menu text
        //this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL',menuConfig) .setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig)
        .setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5)

        //this.add.text(20,20, "Rocket Patrol Menu")
        //this.scene.start("playScene")
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        
        // change difficulty on menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
          }
    }
 
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            ufoSpeed: 7,
            gameTimer: 60000    
          }
          this.sound.play('sfx-select')
          this.scene.start('playScene')    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            ufoSpeed: 12,
            gameTimer: 45000    
          }
          this.sound.play('sfx-select')
          this.scene.start('playScene')    
        }
      } 
        
}