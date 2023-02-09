const Players = (name, marker) => {
    return {name, marker}
}

const player1 = Players('Player 1', 'X');
const player2 = Players('Player 2', 'O');


const Gameboard = (() => {

    const squares = document.querySelectorAll('.square');
    const restartBtn = document.querySelector('.restart-btn');

    let gameboard = []
    const winningMoves = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    const setGameboard = (square, marker) => gameboard.push({square, marker}) 
    const getGameboard = () => gameboard;
    const resetGameboard = () => {gameboard = []}

    // const resetGame = () => {
    //     displayController.displayAlert("Player X's turn");
    //     squares.forEach((square) => {
    //         square.innerHTML = '';
    //         square.classList.remove('disable');
    //     })
    //     boardController(player1);
    //     resetGameboard();
    //     //FIX
    //     console.log(Gameboard.getGameboard())
    // }

    restartBtn.addEventListener('click', () => {
        resetGame();
    })

    return {
        squares,
        setGameboard,
        getGameboard,
        winningMoves
    }
})();

const boardController = ((activeplayer) => {

    //PLayer Toggle
    let activePlayer = activeplayer;

    const toggleActivePlayer = () => activePlayer === player2 ? activePlayer = player1 : activePlayer = player2;

    const disableDiv = (div) => {
        div.classList.add('disable');
    }

    //Click Squares

    Gameboard.squares.forEach((square, index) => {
        square.addEventListener('click', () => {
            square.innerHTML = activePlayer.marker === 'X' ? '<span class="marker">X</span>' : '<span class="marker">O</span>';
            Gameboard.setGameboard(index, activePlayer.marker)
            toggleActivePlayer()
            displayController.checkWinner(Gameboard.getGameboard(), Gameboard.winningMoves, activePlayer)
            disableDiv(square)

          
            
        })
    })
    return {
        activePlayer,
        disableDiv
    }
})

boardController(player1)

const displayController = (() => {

    const gameDisplay = document.querySelector('#game-display')

    const displayAlert = (alert) => {
        gameDisplay.textContent = alert;
    }

    const disableAllSquares = () => {
        Gameboard.squares.forEach((square) => {
            square.classList.add('disable');
        })
    }

    const checkWinner = (boardmoves, winningmoves, activeplayer) => {
        
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

        const xWinningCombinationFound = winningmoves.find(winningCombination =>
            winningCombination.every(value => xBoardMovesMap.includes(value))
        );
        const oWinningCombinationFound = winningmoves.find(winningCombination =>
            winningCombination.every(value => xBoardMovesMap.includes(value))
        );
        

        //Returns results of matching items
        if (xHasWinningCombination) {
            lightWinningSquares(xWinningCombinationFound)
            disableAllSquares()
            return displayAlert("🎉 Player 1 Wins! 🎉");
        } 
        else if(oHasWinningCombination) 
        {
            console.log(oWinningCombinationFound)
            disableAllSquares()
            return displayAlert("🎉 Player 2 Wins! 🎉");
        }
        else {
            if (boardmoves.length >= 9){
                disableAllSquares()
                return displayAlert("Tie Game. I'm dissapointed in you. You both have failed me and have brough shame on your family names, forever dishonoring and tarnishing each of their legacy's until the end of time.");
            }
            else {
                //console.log(activeplayer);
                return activeplayer === player1 ? displayAlert("Player X's turn") : displayAlert("Player O's turn");
            }
        }   
    }

    const lightWinningSquares = (winningsquares) => {
        const squareArr = winningsquares.flatMap(item => Array.from(Gameboard.squares).filter((square, index) => item === index));

        squareArr.forEach((square) => {
            square.classList.add('lightup');
        })

      };

    

    return {
        displayAlert,
        checkWinner
    }
})()
