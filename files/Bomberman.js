// ==========
// SHIP STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/
var g_cel = 0;

// A generic contructor which accepts an arbitrary descriptor object
function Bomberman(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.rememberResets();
    
    // Default sprite, if not otherwise specified
    this.spriteGoRight = g_sprites.bManRight;
	this.spriteGoLeft = g_sprites.bManLeft;
	this.spriteGoUp = g_sprites.bManUp;
	this.spriteGoDown = g_sprites.bManDown;
	this.delayCellSwitch = 10;
	
	this.walkDirection = "right";
    this.walking = false;
    // Set normal drawing scale, and warp state off
    //this._scale = 2;
    //this._isWarping = false;
};

Bomberman.prototype = new Entity();

Bomberman.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
};

Bomberman.prototype.KEY_UP = 'W'.charCodeAt(0);
Bomberman.prototype.KEY_DOWN  = 'S'.charCodeAt(0);
Bomberman.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
Bomberman.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);

//Bomberman.prototype.KEY_FIRE   = ' '.charCodeAt(0);

// Initial, inheritable, default values
//Bomberman.prototype.rotation = 0;
Bomberman.prototype.cx = 200;
Bomberman.prototype.cy = 200;
//Bomberman.prototype.velX = 0;
//Bomberman.prototype.velY = 0;
//Bomberman.prototype.launchVel = 2;
//Bomberman.prototype.numSubSteps = 1;

// HACKED-IN AUDIO (no preloading)
/*Bomberman.prototype.warpSound = new Audio(
    "sounds/shipWarp.ogg");

Bomberman.prototype.warp = function () {

    this._isWarping = true;
    this._scaleDirn = -1;
    this.warpSound.play();
    
    // Unregister me from my old posistion
    // ...so that I can't be collided with while warping
    spatialManager.unregister(this);
};

Bomberman.prototype._updateWarp = function (du) {

    var SHRINK_RATE = 3 / SECS_TO_NOMINALS;
    this._scale += this._scaleDirn * SHRINK_RATE * du;
    
    if (this._scale < 0.2) {
    
        this._moveToASafePlace();
        this.halt();
        this._scaleDirn = 1;
        
    } else if (this._scale > 1) {
    
        this._scale = 1;
        this._isWarping = false;
        
        // Reregister me from my old posistion
        // ...so that I can be collided with again
        spatialManager.register(this);
        
    }
};

Bomberman.prototype._moveToASafePlace = function () {

    // Move to a safe place some suitable distance away
    var origX = this.cx,
        origY = this.cy,
        MARGIN = 40,
        isSafePlace = false;

    for (var attempts = 0; attempts < 100; ++attempts) {
    
        var warpDistance = 100 + Math.random() * g_canvas.width /2;
        var warpDirn = Math.random() * consts.FULL_CIRCLE;
        
        this.cx = origX + warpDistance * Math.sin(warpDirn);
        this.cy = origY - warpDistance * Math.cos(warpDirn);
        
        this.wrapPosition();
        
        // Don't go too near the edges, and don't move into a collision!
        if (!util.isBetween(this.cx, MARGIN, g_canvas.width - MARGIN)) {
            isSafePlace = false;
        } else if (!util.isBetween(this.cy, MARGIN, g_canvas.height - MARGIN)) {
            isSafePlace = false;
        } else {
            isSafePlace = !this.isColliding();
        }

        // Get out as soon as we find a safe place
        if (isSafePlace) break;
        
    }
};
*/
Bomberman.prototype.update = function (du) {

    // Handle warping
/*    if (this._isWarping) {
        this._updateWarp(du);
        return;
    }*/
    
    // TODO: YOUR STUFF HERE! --- Unregister and check for death
	spatialManager.unregister(this);
	

    // Perform movement substeps
    /*var steps = this.numSubSteps;
    var dStep = du / steps;
    for (var i = 0; i < steps; ++i) {
        this.computeSubStep(dStep);
    }
	

    // Handle firing
    this.maybeFireBullet();

    // TODO: YOUR STUFF HERE! --- Warp if isColliding, otherwise Register*/
    if (this.isColliding())	{
		spatialManager.register(this);
		console.log("mega collider");
		return;
	}
	
    if (keys[this.KEY_UP]) {
        this.cy -= 2 * du;
		this.walkDirection = "up";
		this.walking = true;
    }
    if (keys[this.KEY_DOWN]) {
        this.cy += 2 * du;
		this.walkDirection = "down";
		this.walking = true;
    }
    if (keys[this.KEY_LEFT]) {
        this.cx -= 2 * du;
		this.walkDirection = "left";
		this.walking = true;
    }
    if (keys[this.KEY_RIGHT]) {
        this.cx += 2 * du;
		this.walkDirection = "right";
		this.walking = true;
    }
	
	if (!(keys[this.KEY_UP] || keys[this.KEY_DOWN] || keys[this.KEY_LEFT] || keys[this.KEY_RIGHT])) {
		this.walking = false;
	}
	
	
	spatialManager.register(this);

};

