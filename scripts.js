//when I press down on the button an X or an O need to appear
//It also needs to check if I made three squares in a row. 
//If it did, then announce winner, if not switch players

gameBoard = {
    gameboard: [{square: ''},{square: ''},{square: ''},{square: ''},{square: ''},{square: ''},{square: ''},{square: ''},{square: ''}]
}

const createPlayer = (name, marker) => {
    return{name, marker}
}

const player1Input = document.querySelector('.player1-input');
const player2Input = document.querySelector('.player2-input');
const submitBtn = document.querySelector('.submit-btn');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const player1 = createPlayer(player1Input.value, 'X');
    const player2 = createPlayer(player2Input.value, 'O');



})

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
            console.log("Index: " + index)
            square.textContent = playerToggle(turnCount)
            gameBoard.gameboard[index].square = playerToggle(turnCount)
            checkWinner('Travis', 'X')  
            console.log(gameBoard.gameboard)
            turnCount++  
        })
    })
}

const playerToggle = (turnCount) => {
    return (turnCount % 2 === 0) ? 'X' : 'O';

}


const checkWinner =(player, marker) => {

    if(gameBoard.gameboard[0].square === marker && gameBoard.gameboard[1].square === marker && gameBoard.gameboard[2].square === marker)
    {console.log(player + " is the winner!");}
    else if(gameBoard.gameboard[3].square === marker && gameBoard.gameboard[4].square === marker && gameBoard.gameboard[5].square === marker)
    {console.log(player + " is the winner!");}
    else if(gameBoard.gameboard[6].square === marker && gameBoard.gameboard[7].square === marker && gameBoard.gameboard[8].square === marker)
    {console.log(player + " is the winner!");}
    else if(gameBoard.gameboard[0].square === marker && gameBoard.gameboard[3].square === marker && gameBoard.gameboard[6].square === marker)
    {console.log(player + " is the winner!");}
    else if(gameBoard.gameboard[1].square === marker && gameBoard.gameboard[4].square === marker && gameBoard.gameboard[7].square === marker)
    {console.log(player + " is the winner!");}
    else if(gameBoard.gameboard[2].square === marker && gameBoard.gameboard[5].square === marker && gameBoard.gameboard[8].square === marker)
    {console.log(player + " is the winner!");}
    else if(gameBoard.gameboard[0].square === marker && gameBoard.gameboard[4].square === marker && gameBoard.gameboard[8].square === marker)
    {console.log(player + " is the winner!");}
    else if(gameBoard.gameboard[2].square === marker && gameBoard.gameboard[4].square === marker && gameBoard.gameboard[6].square === marker)
    {console.log(player + " is the winner!");}
}






renderBoard()  
boardController()










