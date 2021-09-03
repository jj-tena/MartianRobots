const Coordinate = require('./coordinate');

class Position extends Coordinate {

    constructor(x, y, direction){
        super(x,y);
        this.direction = direction;
    }


    
}

module.exports = Position;