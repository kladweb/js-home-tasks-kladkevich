'use strict';

function start() {
  init();
  startGame();
}

//отрисовываем созданные элементы игры
function init() {
  window.tennis = document.getElementById('tennis');
  board.createBoard();
  ball.createBall();
  racket1.createRacket();
  racket2.createRacket();
  score.createScore();
  buttonStart.createButton();
  winnerTitle.createWinnerTitle();
}

//создаем поле
const board = {
  widthField: 600,
  heightField: 400,
  posX: 0,
  posY: 0,
  createBoard: function () {
    let boardObj = document.createElement('div');
    boardObj.id = 'board';
    boardObj.style.width = this.widthField + 'px';
    boardObj.style.height = this.heightField + 'px';
    tennis.appendChild(boardObj);
    this.posX = boardObj.offsetLeft;
    this.posY = boardObj.offsetTop;
    this.sizeBorder = parseFloat(window.getComputedStyle(boardObj).borderWidth);
  }
}

//создаем шарик
const ball = {
  posX: 0,
  posY: 0,
  speedX: 0,
  speedY: 0,
  size: 30,
  createBall: function () {
    let ballObj = document.createElement('div');
    ballObj.id = 'ball';
    ballObj.style.width = this.size + 'px';
    ballObj.style.height = this.size + 'px';
    tennis.appendChild(ballObj);
    this.resetPositionDefault();
    this.redrawBall();
  },
  resetPositionDefault: function () {
    this.posX = board.posX + board.widthField / 2 - this.size / 2;
    this.posY = board.posY + board.heightField / 2 - this.size / 2;
    this.speedX = 0;
    this.speedY = 0;
  },
  redrawBall: function () {
    let ballObj = document.getElementById('ball');
    ballObj.style.left = this.posX + 'px';
    ballObj.style.top = this.posY + 'px';
  }
};

//создаем конструктор для создания ракеток
function Racket(name) {
  this.posX = 0;
  this.posY = 0;
  this.height = 100;
  this.width = 8;
  this.speedY = 0;
  this.createRacket = function () {
    let racketObj = document.createElement('div');
    racketObj.id = (name);
    racketObj.style.width = this.width + 'px';
    racketObj.style.height = this.height + 'px';
    tennis.appendChild(racketObj);
    this.resetPositionDefault();
    this.redrawRacket();
  };
  this.resetPositionDefault = function () {
    this.posX = board.posX;
    this.posY = board.posY + board.heightField / 2 - this.height / 2;
  };
  this.redrawRacket = function () {
    let racketObj = document.getElementById(name);
    racketObj.style.left = this.posX + 'px';
    racketObj.style.top = this.posY + 'px';
  };
}

//создаем ракетку №1 на базе конструктора
const racket1 = new Racket('racket1');

//Создаем ракетку №2 на базе конструктора, и сразу заменяем функцию определения её дефолтных координат.
const racket2 = new Racket('racket2');
racket2.resetPositionDefault = function () {
  this.posX = board.posX + board.widthField - this.width;
  this.posY = board.posY + board.heightField / 2 - this.height / 2;
};

//Создаем табло со счетом
const score = {
  player1: 0,
  player2: 0,
  addScorePlayer1: function () {
    this.player1++;
  },
  addScorePlayer2: function () {
    this.player2++;
  },
  resetScoreDefault: function () {
    this.player1 = 0;
    this.player2 = 0;
  },
  createScore: function () {
    let score = document.createElement('p');
    score.id = 'score';
    score.appendChild(document.createTextNode('0 : 0'));
    tennis.appendChild(score);
    this.updatePositionScore();
    this.redrawScore();
  },
  updatePositionScore: function () {
    let score = document.getElementById('score');
    score.style.left = board.posX + board.widthField / 2 + 'px';
    score.style.top = board.posY + 'px';
  },
  redrawScore: function () {
    let score = document.getElementById('score');
    score.innerText = this.player1 + ' : ' + this.player2;
  }
};

//создаем кнопку "СТАРТ!"
const buttonStart = {
  button: null,
  createButton: function () {
    this.button = document.createElement('button');
    this.button.id = ('start');
    this.button.appendChild(document.createTextNode('СТАРТ!'));
    tennis.appendChild(this.button);
    this.updatePositionButton();
  },
  updatePositionButton: function () {
    this.button.style.left = board.posX + 'px';
    this.button.style.top = board.posY + 'px';
  }
};

//создаем элемент, в которой будет надпись 'WINNER !!!'
const winnerTitle = {
  winner: null,
  createWinnerTitle: function () {
    this.winner = document.createElement('p');
    this.winner.id = 'winner';
    this.winner.appendChild(document.createTextNode(''));
    this.winner.style.top = board.posY + board.heightField / 2 + 'px';
    tennis.appendChild(this.winner);
  }
};

//сделаем адаптацию к изменению масштаба, чтобы элементы игры не разъезжались в разные стороны при масштабировании:
//(корректная работа адаптации предусмотрена только перед запуском игры)
window.addEventListener('resize', updateGlobal);

function updateGlobal() {
  let boardObj = document.getElementById('board');
  board.posX = boardObj.offsetLeft;
  board.posY = boardObj.offsetTop;
  ball.resetPositionDefault();
  ball.redrawBall();
  racket1.resetPositionDefault();
  racket1.redrawRacket();
  racket2.resetPositionDefault();
  racket2.redrawRacket();
  buttonStart.updatePositionButton();
  score.updatePositionScore();
}

//Динамика

