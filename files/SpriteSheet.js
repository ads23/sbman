// ============
// SPRITESHEET STUFF
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// Construct a "spritesheet" from the given `image`,
//
function SpriteSheet(image, width, height, celWidth, celHeight, numCols, numRows, numCels) {
    this.image = image;
    this.width = width;
    this.height = height;
    //this.scale = 1;
	
	this.sheetCells = [];
    var currCell;
    
    for (var row = 0; row < numRows; ++row) {
        for (var col = 0; col < numCols; ++col) {
            currCell = new Cell(image, col * celWidth, row * celHeight,
                                celWidth, celHeight); 
            this.sheetCells.push(currCell);
        }
    }
    
    // Remove any superfluous ones from the end
    this.sheetCells.splice(numCels);
}

function Cell(image, sx, sy, width, height) {
    this.sx = sx;
    this.sy = sy;
    this.width = width;
    this.height = height;
    this.image = image;
}

Cell.prototype.drawAt = function (ctx, x, y) {
    ctx.drawImage(this.image, 
                  this.sx, this.sy, this.width, this.height,
                  x, y, this.width, this.height);
};

/*Cell.prototype.drawCentredAt = function (ctx, cx, cy) {
    
    var w = this.width,
        h = this.height;
   
    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our sprite centred at the origin
	//console.log("sx and sy: " + this.sx + " " + this.sx);
	//console.log("-w/2 and -h/2: " + -w/2 + " " + -h/2);
    ctx.drawImage(this.image, 
                  this.sx, this.sy, this.width, this.height,
                  cx, cy, -w/2, -h/2);

};*/
