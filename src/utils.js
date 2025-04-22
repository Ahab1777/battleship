

export function stringToArray(string) {
    const rowString = string[0]
    const row = rowString.charCodeAt(0);
    const column = parseInt(string.slice(1), 10);
    //check if coordinate is valid
    // if (!(row >= 65 && row <= 74) || !(column >= 1 && column <= 10)) {
    //     throw new Error("Invalid coordinate");
    // }
    return [row - 65, column - 1]
}

export function checkIfStringOutOfBounds(coordinate) {
    if (typeof coordinate !== 'string') {
        throw new Error(`Coordinate (${coordinate}) is not a string`);
    }
    const targetCoordinate = stringToArray(coordinate)
    if (
        targetCoordinate[0] < 0 ||
        targetCoordinate[0] > 9 ||
        targetCoordinate[1] < 0 ||
        targetCoordinate[1] > 9
    ) {
        return true
    } 
    else {
        return false
    }
}

export function checkIfArrayOutOfBounds(coordinate) {
    if (!Array.isArray(coordinate)) {
        throw new Error(`Coordinate (${coordinate}) is not an array`)
    }
    if (
        coordinate[0] < 0 ||
        coordinate[0] > 9 ||
        coordinate[1] < 0 ||
        coordinate[1] > 9
    ) {
        return true
    } 
    else {
        return false
    }
}

export function arrayToString(array){
    const [row, column] = array;
    //check if position is valid
    // if (!(row >= 0 && row <= 9) || !(column >= 0 && column <= 9)) {
    //     throw new Error(`Invalid position - Array = [${row},${column}]`);
    // }
    const rowString = String.fromCharCode(row + 65);
    const columnString = (column + 1).toString();
    return rowString + columnString;
}

// export function generateRandomCoordinate(shipSize = null, originCoordinate = null) { // Accepts originCoordinate for correctly positioning ships based on their sizes
//     // Roll random coordinate
//     const columns = 'ABCDEFGHIJ';
//     const rows = 10;

//     let randomCoordinate;

    
//     if (originCoordinate) {
//         const direction = Math.floor(Math.random() * 2); // 0 for vertical, 1 for horizontal
//         //if shipSize + originCoordinate direction vertex out of bounds, repeat
//         const [colOrigin, rowOrigin] = this.humanPlayer.gameboard.convertStringCoordinateToArrayPosition(originCoordinate)            
        
        
//         let rowNewRandomCoordinate;
//         let colNewRandomCoordinate;

//         const attempts = 1000;
//         let timesAttempted = 0;
//         do {
//             switch (direction) {
//                 case 0: // Vertical
//                     if ((rowOrigin + shipSize) > 9) {
//                         rowNewRandomCoordinate = rowOrigin - shipSize
//                         colNewRandomCoordinate = colOrigin;
//                     }
//                     else{
//                         rowNewRandomCoordinate = rowOrigin + shipSize
//                         colNewRandomCoordinate = colOrigin;
//                     }
//                     break;
//                 case 1: // Horizontal
//                     if ((colOrigin + shipSize) > 9) {
//                         rowNewRandomCoordinate = rowOrigin;
//                         colNewRandomCoordinate = colOrigin - shipSize;
//                     }
//                     else{
//                         rowNewRandomCoordinate = rowOrigin;
//                         colNewRandomCoordinate = colOrigin + shipSize;
//                     }
//                     break
//                 default:
//                     break;
//             }
//             console.log(`Attempting to convert ${colNewRandomCoordinate},${rowNewRandomCoordinate}`)

//             randomCoordinate = arrayToString([colNewRandomCoordinate, rowNewRandomCoordinate])

//             console.log(`${colNewRandomCoordinate},${rowNewRandomCoordinate} is converted into ${randomCoordinate}`)

//             timesAttempted++
//             if (timesAttempted >= attempts) {
//                 throw new Error('Max number of attempts reached')
//             }
//         } while(
//             rowNewRandomCoordinate < 0 ||
//             rowNewRandomCoordinate > 9 ||
//             colNewRandomCoordinate < 0 || 
//             colNewRandomCoordinate > 9 || 
//             this.defendingPlayer.gameboard.squareHitStatus(randomCoordinate))


//         return randomCoordinate
//     }

//     do {
//         const randomColumn = columns[Math.floor(Math.random() * columns.length)];
//         const randomRow = Math.floor(Math.random() * rows) + 1;
//         randomCoordinate = `${randomColumn}${randomRow}`;
//     } while (this.defendingPlayer.gameboard.squareHitStatus(randomCoordinate));
//     return randomCoordinate;
// }