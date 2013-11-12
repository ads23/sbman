// ====
// WALL
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Wall(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.cx;
    this.cy;
	this.width;
	this.height;
};

Wall.prototype = new Entity();

// Initial, inheritable, default values
Wall.prototype.cx = 0;
Wall.prototype.cy = 0;

Wall.prototype.update = function (du) {
	spatialManager.register(this);
};

Wall.prototype.getWidth = function () {
    return this.width;
};

Wall.prototype.getHeight = function () {
    return this.height;
};

Wall.prototype.render = function (ctx) {
    util.fillBox(ctx, this.cx, this.cy, this.width, this.height, "#cccccc");
	//ctx.strokeRect(this.x, this.y, this.width, this.height);
};
