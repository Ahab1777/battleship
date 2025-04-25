import Ship from "./ship.js";

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
    
    //center dragging object on mouse
    const dragImage = e.currentTarget.cloneNode(true);
    dragImage.style.opacity = '0.5';
    document.body.appendChild(dragImage);
    const rect = e.target.getBoundingClientRect();
    const offsetX = rect.width / 2;  // Center horizontally
    const offsetY = 20; // Center vertically (20px is half of each square)
    e.dataTransfer.setDragImage(dragImage, offsetX, offsetY)

    //feed ship info into dataTransfer of dragNdrop
    const id = e.target.id
    const direction = e.target.dataset.direction || 'vertical'; // Default to vertical if not provided
    const shipLength = e.target.dataset.size;
    e.dataTransfer.setData('text/plain', JSON.stringify({
        direction: direction,
        shipLength: shipLength,
        id: id
    }))

    console.log(shipLength)
    
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
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
}

export function dragEnter(e) {
    console.log('dragEnters...')
    e.preventDefault();
    e.target.classList.add('drag-over');
}

export function dragOver(e) {
    e.preventDefault();
    //e.target.classList.add('drag-over');
    
    //select element being dragged
    const shipBeingDragged = document.querySelector('.dragging-ship')

    //Grab the size of the ship bring dragged
    const shipSize = parseInt(shipBeingDragged.dataset.size, 10); // Converts to a number

    //TODO - direction logic
    const direction = 'vertical';
    
    //Add drag-over class to squares that ship is hovering over    
    const coordinate = stringToArray(e.target.dataset.pos);
    const playerSquareNodeList = document.querySelectorAll('.player-container .square');

    for (let i = 0; i < shipSize; i++) {
        let targetCoordinate;
        let outOfBounds = false;
        
        if (direction === 'horizontal') {
            targetCoordinate = [coordinate[0] + i, coordinate[1]];
        } else if (direction === 'vertical') {
            targetCoordinate = [coordinate[0], coordinate[1] + i];
        }

        const targetCoordinateString = arrayToString(targetCoordinate);
        const targetSquare = Array.from(playerSquareNodeList).find(
            square => square.dataset.pos === targetCoordinateString
        );


        const statusClass = outOfBounds ? 'invalid-zone' : 'drag-over'
        
        if (targetSquare) {
            targetSquare.classList.add(statusClass);
        }
    }

    //Check for invalid positioning(hovering out of bounds)
    //check if the sum of ship size plus current square is out of bounds



}

export function dragLeave(e) {
    console.log('dragLeave...')
    const playerSquareNodeList = document.querySelectorAll('.player-container .square');
    playerSquareNodeList.forEach(square => {
        square.classList.remove('drag-over')
        square.classList.remove('invalid-zone')

    })

    
}

export function drop(e, placeShipFunction) {
    //create node of square from grid
    const playerSquareNodeList = document.querySelectorAll('.player-container .square');

    //Remove dropzone styling from squares
    playerSquareNodeList.forEach(square => {
        square.classList.remove('drag-over')
    })

    //grab ship info
    const shipInfo = JSON.parse(e.dataTransfer.getData('text/plain'));
    const shipSize = parseInt(shipInfo.shipLength, 10);
    const direction = shipInfo.direction
    let startCoordinate = stringToArray(e.target.dataset.pos)

    //use ship size to identify endCoordinate
    let targetCoordinate;
    //TODO - prevent player from drop on invalid zone
    if (direction === 'horizontal') {
        targetCoordinate = [(startCoordinate[0] + shipSize) - 1, startCoordinate[1]];
    } else if (direction === 'vertical') {
        targetCoordinate = [startCoordinate[0], (startCoordinate[1] + shipSize) - 1];
    }
    //convert coordinate to string to find the matching square
    const endCoordinate = arrayToString(targetCoordinate);

    //create new ship and convert startDirection back to string
    const newShip = new Ship(shipSize)
    startCoordinate = arrayToString(startCoordinate)
    //feed placeShip function
    placeShipFunction(newShip, startCoordinate, endCoordinate)

}
