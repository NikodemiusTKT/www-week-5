
'use strict'


// Two dimensional array structure for holding the tic-tac-toe games

var board = [['','',''], ['','',''], ['','','']];
var rowInd;

// Constants for holding player numbers and marks to be drawn
const player1 = 1;
const player2 = 2;
const mark1 = "x";
const mark2 = "o";

// Winner and turn on global constant
var winner;
var turn;

// Hold columns on global constant
const cols = document.querySelectorAll('.col');
startGame();

// Function for changing displayed message on screen
function changeMessage(msg) {
  document.getElementById("msg").innerText = msg;
}

// Function for checking 3 by 3 grid for win status
function checkWinner(grid) {
  // check for horizontal win
  for (var i = 0; i < 3; i++) {
    if (grid[i][0] !== 0 && grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) {
      return 1;
    }
  }
  // check for vertical win
  for (var j = 0; j < 3; j++) {
    if (grid[0][j] !== 0 && grid[0][j] === grid[1][j] && grid[0][j] === grid[2][j]) {
      return 1;
    }
  }
  // check for diagonal top-left-bottom-right
  if (grid[0][0] !== 0 && grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2]) {
    return 1;
  }
  // check for diagonal bottom-left-top-right
  if (grid[2][0] !== 0 && grid[2][0] === grid[1][1] && grid[2][0] === grid[0][2]) {
    return 1;
  }
  return 0;
}

// Function for checking 3 by 3 grid for a tie
function checkTie(grid) {
  for (var i=0; i < 3; i++) {
    for (var j=0; j < 3; j++) {
      if (grid[i][j] === 0)
        return false;
    }
  }
  return true;
}





// Function for showing prompt messages on the screen
function showPrompt(situation) {
  document.querySelector(".prompt").style.display = "inline";
  document.querySelector(".prompt").innerText = situation;
}

// Function for changing turns between players
function turnSwitch() {
  // Case when player has won
  if (checkWinner(board) === 1) {
    winner = turn;
    changeMessage(`Pelaaja ${winner} voitti, joten ei enää uusia siirtoja!`);
    showPrompt(`Pelaaja ${winner} voitti`);
    // Case when the game ends in a tie
  } else if (checkTie(board) == true) {
    changeMessage(`Tasapeli, joten ei enää uusia siirtoja!`);
    showPrompt(`Tasapeli!`);
  }
  // In case neither case occurs, just inform whos turn is next
  else {
    turn = turn === player2 ? player1: player2;
    changeMessage(`Pelaajan ${turn} vuoro seuraavaksi`);
  }
}
// Function for resetting and initializing the game
function startGame() {
  // Player 1 starts the game
  turn = player1;
  winner = null;
  // Reset board structure to 0
  board = [[0,0,0], [0,0,0], [0,0,0]];
  // Remove all prompt messages
  document.querySelector('.prompt').style.display = "none";
  for (var i=0; i < cols.length; i++) {
    cols[i].innerText = '';
    // Add click event to call function clickCol on every column
    cols[i].addEventListener('click', clickCol, false);
  }
}

// Function for updating board structure and drawing mark on the board view
function clickCol(col) {
  let element = document.getElementById(col.target.id);
  // Only allow columns to be clicked when there is no winner
  if (winner == null) {
    if (element.innerText === "") {

      // Update the player on the board structure
      board[element.dataset.r][element.dataset.c] = turn;

      // Draw mark depending on who's turn is it
      var draw = turn === player1 ? mark1 : mark2;
      element.innerText = draw;
      // Switch turn
      turnSwitch();
      return 1;
    }
  }
  return -1;
}