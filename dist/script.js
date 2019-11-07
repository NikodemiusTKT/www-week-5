"use strict";

var _cloneDeep2 = _interopRequireDefault(require("lodash/cloneDeep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Two dimensional 5 by 5 array structure for holding the tic-tac-toe games
var gameField; // Constants for holding player numbers and marks to be drawn

var player1 = "x";
var player2 = "o"; // Winner and turn on global constant

var playerInfo; //current player

var boardInfo; // current game situation (win or no win yet)

var INITIAL_STATE = {
  gameField: [[null, null, null, null, null], [null, null, null, null, null], [null, null, null, null, null], [null, null, null, null, null], [null, null, null, null, null]],
  playerInfo: player1,
  boardInfo: null
};
startGame(); // Function for checking 5 by 5 grid for win status

function checkWinner(gameField) {
  // check for horizontal win
  for (var i = 0; i < 5; i++) {
    if (gameField[i][0] !== null && gameField[i][0] === gameField[i][1] && gameField[i][1] === gameField[i][2] && gameField[i][2] === gameField[i][3] && gameField[i][3] === gameField[i][4]) {
      return true;
    }
  } // check for vertical win


  for (var j = 0; j < 5; j++) {
    if (gameField[0][j] !== null && gameField[0][j] === gameField[1][j] && gameField[0][j] === gameField[2][j] && gameField[0][j] === gameField[3][j] && gameField[0][j] === gameField[4][j]) {
      return 1;
    }
  } // check for diagonal top-left-bottom-right


  if (gameField[0][0] !== null && gameField[0][0] === gameField[1][1] && gameField[0][0] === gameField[2][2] && gameField[0][0] === gameField[3][3] && gameField[0][0] === gameField[4][4]) {
    return 1;
  } // check for diagonal bottom-left-top-right


  if (gameField[4][0] !== null && gameField[4][0] === gameField[3][1] && gameField[4][0] === gameField[2][2] && gameField[4][0] === gameField[1][3] && gameField[4][0] === gameField[0][4]) {
    return 1;
  }

  return 0;
} // Function for checking 3 by 3 grid for a tie


function checkTie(gameField) {
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      if (gameField[i][j] === null) return false;
    }
  }

  return true;
} // Function for changing turns between players


function turnSwitch() {
  // Case when player has won
  if (checkWinner(gameField) == true) {
    boardInfo = playerInfo;
    alert("Player ".concat(boardInfo, " has won!")); // Case when the game ends in a tie
  } else if (checkTie(gameField) == true) {
    alert("It's a tie!");
  } // In case neither case occurs, just inform whos turn is next
  else {
      playerInfo = playerInfo === player2 ? player1 : player2;
    }
} // Function for resetting and initializing the game


function startGame() {
  playerInfo = INITIAL_STATE.playerInfo;
  boardInfo = INITIAL_STATE.boardInfo;
  gameField = (0, _cloneDeep2["default"])(INITIAL_STATE.gameField);
  console.log(gameField, playerInfo, boardInfo); //

  var cols = document.querySelectorAll('td');

  for (var i = 0; i < cols.length; i++) {
    cols[i].innerText = null; // Add click event to call function clickCol on every column

    cols[i].addEventListener('click', clickCol, false);
  }
} // Function for updating board structure and drawing mark on the board view


function clickCol(col) {
  var element = document.getElementById(col.target.id); // Only allow columns to be clicked when there is no winner

  if (boardInfo == null) {
    if (element.innerText === "") {
      // Update the player on the board structure
      gameField[element.dataset.r][element.dataset.c] = playerInfo;
      element.innerText = playerInfo; // Switch turn

      turnSwitch();
      return 1;
    }
  }

  return -1;
}