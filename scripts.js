const Gameboard = (() => {
    const gameboard = []

    const setGameboard = (square, marker) => gameboard.push({square, marker}) 
    const getGameboard = gameboard;

    return {
        setGameboard,
        getGameboard
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


const gameController = (() => {


    //PLayer Toggle
    let activePlayer = player1;

    const setActivePlayer = () => activePlayer === player1 ? activePlayer = player2 : activePlayer = player1;


    //Click Squares
    const squares = document.querySelectorAll('.square');

    squares.forEach((square, index) => {
        square.addEventListener('click', () => {
            square.textContent = activePlayer.marker;
            Gameboard.setGameboard(index, activePlayer.marker)
            setActivePlayer()
            console.log(Gameboard.getGameboard)
            
        })
    })




})()

