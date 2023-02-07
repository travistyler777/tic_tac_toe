const Gameboard = (() => {
    const gameboard = []

    const setGameboard = (square, marker) => gameboard.push({square, marker}) 
    const getGameboard = () => gameboard;

    const checkWinner = () => {

        const winningMoves = [
            [1,2,3],
            [4,5,6],
            [7,8,9],
            [1,4,7],
            [2,5,8],
            [3,6,9],
            [1,5,9],
            [3,5,7]
        ];

        
        console.log(winningMoves[0]);
        console.log(gameboard.map(index => index.square))

        console.log(gameboard.diff(winningMoves[0]));

    }


    return {
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
            Gameboard.checkWinner()
            
            
        })
    })




})()