/*Bomberman.prototype.computeSubStep = function (du) {
    
    var thrust = this.computeThrustMag();

    // Apply thrust directionally, based on our rotation
    var accelX = +Math.sin(this.rotation) * thrust;
    var accelY = -Math.cos(this.rotation) * thrust;
    
    accelY += this.computeGravity();

    this.applyAccel(accelX, accelY, du);
    
    this.wrapPosition();
    
    if (thrust === 0 || g_allowMixedActions) {
        this.updateRotation(du);
    }
};

var NOMINAL_GRAVITY = 0.12;

Bomberman.prototype.computeGravity = function () {
    return g_useGravity ? NOMINAL_GRAVITY : 0;
};

var NOMINAL_THRUST = +0.2;
var NOMINAL_RETRO  = -0.1;

Bomberman.prototype.computeThrustMag = function () {
    
    var thrust = 0;
    
    if (keys[this.KEY_UP]) {
        thrust += NOMINAL_THRUST;
    }
    if (keys[this.KEY_DOWN]) {
        thrust += NOMINAL_RETRO;
    }
    
    return thrust;
};

Bomberman.prototype.applyAccel = function (accelX, accelY, du) {
    
    // u = original velocity
    var oldVelX = this.velX;
    var oldVelY = this.velY;
    
    // v = u + at
    this.velX += accelX * du;
    this.velY += accelY * du; 

    // v_ave = (u + v) / 2
    var aveVelX = (oldVelX + this.velX) / 2;
    var aveVelY = (oldVelY + this.velY) / 2;
    
    // Decide whether to use the average or not (average is best!)
    var intervalVelX = g_useAveVel ? aveVelX : this.velX;
    var intervalVelY = g_useAveVel ? aveVelY : this.velY;
    
    // s = s + v_ave * t
    var nextX = this.cx + intervalVelX * du;
    var nextY = this.cy + intervalVelY * du;
    
    // bounce
    if (g_useGravity) {

	var minY = g_sprites.bomberman.height / 2;
	var maxY = g_canvas.height - minY;

	// Ignore the bounce if the ship is already in
	// the "border zone" (to avoid trapping them there)
	if (this.cy > maxY || this.cy < minY) {
	    // do nothing
	} else if (nextY > maxY || nextY < minY) {
            this.velY = oldVelY * -0.9;
            intervalVelY = this.velY;
        }
    }
    
    // s = s + v_ave * t
    this.cx += du * intervalVelX;
    this.cy += du * intervalVelY;
};

Bomberman.prototype.maybeFireBullet = function () {

    if (keys[this.KEY_FIRE]) {
    
        var dX = +Math.sin(this.rotation);
        var dY = -Math.cos(this.rotation);
        var launchDist = this.getRadius() * 1.2;
        
        var relVel = this.launchVel;
        var relVelX = dX * relVel;
        var relVelY = dY * relVel;

        entityManager.fireBullet(
           this.cx + dX * launchDist, this.cy + dY * launchDist,
           this.velX + relVelX, this.velY + relVelY,
           this.rotation);
           
    }
    
};
*/
/*Bomberman.prototype.getRadius = function () {
    return (this.spriteGoRight.width / 2) * 0.9;
};*/

Bomberman.prototype.getWidth = function () {
    return this.spriteGoRight.width / 4;
};

Bomberman.prototype.getHeight = function () {
    return this.spriteGoRight.height;
};

/*Bomberman.prototype.takeBulletHit = function () {
    this.warp();
};

Bomberman.prototype.reset = function () {
    this.setPos(this.reset_cx, this.reset_cy);
    this.rotation = this.reset_rotation;
    
    this.halt();
};

Bomberman.prototype.halt = function () {
    this.velX = 0;
    this.velY = 0;
};

var NOMINAL_ROTATE_RATE = 0.1;

Bomberman.prototype.updateRotation = function (du) {
    if (keys[this.KEY_LEFT]) {
        this.rotation -= NOMINAL_ROTATE_RATE * du;
    }
    if (keys[this.KEY_RIGHT]) {
        this.rotation += NOMINAL_ROTATE_RATE * du;
    }
};
*/
Bomberman.prototype.render = function (ctx) {
    //var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    //this.sprite.scale = this._scale;
    /*this.sprite.drawWrappedCentredAt(
	ctx, this.cx, this.cy, this.rotation
    );*/
	
    //var cel = this.sprite.spriteSheet[g_cel];
	//console.log("sheetcellarray length: " + this.sprite.sheetCells.length);
	var length;
	
	if (this.walkDirection === "right") {
		this.spriteGoRight.sheetCells[g_cel].drawAt(ctx, this.cx, this.cy);
		length = this.spriteGoRight.sheetCells.length;
	}
	if (this.walkDirection === "left") {
		this.spriteGoLeft.sheetCells[g_cel].drawAt(ctx, this.cx, this.cy);
		length = this.spriteGoLeft.sheetCells.length;
	}
	if (this.walkDirection === "up") {
		this.spriteGoUp.sheetCells[g_cel].drawAt(ctx, this.cx, this.cy);
		length = this.spriteGoUp.sheetCells.length;
	}
	if (this.walkDirection === "down") {
		this.spriteGoDown.sheetCells[g_cel].drawAt(ctx, this.cx, this.cy);
		length = this.spriteGoDown.sheetCells.length;
	}
	
	if (this.walking) {
		--this.delayCellSwitch;
		if (!this.delayCellSwitch) {
			this.delayCellSwitch = 10;
			++g_cel;
			if (g_cel === length) g_cel = 0;
		}
	}
	else g_cel = 0
	
    //this.scale = origScale;
};
