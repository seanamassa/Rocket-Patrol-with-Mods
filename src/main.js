/* 
Sean Massa
Rocket Patrol "Pending title"
aprox 8 hours
Mods added:
1. Added a UFO class that moves faster than the spaceships and awards more points on hit (5 Points)
2: Display time remaining on screen in seconds (3 points)
3: Implemented a timing/scoring mechanism that adds time to the timer on hit and subrtracts time for misses (5 points)
4: Added high score tracking (1 point)
5: 

*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config)

//reverse keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT


// set UI sizes 
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
