const Gameboard = (() => {
    const gameboard = []
    const winningMoves = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    const setGameboard = (square, marker) => gameboard.push({square, marker}) 
    const getGameboard = () => gameboard;

    const checkWinner = (boardmoves, winningmoves) => {

        //Maps out move numbers in array
        const xBoardMoves = boardmoves.map((index) => index).filter((items) => items.marker === 'X')
        const xBoardMovesMap = xBoardMoves.map((index) => index.square);

        const oBoardMoves = boardmoves.map((index) => index).filter((items) => items.marker === 'O')
        const oBoardMovesMap = xBoardMoves.map((index) => index.square);

        //Checks both arrays for winning combos
        const xHasWinningCombination = winningmoves.some(winningCombination =>
            winningCombination.every(value => xBoardMovesMap.includes(value))
        );
        const oHasWinningCombination = winningmoves.some(winningCombination =>
            winningCombination.every(value => oBoardMovesMap.includes(value))
        );

        //Returns results of matching items
        if (xHasWinningCombination) {
            return "XXXXXX winning combination!";
        } 
        else if(oHasWinningCombination) 
        {
            return "OOOOOO winning combination!";
        }
        else {
            return "No winning combination yet.";
        }   
    }

    return {
        winningMoves,
        setGameboard,
        getGameboard,
        checkWinner
    }
})();


const Players = (name, marker) => {
    return {name, marker}
}

const player1 = Players('Travis', 'X');
const player2 = Players('Bre', 'O');


// const displayController = (() => {

//     return {
//     }
// })()


const boardController = (() => {

    //PLayer Toggle
    let activePlayer = player1;

    const toggleActivePlayer = () => activePlayer === player2 ? activePlayer = player1 : activePlayer = player2;


    //Click Squares
    const squares = document.querySelectorAll('.square');

    squares.forEach((square, index) => {
        square.addEventListener('click', () => {
            square.textContent = activePlayer.marker;
            Gameboard.setGameboard(index, activePlayer.marker)
            toggleActivePlayer()
            Gameboard.checkWinner(Gameboard.getGameboard(), Gameboard.winningMoves)
            console.log(Gameboard.checkWinner(Gameboard.getGameboard(), Gameboard.winningMoves))
            
        })
    })




})()

