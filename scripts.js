//when I press down on the button an X or an O need to appear
//It also needs to check if I made three squares in a row. 
//If it did, then announce winner, if not switch players

gameBoard = {
    gameboard: [{square: ''},{square: ''},{square: ''},{square: ''},{square: ''},{square: ''},{square: ''},{square: ''},{square: ''}]
}

const init = () => {
  
}


const renderBoard = () => {
    
    const boardContainer = document.querySelector('#gameboard-container');

    //Render Squares
    gameBoard.gameboard.forEach((value, index) => {
        const boardSquare = document.createElement('div');
        boardSquare.setAttribute('id', `square${index}`);
        boardSquare.setAttribute('class', 'square');
        boardContainer.appendChild(boardSquare);
        boardSquare.textContent = value.square;
    })
}

const boardController = () => {
    
    const boardSquare = document.querySelectorAll('.square')
    let turnCount = 0

    boardSquare.forEach((square, index) => {
        square.addEventListener('click', () => {
            console.log(index)
            square.textContent = playerToggle(turnCount); 
            turnCount++    
        })
    })
}

const playerToggle = (turnCount) => {
    if (turnCount % 2 === 0)
    {
        return 'X'
    }
    else {
        return 'O'
    }

}


const checkWinner =(player, marker) => {

    // if(gameBoard.gameboard[0].square === marker && gameBoard.gameboard[1].square === marker && gameBoard.gameboard[2].square === marker)
    // {console.log(player + " is the winner!");}
    // else if(gameBoard.gameboard[3].square === marker && gameBoard.gameboard[4].square === marker && gameBoard.gameboard[5].square === marker)
    // {console.log(player + " is the winner!");}
    // else if(gameBoard.gameboard[6].square === marker && gameBoard.gameboard[7].square === marker && gameBoard.gameboard[8].square === marker)
    // {console.log(player + " is the winner!");}
    // else if(gameBoard.gameboard[0].square === marker && gameBoard.gameboard[3].square === marker && gameBoard.gameboard[6].square === marker)
    // {console.log(player + " is the winner!");}
    // else if(gameBoard.gameboard[1].square === marker && gameBoard.gameboard[4].square === marker && gameBoard.gameboard[7].square === marker)
    // {console.log(player + " is the winner!");}
    // else if(gameBoard.gameboard[2].square === marker && gameBoard.gameboard[5].square === marker && gameBoard.gameboard[8].square === marker)
    // {console.log(player + " is the winner!");}
    // else if(gameBoard.gameboard[0].square === marker && gameBoard.gameboard[4].square === marker && gameBoard.gameboard[8].square === marker)
    // {console.log(player + " is the winner!");}
    // else if(gameBoard.gameboard[2].square === marker && gameBoard.gameboard[4].square === marker && gameBoard.gameboard[6].square === marker)
    // {console.log(player + " is the winner!");}
}

const createPlayer = (name, marker) => {
    return{name, marker}
}


const player1 = createPlayer('Travis', 'X');
const player2 = createPlayer('Bre', 'O');

console.log(player1.name)

renderBoard()  
boardController()










