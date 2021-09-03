//This class represents a square of the board

class Coordinate {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString(){
        return `x:${this.x},y:${this.y}`;
    }

}

module.exports = Coordinate;