function startGame() {
  buttonStart.button.addEventListener('click', startBall);
  window.addEventListener("keydown", moveRacket);
  window.addEventListener("keyup", stopRacket);
  run();
}

function run() {
  window.gameInterval = setInterval(tick, 10);
}

function moveRacket(e) {
  switch (e.key) {
    case 'Shift':
      e.preventDefault();
      racket1.speedY = -1;
      break;
    case 'Control':
      e.preventDefault();
      racket1.speedY = 1;
      break;
    case 'ArrowUp':
      e.preventDefault();
      racket2.speedY = -1;
      break;
    case 'ArrowDown':
      e.preventDefault();
      racket2.speedY = 1;
      break;
  }
}

function stopRacket(e) {
  switch (e.key) {
    case ('Shift'):
      racket1.speedY = 0;
      break;
    case ('Control'):
      racket1.speedY = 0;
      break;
    case ('ArrowUp'):
      racket2.speedY = 0;
      break;
    case ('ArrowDown'):
      racket2.speedY = 0;
      break;
  }
}

function startBall() {
  if (gameInterval == null) {
    run();
  }
  ball.resetPositionDefault();
  racket1.resetPositionDefault();
  racket2.resetPositionDefault();
  score.redrawScore();
  ball.speedX = Math.floor(Math.random() * 2) * 6 - 3;
  ball.speedY = Math.floor(Math.random() * 5) - 2;
  if (winnerTitle.winner != null) {
    winnerTitle.winner.innerText = '';
  }
}

function tick() {
  updateBall();
  updateRacket1();
  updateRacket2();
  if (score.player1 >= 5) {
    winPlayer(1);
  }
  if (score.player2 >= 5) {
    winPlayer(2);
  }
}

function updateBall() {
  ball.posX += ball.speedX;
  ball.posY += ball.speedY;
  if (checkYPlayer1() && checkHitPlayer1()) {
    ball.speedX = -ball.speedX;
    ball.speedY = Math.floor(Math.random() * 5) - 2;
    ball.posX = board.posX + racket1.width;
  }
  if (!checkYPlayer1() && checkOutPlayer1()) {
    clearInterval(gameInterval);
    window.gameInterval = null;
    ball.speedX = 0;
    ball.speedY = 0;
    score.addScorePlayer2();
    score.redrawScore();
  }
  if (checkYPlayer2() && checkHitPlayer2()) {
    ball.speedX = -ball.speedX;
    ball.speedY = Math.floor(Math.random() * 5) - 2;
    ball.posX = board.posX + board.widthField - ball.size - racket1.width;
  }
  if (!checkYPlayer2() && checkOutPlayer2()) {
    clearInterval(gameInterval);
    window.gameInterval = null;
    ball.speedX = 0;
    ball.speedY = 0;
    score.addScorePlayer1();
    score.redrawScore();
  }

  if (ball.posY + ball.size > board.posY + board.heightField + board.sizeBorder) {
    ball.speedY = -ball.speedY;
    ball.posY = board.posY + board.heightField - ball.size + board.sizeBorder;
  }
  if (ball.posY < board.posY + board.sizeBorder) {
    ball.speedY = -ball.speedY;
    ball.posY = board.posY + board.sizeBorder;
  }
  ball.redrawBall();
}

function checkYPlayer1() {
  return (ball.posY + ball.size / 2 > racket1.posY) && (ball.posY + ball.size / 2 < racket1.posY + racket1.height);
}

function checkHitPlayer1() {
  return ball.posX < board.posX + racket1.width;
}

function checkOutPlayer1() {
  return ball.posX < board.posX - ball.speedX;
}

function checkYPlayer2() {
  return (ball.posY + ball.size / 2 > racket2.posY) && (ball.posY + ball.size / 2 < racket2.posY + racket2.height);
}

function checkHitPlayer2() {
  return ball.posX > board.posX + board.widthField - ball.size - racket1.width;
}

function checkOutPlayer2() {
  return ball.posX > board.posX + board.widthField - ball.size - ball.speedX;
}

function updateRacket1() {
  if (racket1.posY > board.posY + board.sizeBorder) {
    racket1.posY += racket1.speedY;
  } else {
    racket1.posY = board.posY + board.sizeBorder;
  }
  if (racket1.posY < board.posY + board.heightField - racket1.height + board.sizeBorder) {
    racket1.posY += racket1.speedY;
  } else {
    racket1.posY = board.posY + board.heightField - racket1.height + board.sizeBorder;
  }
  racket1.redrawRacket();
}

function updateRacket2() {
  if (racket2.posY > board.posY + board.sizeBorder) {
    racket2.posY += racket2.speedY;
  } else {
    racket2.posY = board.posY + board.sizeBorder;
  }
  if (racket2.posY < board.posY + board.heightField - racket2.height + board.sizeBorder) {
    racket2.posY += racket2.speedY;
  } else {
    racket2.posY = board.posY + board.heightField - racket2.height + board.sizeBorder;
  }
  racket2.redrawRacket();
}

function winPlayer(playerWin) {
  if (playerWin === 1) {
    winnerTitle.winner.style.left = board.posX + board.widthField / 4 + 'px';
    winnerTitle.winner.style.color = '#09AA57';
  }
  if (playerWin === 2) {
    winnerTitle.winner.style.left = board.posX + board.widthField * 3 / 4 + 'px';
    winnerTitle.winner.style.color = '#191497';
  }
  winnerTitle.winner.innerText = 'WINNER !!!';
  score.resetScoreDefault();
}

window.addEventListener('load', start);