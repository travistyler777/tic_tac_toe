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

  const lightWinningSquares = (boardSquares, winningMoves) => {
    const squareArr = winningMoves.flatMap((item) =>
      Array.from(boardSquares).filter((square, index) => item === index)
    );

    squareArr.forEach((square) => {
      square.classList.add("lightup");
    });
  };

  const displayWinner = () => {
    
  }

  

  const triggerConfetti = () => {
    // do this for 30 seconds
    let duration = 2 * 1000;
    let end = Date.now() + duration;

    (function frame() {
      // launch a few confetti from the left edge
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      // and launch a few from the right edge
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      // keep going until we are out of time
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };


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
    addMarkerToSquare

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

  const disableSquare = square => square.classList.add('disable');
  const disableAllSquares = (squares) => 
  {
    gameView.boardSquares.forEach((square) => {
        square.classList.add('disable');
    })
  }


  const checkWinner = (boardMoves, winningMoves) => {

        // console.log(boardMoves);
        //console.log(winningMoves);
      
        const xBoardMoves = boardMoves.map((index) => index).filter((items) => items.marker === "X");
        const xBoardMovesMap = xBoardMoves.map((index) => index.square);
        
        const oBoardMoves = boardMoves.map((index) => index).filter((items) => items.marker === "O");
        const oBoardMovesMap = oBoardMoves.map((index) => index.square);

        
        

        //Checks both arrays for winning combos
        const xHasWinningCombination = winningMoves.some((winningCombination) => 
        winningCombination.every((value) => xBoardMovesMap.includes(value))
        );
        const xFindWinningCombination = winningMoves.find((winningCombination) => 
        winningCombination.every((value) => xBoardMovesMap.includes(value))
        );

        const oHasWinningCombination = winningMoves.some((winningCombination) =>
        winningCombination.every((value) => oBoardMovesMap.includes(value))
        );
        const oFindWinningCombination = winningMoves.find((winningCombination) => 
        winningCombination.every((value) => oBoardMovesMap.includes(value))
        );
        

        //Returns results of matching items
        if (xHasWinningCombination) {
            //console.log(player1)
            disableAllSquares()
            console.log(lightWinningSquares(boardSquares, xFindWinningCombination))
        } else if (oHasWinningCombination) {
            //console.log(player2) 
            disableAllSquares()
            console.log(lightWinningSquares(boardSquares, oFindWinningCombination))
        } else {
            console.log('TIE')
            
        }
  };

  //Primary Gameplay Functionality.
  gameView.boardSquares.forEach((square, index) => {
    square.addEventListener("click", () => {
      
        
        gameModel.setGameboardData({square: index, marker: gameModel.getActivePlayer().marker})
        gameView.addMarkerToSquare(square, gameModel.getActivePlayer().marker)
        disableSquare(square);
        checkWinner(gameModel.getGameboardData(), gameModel.getWinningMoves(), index)
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