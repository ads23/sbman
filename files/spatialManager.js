/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS

getNewSpatialID : function() {

    // TODO: YOUR STUFF HERE!
	return this._nextSpatialID++

},

register: function(entity) {
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();

    // TODO: YOUR STUFF HERE!
	this._entities[spatialID] = pos;
},

unregister: function(entity) {
    var spatialID = entity.getSpatialID();

    // TODO: YOUR STUFF HERE!
	this._entities[spatialID] = 0;
},

findEntityInRange: function(posX, posY, width, height) {

    // TODO: YOUR STUFF HERE!
    for (var ID in this._entities) {
        var e = this._entities[ID];
		
		/*if (util.square(posX - e.posX) + util.square(posY - e.posY)
			<= util.square(radius - e.radius)) {
				return e;
			}*/
		//console.log("posY + height < e.posY: " + posY + height + " < " + e.posY);
		//console.log("this._entities.length: " + this._entities.length);
		//console.log("e.posX: " + e.posX);
		//console.log("e.posY: " + e.posY);
		/*console.log("posX: " + posX);
		console.log("posY: " + posY);*/
		if (!(posY + height < e.posY ||
			posY > e.posY ||
			posX > e.posX + e.width ||
			posX < e.posX)) {
				return e;
		}
    }

},

render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";
	
    for (var ID in this._entities) {
        var e = this._entities[ID];
		//console.log("this._entities.length: " + this._entities.length);
		//console.log("e.posX: " + e.posX);
		//console.log("e.posY: " + e.posY);
        //util.strokeCircle(ctx, e.posX, e.posY, e.radius);
		ctx.strokeRect(e.posX, e.posY, e.width, e.height);
    }
    ctx.strokeStyle = oldStyle;
}

}
