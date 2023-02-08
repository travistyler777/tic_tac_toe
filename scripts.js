const Players = (name, marker) => {
    return {name, marker}
}

const player1 = Players('Player 1', 'X');
const player2 = Players('Player 2', 'O');

const Gameboard = (() => {

    const squares = document.querySelectorAll('.square');

    const gameboard = []
    const winningMoves = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    const setGameboard = (square, marker) => gameboard.push({square, marker}) 
    const getGameboard = () => gameboard;

    return {
        squares,
        setGameboard,
        getGameboard,
        winningMoves
    }
})();

const boardController = (() => {

    //PLayer Toggle
    let activePlayer = player1;

    const toggleActivePlayer = () => activePlayer === player2 ? activePlayer = player1 : activePlayer = player2;

    const disableDiv = (div) => {
        div.classList.add('disable');
    }

    //Click Squares

    Gameboard.squares.forEach((square, index) => {
        square.addEventListener('click', () => {
            square.innerHTML = activePlayer.marker === 'X' ? '<img class="marker" src="assets/x_image.png" />' : '<img class="marker" src="assets/o_image.png" />';
            Gameboard.setGameboard(index, activePlayer.marker)
            toggleActivePlayer()
            displayController.checkWinner(Gameboard.getGameboard(), Gameboard.winningMoves, activePlayer)
            //displayController.displayAlert
            //console.log(displayController.checkWinner(Gameboard.getGameboard(), Gameboard.winningMoves))
            disableDiv(square)
          
            
        })
    })
    return {
        activePlayer,
        disableDiv
    }
})()

const displayController = (() => {

    const gameDisplay = document.querySelector('#game-display')

    const displayAlert = (alert) => {
        gameDisplay.textContent = alert;
    }

    const checkWinner = (boardmoves, winningmoves, activeplayer) => {
        //Maps out move numbers in array
        const xBoardMoves = boardmoves.map((index) => index).filter((items) => items.marker === 'X')
        const xBoardMovesMap = xBoardMoves.map((index) => index.square);

        const oBoardMoves = boardmoves.map((index) => index).filter((items) => items.marker === 'O')
        const oBoardMovesMap = oBoardMoves.map((index) => index.square);

        //Checks both arrays for winning combos
        const xHasWinningCombination = winningmoves.some(winningCombination =>
            winningCombination.every(value => xBoardMovesMap.includes(value))
        );
        const oHasWinningCombination = winningmoves.some(winningCombination =>
            winningCombination.every(value => oBoardMovesMap.includes(value))
        );

    
        //Returns results of matching items
        if (xHasWinningCombination) {
            Gameboard.squares.forEach((square) => {
                boardController.disableDiv(square);
            })
            return displayAlert("Player 1 Wins!");
        } 
        else if(oHasWinningCombination) 
        {
            Gameboard.squares.forEach((square) => {
                boardController.disableDiv(square);
            })
            return displayAlert("Player 2 Wins!");
        }
        else {
            if (boardmoves.length >= 9){
                Gameboard.squares.forEach((square) => {
                    boardController.disableDiv(square);
                })
                return displayAlert("Tie Game. I'm dissapointed in you. You have failed me and have brough shame on your family name, forever dishonoring and tarnishing their legacy until the end of time.");
            }
            else {
                //console.log(activeplayer);
                return activeplayer === player1 ? displayAlert("Player X's turn") : displayAlert("Player O's turn");
            }
        }   
    }

    return {
        displayAlert,
        checkWinner
    }
})()

