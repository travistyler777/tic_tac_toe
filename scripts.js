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
    let bot = false;
    let gameover = false;

    const getGameboardData = () => gameboard;
    const setGameboardData = (value) => gameboard.push(value);
    const getWinningMoves = () => winningMoves;
    const getActivePlayer = () => activePlayer;
    const setActivePlayer = (value) => {activePlayer = value};
    const getBot = () => bot;
    const setBot = (value) => {bot = value}
    const getGameover = () => gameover;
    const setGameover = (value) => gameover = value;

    return {
        getGameboardData,
        setGameboardData,
        getWinningMoves,
        getActivePlayer,
        setActivePlayer,
        getBot,
        setBot,
        getGameover,
        setGameover


    };
})();

const gameView = (() => {
  const boardContainer = document.querySelector("#gameboard-container");
  const boardSquares = document.querySelectorAll(".square");
  const botToggle = document.querySelector(".switch-button-checkbox");
  const gameDisplay = document.querySelector("#game-display");
  const player1Input = document.querySelector(".player1-input");
  const player2Input = document.querySelector(".player2-input");
  const markerPointer = document.querySelector(".marker-pointer");
  const startBtn = document.querySelector("#start-btn");
  const restartBtn = document.querySelector("#restart-btn");

  const addMarkerToSquare = (square, marker) => square.innerHTML = `<span class="marker">${marker}</span>`;


  const displayMessage = (message) => {
    gameDisplay.textContent = message;
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
    addMarkerToSquare,
    triggerConfetti,
    displayMessage

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
  
  const disableAllSquares = () => 
  {
    gameView.boardSquares.forEach((square) => {
        square.classList.add('disable');
    })
  }

  const lightWinningSquares = (winningSquares) => {
    winningSquares.forEach((id) => {
      gameView.boardSquares[id].classList.add('lightup');
    }) 
  };

  const checkWinner = () => {

      console.log(gameModel.getGameboardData().length)
      
      const xBoardMoves = gameModel.getGameboardData().map((index) => index).filter((items) => items.marker === "X");
      const xBoardMovesMap = xBoardMoves.map((index) => index.square);
      
      const oBoardMoves = gameModel.getGameboardData().map((index) => index).filter((items) => items.marker === "O");
      const oBoardMovesMap = oBoardMoves.map((index) => index.square);


      //Checks both arrays for winning combos
      const xHasWinningCombination = gameModel.getWinningMoves().some((winningCombination) => 
      winningCombination.every((value) => xBoardMovesMap.includes(value))
      );
      const xFindWinningCombination = gameModel.getWinningMoves().find((winningCombination) => 
      winningCombination.every((value) => xBoardMovesMap.includes(value))
      );

      const oHasWinningCombination = gameModel.getWinningMoves().some((winningCombination) =>
      winningCombination.every((value) => oBoardMovesMap.includes(value))
      );
      const oFindWinningCombination = gameModel.getWinningMoves().find((winningCombination) => 
      winningCombination.every((value) => oBoardMovesMap.includes(value))
      );
      

      //Returns results of matching items
      if (xHasWinningCombination) {
          disableAllSquares();
          lightWinningSquares(xFindWinningCombination);
          gameView.triggerConfetti();
          gameView.displayMessage(`🎉 ${player1.name} Wins!`);
          gameModel.setGameover(true);
      }    
      if (oHasWinningCombination) {
          disableAllSquares();
          lightWinningSquares(oFindWinningCombination);
          gameView.triggerConfetti();
          gameView.displayMessage(`🎉 ${player2.name} Wins!`);
          gameModel.setGameover(true);
      }

      if (!oHasWinningCombination && gameModel.getGameboardData().length >= 9 && !xHasWinningCombination && gameModel.getGameboardData().length >= 9)
      {
        gameModel.setGameover(true);
        gameView.displayMessage(`💩 Tie Game!`);
        
      }

  };


  const botTurn = () => {
    if(gameModel.getGameover() === true) {return}

    const moves = gameModel.getGameboardData().map(x => x.square)
    const totalMoves = [0,1,2,3,4,5,6,7,8]
    const filteredMoves = totalMoves.filter(x => moves.indexOf(x) === -1)
    const randomIndex = Math.floor(Math.random() * filteredMoves.length)
    const randomMove = filteredMoves[randomIndex]
    
    gameModel.setGameboardData({square: randomMove, marker: 'O'})

    gameView.boardSquares[randomMove].innerHTML = '<span class="marker">O</span>';
    
    disableSquare(gameView.boardSquares[randomMove])
    
    gameModel.setActivePlayer(player1)
    
    checkWinner();
  }

  const startGame = () => {


    // if(gameView.botToggle.checked)
    // {
    //   console.log(gameView.botToggle.checked)
    // }
    // else 
    // {
    //   console.log(gameView.botToggle.checked)
    //   player1.name = gameView.player1Input.value
    //   player2.name = gameView.player2Input.value
  
    //   console.log(player1);
    //   console.log(player2);
    // }
    


  }

  //BUTTONS ----------------------

  //Bot Toggle Button
  gameView.botToggle.addEventListener('click', () => {
    gameModel.setBot(gameView.botToggle.checked);
  })

  //Start Button
  gameView.startBtn.addEventListener('click', (e) => {
    e.preventDefault()
    startGame()
  })

  //Gameboard Buttons
  gameView.boardSquares.forEach((square, index) => {
    square.addEventListener("click", () => {
      
      if(gameModel.getBot())
      {
        gameModel.setGameboardData({square: index, marker: gameModel.getActivePlayer().marker})
        gameView.addMarkerToSquare(square, gameModel.getActivePlayer().marker)
        checkWinner()
        botTurn()
      }
      else {
        gameModel.setGameboardData({square: index, marker: gameModel.getActivePlayer().marker})
        gameView.addMarkerToSquare(square, gameModel.getActivePlayer().marker)
        toggleActivePlayer()
        checkWinner()
        disableSquare(square);
      }
    });
  });


  return {
    createPlayer,
  };
})();


const player1 = gameController.createPlayer("Player 1", "X", "Human");
const player2 = gameController.createPlayer("Player 2", "O", "Human");

gameModel.setActivePlayer(player1);