function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please enter correct player name!");
    return;
  }
  resetGameStatus();
  activePlayerNameElement.textContent = players[0].name;
  gameAreaElement.style.display = "block";
}

function resetGameStatus() {
  gameIsOver = false;
  activePlayer = 0;
  currentRound = 1;
  gameOverElement.style.display = "none";
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
    }
  }
  for (let x of gameFieldElements) {
    x.textContent = "";
    x.classList.remove("disabled");
  }
}

function checkForGameOver() {
  for (let i = 0; i < 3; i++) {
    const a = gameData[i][0];
    if (a === 0) {
      continue;
    }
    let cnt = 0;
    for (let j = 0; j < 3; j++) {
      if (gameData[i][j] === a) {
        cnt++;
      }
    }
    if (cnt === 3) {
      return a;
    }
  }
  for (let i = 0; i < 3; i++) {
    const a = gameData[0][i];
    if (a === 0) {
      continue;
    }
    let cnt = 0;
    for (let j = 0; j < 3; j++) {
      if (gameData[j][i] === a) {
        cnt++;
      }
    }
    if (cnt === 3) {
      return a;
    }
  }
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }
  if (
    gameData[2][0] > 0 &&
    gameData[1][1] === gameData[2][0] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[1][1];
  }
  if (currentRound === 9) {
    return -1;
  }
  return 0;
}

function endGame(winnerId) {
  gameOverElement.style.display = "block";
  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.textContent = "You Won! " + winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a Draw!";
  }
  document.getElementById("mrinv").style.display = "none";
  gameIsOver = true;
}

function selectGameField(event) {
  if (gameIsOver === true) {
    return;
  }
  const selectedCol = event.target.dataset.col - 1;
  const selectedRow = event.target.dataset.row - 1;
  if (gameData[selectedRow][selectedCol] !== 0) {
    alert("Please select an empty field!");
    return;
  }
  event.target.textContent = players[activePlayer].symbol;
  event.target.classList.add("disabled");
  gameData[selectedRow][selectedCol] = activePlayer + 1;
  activePlayer = activePlayer ^ 1;
  activePlayerNameElement.textContent = players[activePlayer].name;
  const result = checkForGameOver();
  if (result !== 0) {
    endGame(result);
  }
  currentRound++;
}
