// =========
// ASTEROIDS
// =========
/*

A sort-of-playable version of the classic arcade game.


HOMEWORK INSTRUCTIONS:

You have some "TODO"s to fill in again, particularly in:

spatialManager.js

But also, to a lesser extent, in:

Rock.js
Bullet.js
Ship.js


...Basically, you need to implement the core of the spatialManager,
and modify the Rock/Bullet/Ship so that the register (and unregister)
with it correctly, so that they can participate in collisions.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// ====================
// CREATE BOMBERMAN
// ====================

function createBomberman() {

    entityManager.generateBomberman({
        cx : 200,
        cy : 200
    });
    
}

// ====================
// CREATE WALL
// ====================

function createWall() {

    entityManager.generateWall({
        cx : 0,
        cy : 0,
		width : g_canvas.width,
		height : g_canvas.height / 10
    });
    
}

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}


// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    
    processDiagnostics();
    
    entityManager.update(du);

    // Prevent perpetual firing!
    //eatKey(Ship.prototype.KEY_FIRE);
}

// GAME-SPECIFIC DIAGNOSTICS

var g_allowMixedActions = true;
//var g_useGravity = false;
//var g_useAveVel = true;
var g_renderSpatialDebug = false;

var KEY_MIXED   = keyCode('M');
//var KEY_GRAVITY = keyCode('G');
//var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');

//var KEY_HALT  = keyCode('H');
//var KEY_RESET = keyCode('R');

//var KEY_0 = keyCode('0');

//var KEY_1 = keyCode('1');
//var KEY_2 = keyCode('2');

//var KEY_K = keyCode('K');

function processDiagnostics() {

    if (eatKey(KEY_MIXED))
        g_allowMixedActions = !g_allowMixedActions;

/*    if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;*/

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    //if (eatKey(KEY_HALT)) entityManager.haltShips();

    //if (eatKey(KEY_RESET)) entityManager.resetShips();

/*    if (eatKey(KEY_0)) entityManager.toggleRocks();

    if (eatKey(KEY_1)) entityManager.generateBomberman({
        cx : g_mouseX,
        cy : g_mouseY,
        
        sprite : g_sprites.ship});

    if (eatKey(KEY_2)) entityManager.generateBomberman({
        cx : g_mouseX,
        cy : g_mouseY,
        
        sprite : g_sprites.ship2
        });

    if (eatKey(KEY_K)) entityManager.killNearestShip(
        g_mouseX, g_mouseY);*/
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    entityManager.render(ctx);

    if (g_renderSpatialDebug) spatialManager.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        /*ship2  : "images/ship_2.png",
        rock   : "images/rock.png"*/
		bManRight   : "images/bombermanWalkRight.png",
		bManLeft   : "images/bombermanWalkLeft.png",
		bManUp   : "images/bombermanWalkUp.png",
		bManDown   : "images/bombermanWalkDown.png"
		
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {
	//function SpriteSheet(image, width, height, celWidth, celHeight, numCols, numRows, numCels)
	g_sprites.bManRight  = new SpriteSheet(g_images.bManRight, 64, 24, 16, 24, 4, 1, 4);
	g_sprites.bManLeft  = new SpriteSheet(g_images.bManLeft, 64, 24, 16, 24, 4, 1, 4);
	g_sprites.bManUp  = new SpriteSheet(g_images.bManUp, 60, 23, 15, 23, 4, 1, 4);
	g_sprites.bManDown  = new SpriteSheet(g_images.bManDown, 60, 23, 15, 23, 4, 1, 4);
	
    //g_sprites.ship2 = new Sprite(g_images.ship2);
    //g_sprites.rock  = new Sprite(g_images.rock);

    //g_sprites.bullet = new Sprite(g_images.ship);
    //g_sprites.bullet.scale = 0.25;

    entityManager.init();
    createBomberman();
	createWall();

    main.init();
}

// Kick it off
requestPreloads();
