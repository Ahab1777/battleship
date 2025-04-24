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

// Drag and drop functions

export function dragStart(e){
    console.log('drag starts...');

    //grab squares within the draggable div
    const shipElement = e.currentTarget;
    const squaresWithin = Array.from(shipElement.parentNode.children)
    console.log(squaresWithin)
    //apply styling to them
    squaresWithin.forEach(square => {
        square.classList.add('dragging')
        console.log(square.classList)
    })


    e.target.classList.add('dragging')
    console.log(e.target.classList)
    //const direction = e.target.dataset.direction || 'vertical'; // Default to vertical if not provided
    // const shipLength = e.target.dataset.size;
    // e.dataTransfer.setData('text/plain', JSON.stringify({
    //     direction: direction,
    //     shipLength: shipLength
    // }))
    
    // setTimeout(() => {
    //     e.target.classList.add('hide');
    // }, 0);
}

export function dragEnd(e){
    console.log('dragEnd')
    //use event delegation to target the clicked square
    //select all sibling of the square clicked
    //add/remove effect to the selected squares    
}

export function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');

    
}

export function dragOver(e) {
    e.preventDefault();
    console.log('drag')
    // Get all data from text/plain
    const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
    const numberOfSquaresToBeRendered = parseInt(dragData.shipLength, 10);
    const direction = dragData.direction;
    
    e.target.classList.add('drag-over');
    const coordinate = stringToArray(e.target.dataset.pos);
    const playerSquareNodeList = document.querySelectorAll('.player-container .square');

    for (let i = 0; i < numberOfSquaresToBeRendered; i++) {
        let targetCoordinate;
        
        if (direction === 'vertical') {
            targetCoordinate = [coordinate[0] + i, coordinate[1]];
        } else if (direction === 'horizontal') {
            targetCoordinate = [coordinate[0], coordinate[1] + i];
        }

        const targetCoordinateString = arrayToString(targetCoordinate);
        const targetSquare = Array.from(playerSquareNodeList).find(
            square => square.dataset.pos === targetCoordinateString
        );
        
        if (targetSquare) {
            targetSquare.classList.add('drag-over');
        }
    }
}

export function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

export function drop(e, placeShipFunction) {
    e.target.classList.remove('drag-over');

    // get the draggable element
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    // add it to the drop target
    e.target.appendChild(draggable);

    // display the draggable element
    draggable.classList.remove('hide');
}