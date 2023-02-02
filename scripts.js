//when I press down on the button an X or an O need to appear
//It also needs to check if I made three squares in a row. 
//If it did, then announce winner, if not switch players


const gameBoard = (squares) => {
    const boardContainer = document.querySelector("#gameboard-container");
    
    //Create squares
    for (let i = 0; i < squares; i++){
        const boardSquare = document.createElement('div');
        boardSquare.classList.add('square');
        boardContainer.appendChild(boardSquare);
    }
}

gameBoard(9)







