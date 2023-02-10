
const startGame = (startBool) => {
 
  let start = startBool;
  const startBtn = document.querySelector('.start-btn')
  const player1Input = document.querySelector('.player1-input') 
  const player2Input = document.querySelector('.player2-input')

  startBtn.addEventListener('click', (e) => {
    e.preventDefault()
    start = true;
    player1 = Players(player1Input.value, "X");
    player2 = Players(player2Input.value, "O");
    displayController.displayAlert(`${player1.name}'s turn`)
    console.log(start)
  })
  console.log(start);
  return {start}
}

const Players = (name, marker) => {

  return { name, marker };
};

let player1 = Players("Player 1", "X");
let player2 = Players("Player 2", "O");

const Gameboard = (() => {
  //Return if start button is not clicked


  const squares = document.querySelectorAll(".square");
  const restartBtn = document.querySelector(".restart-btn");

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


  const clear = () => {
    gameboard.length = 0;
    squares.forEach((square) => {
      square.innerHTML = '';
      square.classList.remove('disable');
      square.classList.remove('lightup');
    })
    displayController.displayAlert("Enter Player Names")
    boardController.activePlayer = player1;
  }
  
  const setGameboard = (square, marker) => gameboard.push({ square, marker });
  const getGameboard = () => gameboard;

  return {
    gameboard,
    restartBtn,
    squares,
    setGameboard,
    getGameboard,
    winningMoves,
    clear
  };


})();

const boardController = (activeplayer) => {



  //PLayer Toggle
  let activePlayer = activeplayer;

  const toggleActivePlayer = () =>
    activePlayer === player2
      ? (activePlayer = player1)
      : (activePlayer = player2);

  const disableDiv = (div) => {
    div.classList.add("disable");
  };

 
  Gameboard.restartBtn.addEventListener('click', () => {
    Gameboard.clear()
  });
  //Click Squares

  Gameboard.squares.forEach((square, index) => {
    square.addEventListener("click", () => {
      square.innerHTML =
        activePlayer.marker === "X"
          ? '<span class="marker">X</span>'
          : '<span class="marker">O</span>';
      Gameboard.setGameboard(index, activePlayer.marker);
      toggleActivePlayer();
      displayController.checkWinner(
        Gameboard.getGameboard(),
        Gameboard.winningMoves,
        activePlayer
      );

      disableDiv(square);
    });
  });
  return {
    activePlayer,
    disableDiv,
  };
};

const displayController = (() => {

  const gameDisplay = document.querySelector("#game-display");

  const displayAlert = (alert) => {
    gameDisplay.textContent = alert;
  };

  const disableAllSquares = () => {
    Gameboard.squares.forEach((square) => {
      square.classList.add("disable");
    });
  };

  const checkWinner = (boardmoves, winningmoves, activeplayer) => {
    const xBoardMoves = boardmoves
      .map((index) => index)
      .filter((items) => items.marker === "X");
    const xBoardMovesMap = xBoardMoves.map((index) => index.square);

    const oBoardMoves = boardmoves
      .map((index) => index)
      .filter((items) => items.marker === "O");
    const oBoardMovesMap = oBoardMoves.map((index) => index.square);

    //Checks both arrays for winning combos
    const xHasWinningCombination = winningmoves.some((winningCombination) =>
      winningCombination.every((value) => xBoardMovesMap.includes(value))
    );

    const oHasWinningCombination = winningmoves.some((winningCombination) =>
      winningCombination.every((value) => oBoardMovesMap.includes(value))
    );

    const xWinningCombinationFound = winningmoves.find((winningCombination) =>
      winningCombination.every((value) => xBoardMovesMap.includes(value))
    );
    const oWinningCombinationFound = winningmoves.find((winningCombination) =>
      winningCombination.every((value) => oBoardMovesMap.includes(value))
    );

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
          origin: { x: 0 }
        });
        // and launch a few from the right edge
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });

        // keep going until we are out of time
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
    

    //Returns results of matching items
    if (xHasWinningCombination) {
      lightWinningSquares(xWinningCombinationFound);
      triggerConfetti();
      disableAllSquares();
      return displayAlert(`🎉 ${player1.name} wins!`);
    } else if (oHasWinningCombination) {
      lightWinningSquares(oWinningCombinationFound);
      triggerConfetti();
      disableAllSquares();
      return displayAlert(`🎉 ${player2.name} wins!`);
    } else {
      if (boardmoves.length >= 9) {
        disableAllSquares();
        return displayAlert(
          "Tie Game!"
        );
      } else {
        //console.log(activeplayer);
        return activeplayer === player1
          ? displayAlert(`${player1.name}'s turn`)
          : displayAlert(`${player2.name}'s turn`);
      }
    }
  };

  const lightWinningSquares = (winningsquares) => {
    const squareArr = winningsquares.flatMap((item) =>
      Array.from(Gameboard.squares).filter((square, index) => item === index)
    );

    squareArr.forEach((square) => {
      square.classList.add("lightup");
    });
  };

  return {
    displayAlert,
    checkWinner,
  };
})();

boardController(player1);
startGame(false)
