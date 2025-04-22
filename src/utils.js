

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
