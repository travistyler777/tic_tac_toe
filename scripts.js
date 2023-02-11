const gameModel = (() => {
  
    let gameboard = [];
    const winningMoves = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    let activePlayer;

    const getGameboardData = () => gameboard;
    const setGameboardData = (value) => gameboard.push(value);
    const getWinningMoves = () => winningMoves;
    const getActivePlayer = () => activePlayer;
    const setActivePlayer = (value) => {activePlayer = value};

    return {
        getGameboardData,
        setGameboardData,
        getWinningMoves,
        getActivePlayer,
        setActivePlayer,

    };
})();

const gameView = (() => {
  const boardContainer = document.querySelector("#gameboard-container");
  const boardSquares = document.querySelectorAll(".square");
  const botToggle = document.querySelector(".switch-button-checkbox");
  const gameDisplay = document.querySelector(".game-display");
  const player1Input = document.querySelector(".player1-input");
  const player2Input = document.querySelector(".player2-input");
  const markerPointer = document.querySelector(".marker-pointer");
  const startBtn = document.querySelector("#start-btn");
  const restartBtn = document.querySelector("#restart-btn");

  const addMarkerToSquare = (square, marker) => square.innerHTML = `<span class="marker">${marker}</span>`;
  const disableSquare = square => square.classList.add('disable');

  return {
    boardContainer,
    boardSquares,
    botToggle,
    gameDisplay,
    player1Input,
    player2Input,
    markerPointer,
    startBtn,
    restartBtn,
    addMarkerToSquare,
    disableSquare,

  };
})();

//Controller
const gameController = (() => {
  const createPlayer = (name, marker, type) => {
    return { name, marker, type };
  };

  const toggleActivePlayer = () => {
    if (gameModel.getActivePlayer() === player2) {
        gameView.markerPointer.classList.remove("pointer-position2");
        gameView.markerPointer.classList.add("pointer-position1");
        gameModel.setActivePlayer(player1)
    } 
    else {
        gameView.markerPointer.classList.remove("pointer-position1");
        gameView.markerPointer.classList.add("pointer-position2");
        gameModel.setActivePlayer(player2)
    }
  };

  //Primary Gameplay Functionality.
  gameView.boardSquares.forEach((square, index) => {
    square.addEventListener("click", () => {
      
        
        gameModel.setGameboardData({index: index, marker: gameModel.getActivePlayer().marker})
        gameView.addMarkerToSquare(square, gameModel.getActivePlayer().marker)
        gameView.disableSquare(square);
        
        toggleActivePlayer()

    });
  });

  return {
    createPlayer,
  };
})();

const player1 = gameController.createPlayer("Player 1", "X", "Human");
const player2 = gameController.createPlayer("Player 2", "O", "Human");

gameModel.setActivePlayer(player1);