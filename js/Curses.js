var game = new Phaser.Game(1000, 800, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });
"use strict";
function preload() {
    game.load.image('pointer', 'assets/pointer.png');
    game.load.image('backdrop', 'assets/Crypt Sentinals.jpg');
    game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);
    game.load.spritesheet('button1', 'assets/button1_sprites.png', 311, 523);
    game.load.spritesheet('button2', 'assets/button2_sprites.png', 495.6, 606);
    game.load.spritesheet('button3', 'assets/button3_sprites.png', 309.6, 365);
    game.load.audio('heart', 'assets/Slow_HeartBeat01.wav');
    game.load.audio('fx', 'assets/Click On.mp3');
    //game.load.image('optionA', 'assets/optionA.png');
}
var turns = 10;
var health1 = 3; var health2 = 3; var health3 = 3;
var pace1 = 3; var pace2 = 3; var pace3 = 3; 
var sprite;
var timer;
var total = 30;
var background;
var heart;

function create() {
    //Aligns canvas to center
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.refresh();
    game.world.setBounds(0, 0, 2100, 1181);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    var ground = game.add.sprite(0, 0, 'backdrop');
    
    //Pointer is invisible so it is not distracting
    sprite = game.add.sprite(400, 300, 'pointer');
    sprite.anchor.setTo(0.5, 0.5);
    //Audio for buttons
    heart = game.add.audio('heart')
    heart.onDecoded.add(start, this);
    fx = game.add.audio('fx');
    
    fx.allowMultiple = true;

    //  Enable Arcade Physics for the sprite
    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    //  Tell it we don't want physics to manage the rotation
    sprite.body.allowRotation = false;
    
    //  Button Control
    var button1 = game.add.button( 40, 650, 'button1', actionOnClick1, this, 2, 1, 0);
    var button3 = game.add.button( 1300, 820, 'button3', actionOnClick3, this, 2, 1, 0);
    var button2 = game.add.button( 710, 576, 'button2', actionOnClick2, this, 2, 1, 0);
    button.onInputOver.add(over, this);
    button.onInputOut.add(out, this);
    button.onInputUp.add(up, this);
    //  Create our Timer
    var timer = game.time.create(false);
    timer.start();
    //  Set a TimerEvent to occur after 1 second
    timer.loop(1000, updateCounter, this);
   
    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.


}

function start()
{
   heart.fadeIn(30000);
}

function update() {

    sprite.rotation = game.physics.arcade.moveToPointer(sprite, 60, game.input.activePointer, 500);
    move_camera_by_pointer(game.input.mousePointer);
    move_camera_by_pointer(game.input.pointer1);

}

function render() {
    if(total == 0)
        {   
            game.debug.text('You Lose', 400, 120);
        }
    game.debug.text('Time Left: ' + total, 32, 120);
    game.debug.text('Explorer 1 health: ' + health1, 32, 140);
    game.debug.text('Explorer 1 Pace: ' + pace1, 32, 160);
    game.debug.text('Explorer 2 health: ' + health2 , 32, 180);
    game.debug.text('Explorer 2 Pace: ' + pace2, 32, 200);
    game.debug.text('Explorer 3 health: ' + health3 , 32, 220);
    game.debug.text('Explorer 3 Pace: ' + pace3, 32, 240);
    game.debug.text('Turns to escape: ' + turns, 800, 120);
    //game.debug.spriteBounds(button);
    //game.debug.spriteCorners(button, true, true);
    //game.debug.spriteInfo(sprite, 32, 32);

}

var o_mcamera;
function move_camera_by_pointer(o_pointer) {
    if (!o_pointer.timeDown) { return; }
    if (o_pointer.isDown && !o_pointer.targetObject) {
        if (o_mcamera) {
            game.camera.x += o_mcamera.x - o_pointer.position.x;
            game.camera.y += o_mcamera.y - o_pointer.position.y;
        }
        o_mcamera = o_pointer.position.clone();
    }
    if (o_pointer.isUp) { o_mcamera = null; }
}

// Button States
function up() {
    console.log('button up', arguments);
}

function over() {
    console.log('button over');
    
}

function out() {
    console.log('button out');
}

function actionOnClick1 () {
    //Double Back: Move one round back. All gain 1 health
    turns += 1;
    if(health1 != 3)
        {
            health1 += 1;
        }
    if(health2 != 3)
        {
            health2 += 1;
        }
    if(health3 != 3)
        {
            health3 += 1;
        }
    fx.play();
}

function actionOnClick2 () {
    //Fight the sentinel. All lose 1 pace, and 1 health1
    if(health1 > 0)
        {
            health1 -= 1;
        }
    if(health2 > 0)
        {
            health2 -= 1;
        }
    if(health3 > 0)
        {
            health3 -= 1;
        }
    if(pace1 > 0)
        {
            pace1 -= 1;
        }
     if(pace2 > 0)
        {
            pace2 -= 1;
        }
     if(pace3 > 0)
        {
            pace3 -= 1;
        }
    fx.play();
}

function actionOnClick3 () {
    //Hide. All lose 2 pace
    if(pace1 == 1)
        {
            pace1 -= 1;
        }
    else
    {
        if(pace1 > 0)
        {
            pace1 -= 2;
        }
    }
    if(pace2 == 1)
        {
            pace2 -= 1;
        }
    else
    {
        if(pace2 > 0)
        {
            pace2 -= 2;
        }
    }
    if(pace3 == 1)
        {
            pace3 -= 1;
        }
    else
    {
        if(pace3 > 0)
        {
            pace3 -= 2;
        }
    }
    fx.play();
}

// Timer Counter
function updateCounter() {
    if(total == 0)
        {
            timer.stop();
            return;
        }
    total--;
}
