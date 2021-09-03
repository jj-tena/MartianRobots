const fs = require("fs");

const Coordinate = require('./coordinate');
const Position = require('./position');

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
    const negativeLimit = new Coordinate(0,0);
    const positiveLimit = new Coordinate(lines[0].split(' ')[0], lines[0].split(' ')[1]);
    const set = new Set();
    for (let index = 1; index < lines.length; index = index + 2) {
        let position = new Position(lines[index].split(' ')[0], lines[index].split(' ')[1], lines[index].split(' ')[2]); 
        let futureCoordinate = new Coordinate(position.x, position.y);
        let outOfBonds = false;
        let newValue = 0;
        const instructions = lines[index + 1].split('');   
        for (let j = 0; j < instructions.length; j++) {
            switch (instructions[j]) {
                case 'R': {
                    position.direction = map.get(position.direction).get('R');
                    break;
                } case 'L': {
                    position.direction = map.get(position.direction).get('L');
                    break;
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
                    if(!set.has(sFutureCoordinate)){
                        if ((futureCoordinate.x < negativeLimit.x) || (futureCoordinate.y < negativeLimit.y) || (futureCoordinate.x > positiveLimit.x) || (futureCoordinate.y > positiveLimit.y)){
                            outOfBonds = true;
                            set.add(sFutureCoordinate);
                            break;
                        }
                        position.x = futureCoordinate.x;
                        position.y = futureCoordinate.y;
                    }
                }
                
            }
            if (outOfBonds) {
                break;
            }
        }
        let salida = `${position.x} ${position.y} ${position.direction}`;
        if (outOfBonds) salida += ' LOST'
        console.log(salida);
    }
}

main();