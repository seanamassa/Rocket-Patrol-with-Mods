class UFO extends Phaser.GameObjects.Sprite{
    constructor (scene, x, y, texture, frame, pointValue){
        super(scene,x,y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        this.moveSpeed = 10
    }

    update(){
        //move spaceship left
        this.x -= this.moveSpeed

        // wrap from left to right edge
        if (this.x <= 0 - this.width){
            this.x = game.config.width
        }
}

// Reset position of UFO
reset() {
    this.x = game.config.width + Phaser.Math.Between(0, 100); // Randomize entry
    this.y = Phaser.Math.Between(borderUISize * 4, game.config.height - borderUISize * 4); // Randomize y-position
}
/*
    // rest position
    reset() {
        this.x = game.config.width
    }
        */
}
