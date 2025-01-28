/* 
Sean Massa
Rocket Patrol II Soilent Green Invasion
aprox 8 hours
Mods added: (20 points total)
1. Added a UFO class that moves faster than the spaceships and awards more points on hit (5 Points) 
2: Display time remaining on screen in seconds (3 points) 
3: Implemented a timing/scoring mechanism that adds time to the timer on hit with a max time added of 120 seconds (5 points) 
4: Added high score tracking (1 point) 
5: Create a new title screen (3 points) 
6: Randomize the UFO position after each hit (1 point)
7: Speed of enemy shops gradually increases over time (1 point)
8: Added backround music to play on the play scene (1 point)

*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true, // Enables debugging
        },
    },    
    scene: [Menu, Play]
}

let game = new Phaser.Game(config)

//reverse keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT


// set UI sizes 
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
