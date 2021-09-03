/* This class represents the position of the robot in the board,
which is characterised by the box that is occuping and the direction that is pointing */

const Coordinate = require('./coordinate');

class Position extends Coordinate {

    constructor(x, y, direction){
        super(x,y);
        this.direction = direction;
    }


    
}

module.exports = Position;