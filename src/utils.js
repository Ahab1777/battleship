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
    
    //grab squares within the docked ship
    const dockedShip = e.currentTarget;
    const squaresWithin = Array.from(dockedShip.children)
    //apply styling to them
    squaresWithin.forEach(square => {
        square.classList.add('dragging')
    })

    //add class to the whole ship being dragged so we can target it elsewhere
    dockedShip.classList.add('dragging-ship')
    


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
    console.log('dragEnds...')


    //grab squares within the docked ship
    const dockedShip = e.currentTarget;
    const squaresWithin = Array.from(dockedShip.children)
    //apply styling to them
    squaresWithin.forEach(square => {
        square.classList.remove('dragging')
    })

    //remove dragging class from boat
    dockedShip.classList.remove('dragging-ship')

    //add/remove effect to the selected squares    
}

export function dragEnter(e) {
    console.log('dragEnters...')
    e.preventDefault();
    e.target.classList.add('drag-over');

    
}

export function dragOver(e) {
    e.preventDefault();
    //select element being dragged
    const shipBeingDragged = document.querySelector('.dragging-ship')
    const squareOver = e.target

    //Grab the size of the ship bring dragged
    const shipSize = parseInt(shipBeingDragged.dataset.size, 10); // Converts to a number

    //DORMANT CODE
    // Get all data from text/plain
    const direction = 'vertical';
    
    e.target.classList.add('drag-over');
    
    const coordinate = stringToArray(e.target.dataset.pos);
    
    const playerSquareNodeList = document.querySelectorAll('.player-container .square');

    for (let i = 0; i < shipSize; i++) {
        let targetCoordinate;
        
        if (direction === 'horizontal') {
            targetCoordinate = [coordinate[0] + i, coordinate[1]];
        } else if (direction === 'vertical') {
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
    console.log('dragLeave...')
    const playerSquareNodeList = document.querySelectorAll('.player-container .square');
    playerSquareNodeList.forEach(square => {
        square.classList.remove('drag-over')
    })

    
}

export function drop(e, placeShipFunction) {
    const playerSquareNodeList = document.querySelectorAll('.player-container .square');
    playerSquareNodeList.forEach(square => {
        square.classList.remove('drag-over')
    })

    // display the draggable element

    //TODO Apply hide classe here
}