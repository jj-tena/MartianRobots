const fs = require("fs");

const Coordinate = require('./coordinate');
const Position = require('./position');

/*This methods reads the input written in the file named by the value of fileName,
it allows us to read multiple lines and store them in one variable which is sent to the main program*/
const readFile = async() => {
    const fileName = "file.txt";
    const promise = new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (error, data) => {
            if (error) {
                reject('Error');
            } else {
                resolve(data);
            }
        });

    });
    return promise;
}

/* This methods sets, as it's name says, the relationship between the directions, 
in order to store that information and access it with O(1) complexity, I have decided to
use a map which key is the direction that the robot is pointing and its value is another
map that contains as its key the action to do (spin to the left or to the right) and as 
its value the result(the direction we end pointing) of spinning to the specified way in 
the specified direction*/
const setDirectionsRelationship = () => {
    const map = new Map();
    map.set('N', new Map());
    map.get('N').set('L', 'W');
    map.get('N').set('R', 'E');
    map.set('S', new Map());
    map.get('S').set('L', 'E');
    map.get('S').set('R', 'W');
    map.set('W', new Map());
    map.get('W').set('L', 'S');
    map.get('W').set('R', 'N');
    map.set('E', new Map());
    map.get('E').set('L', 'N');
    map.get('E').set('R', 'S');
    return map;
}
  
const main = async() => {
    const data = await readFile();
    const map = setDirectionsRelationship();
    const lines = data.split('\n');
    //Here we set the limits of the board
    const negativeLimit = new Coordinate(0,0);
    const positiveLimit = new Coordinate(lines[0].split(' ')[0], lines[0].split(' ')[1]);
    /*Here we create a set that will contain all the coordenates in which previous robots have fallen off the board,
    technically it will contain an string version of the coordinate, so that two coordinates are only equal based
    on its parameters and not on the identity of the object itself. Using a set we can check if the future coordinate is valid
    with an O(1) complexity*/
    const set = new Set();
    for (let index = 1; index < lines.length; index = index + 2) {
        //Here we create the initial position of the robot
        let position = new Position(lines[index].split(' ')[0], lines[index].split(' ')[1], lines[index].split(' ')[2]); 
        let futureCoordinate = new Coordinate(position.x, position.y);
        let outOfBonds = false;
        let newValue = 0;
        const instructions = lines[index + 1].split('');   
        for (let j = 0; j < instructions.length; j++) {
            switch (instructions[j]) {
                //In this case we will spin to the right
                case 'R': {
                    position.direction = map.get(position.direction).get('R');
                    break;
                //In this case we will spin to the left
                } case 'L': {
                    position.direction = map.get(position.direction).get('L');
                    break;
                /*In this case we will try to move a step forward the direction we are currently pointing, if the robot
                falls trying to move forward, we will want to show in the output the last position of the robot before it fell,
                so before executing the move we need to check if the future position is a valid one, creating a temporary variable
                that stores that value, so that if it wasn't valid we wouldn't have deleted the value of the prevous
                position*/
                } case 'F': {
                    switch (position.direction) {
                        case 'N': {
                            newValue = parseInt(position.y) + 1;
                            futureCoordinate = new Coordinate(position.x, newValue);
                            break;
                        } case 'S': {
                            newValue = parseInt(position.y) - 1;
                            futureCoordinate = new Coordinate(position.x, newValue);
                            break;
                        } case 'E': {
                            newValue = parseInt(position.x) + 1;
                            futureCoordinate = new Coordinate(newValue, position.y);
                            break;
                        } case 'W': {
                            newValue = parseInt(position.x) - 1;
                            futureCoordinate = new Coordinate(newValue, position.y);
                            break;
                        }
                        default:
                            break;
                    }
                    let sFutureCoordinate = futureCoordinate.toString();
                    /*Here we check if another robot has fallen in the coordinate we are trying to go, but if someone had fallen there we would
                    simply ignore that order and remain in the current position*/
                    if(!set.has(sFutureCoordinate)){
                        //And here we check if we are the first robot that falls in that coordinate by surpassing the limits of the board
                        if ((futureCoordinate.x < negativeLimit.x) || (futureCoordinate.y < negativeLimit.y) || (futureCoordinate.x > positiveLimit.x) || (futureCoordinate.y > positiveLimit.y)){
                            outOfBonds = true;
                            set.add(sFutureCoordinate);
                            break;
                        }
                        //If the future coordinate is valid we execute the step and move there
                        position.x = futureCoordinate.x;
                        position.y = futureCoordinate.y;
                    }
                }
                
            }
            //If a robot has surpassed the limits of the board we don't keep processing the next orders of the robot
            if (outOfBonds) {
                break;
            }
        }
        //Here we print the output of each robot
        let salida = `${position.x} ${position.y} ${position.direction}`;
        if (outOfBonds) salida += ' LOST'
        console.log(salida);
    }
}

main();