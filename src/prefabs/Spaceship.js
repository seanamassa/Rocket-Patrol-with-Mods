class Spaceship extends Phaser.GameObjects.Sprite{
    constructor (scene, x, y, texture, frame, pointValue){
        super(scene,x,y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        this.moveSpeed = game.settings.spaceshipSpeed
    }

    update(){
        //move spaceship left and gradually increase speed
        this.x -= this.moveSpeed += 0.001

        // wrap from left to right edge
        if (this.x <= 0 - this.width){
            this.x = game.config.width
        }
    }

    // rest position
    reset() {
        this.x = game.config.width
        this.isHit = false; // Ensure hit status is reset
    }
}