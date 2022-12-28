'use strict';

const tennis = document.getElementById('tennis');

//создаем поле
const board = {
  wightField: 600,
  heightField: 400,
  create: function () {
    let boardObj = document.createElement('div');
    boardObj.id = 'board';
    boardObj.style.width = this.wightField + 'px';
    boardObj.style.height = this.heightField + 'px';
    tennis.appendChild(boardObj);
    this.posX = boardObj.offsetLeft; //сохраним, чтобы потом брать эти величины и сразу пользоваться
    this.posY = boardObj.offsetTop;
    this.sizeBorder = parseFloat(window.getComputedStyle(boardObj).borderWidth);
  }
}
board.create();

//создаем шарик
const ball =
  {
    posX: 0,
    posY: 0,
    speedX: 0,
    speedY: 0,
    size: 30,
    create: function () {
      let ballObj = document.createElement('div');
      ballObj.id = 'ball';
      ballObj.style.width = this.size + 'px';
      ballObj.style.height = this.size + 'px';
      tennis.appendChild(ballObj);
      this.resetPositionDefault();
      this.update();
    },
    resetPositionDefault: function () {
      this.posX = board.posX + board.wightField / 2 - this.size / 2;
      this.posY = board.posY + board.heightField / 2 - this.size / 2;
      this.speedX = 0;
      this.speedY = 0;
    },
    update: function () {
      let ballObj = document.getElementById('ball');
      ballObj.style.left = this.posX + 'px';
      ballObj.style.top = this.posY + 'px';
    }
  };
ball.create();

//создаем конструктор для ракеток
function Racket(name) {
  this.posX = 0;
  this.posY = 0;
  this.height = 100;
  this.width = 8;
  this.speedY = 0;
  this.create = function () {
    let racketObj = document.createElement('div');
    racketObj.id = (name);
    racketObj.style.width = this.width + 'px';
    racketObj.style.height = this.height + 'px';
    tennis.appendChild(racketObj);
    this.resetPositionDefault();
    this.update();
  };
  this.resetPositionDefault = function () {
    this.posX = board.posX;
    this.posY = board.posY + board.heightField / 2 - this.height / 2;
  };
  this.update = function () {
    let racketObj = document.getElementById(name);
    racketObj.style.left = this.posX + 'px';
    racketObj.style.top = this.posY + 'px';
  };
}

//создаем ракетку №1 на базе конструктора
const racket1 = new Racket('racket1');
racket1.create();

//Создаем ракетку №2 на базе конструктора, заменив функцию определения её дефолтных координат.
//Думал над вариантом предусмотреть это в конструкторе, создав условие. Но решил оставить конструктор для создания
// ракеток более чистым.
const racket2 = new Racket('racket2');
racket2.resetPositionDefault = function () {
  this.posX = board.posX + board.wightField - this.width;
  this.posY = board.posY + board.heightField / 2 - this.height / 2;
};
racket2.create();

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
  create: function () {
    let score = document.createElement('p');
    score.id = 'score';
    score.style.left = board.posX + board.wightField / 2 + 'px';
    score.style.top = board.posY + 'px';
    score.appendChild(document.createTextNode('0 : 0'));
    tennis.appendChild(score);
    this.resetScoreDefault();
  },
  update: function () {
    let score = document.getElementById('score');
    score.innerText = this.player1 + ' : ' + this.player2;
  }
};
score.create();

//создаем кнопку "СТАРТ!"/. Здесь дилемма: придерживаться ли одинакового подхода к созданию объектов? Так как это
// просто всего лишь кнопка, то создадим её сразу:
const buttonStart = document.createElement('button');
buttonStart.id = ('start');
buttonStart.style.left = board.posX + 'px';
buttonStart.style.top = board.posY + 'px';
buttonStart.appendChild(document.createTextNode('СТАРТ!'));
tennis.appendChild(buttonStart);

//создаем будущую надпись 'WINNER !!!'
const winner = document.createElement('p');
winner.id = 'winner';
winner.appendChild(document.createTextNode(''));
winner.style.top = board.posY + board.heightField / 2 + 'px';
tennis.appendChild(winner);

//Динамика

startGame();

function startGame() {
  buttonStart.addEventListener('click', startBall);
  window.addEventListener("keydown", moveRacket);
  window.addEventListener("keyup", stopRacket);
  setInterval(tick, 10);
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
  score.update();
  ball.speedX = Math.floor(Math.random() * 2) * 6 - 3;
  ball.speedY = Math.floor(Math.random() * 5) - 2;
  let winner = document.getElementById('winner');
  if (winner != null) {
    winner.innerText = '';
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
    ball.resetPositionDefault();
    racket1.resetPositionDefault();
    racket2.resetPositionDefault();
    score.addScorePlayer2();
    score.update();
  }
  if (checkYPlayer2() && checkHitPlayer2()) {
    ball.speedX = -ball.speedX;
    ball.speedY = Math.floor(Math.random() * 5) - 2;
    ball.posX = board.posX + board.wightField - ball.size - racket1.width;
  }
  if (!checkYPlayer2() && checkOutPlayer2()) {
    ball.resetPositionDefault();
    racket1.resetPositionDefault();
    racket2.resetPositionDefault();
    score.addScorePlayer1();
    score.update();
  }

  if (ball.posY + ball.size > board.posY + board.heightField + board.sizeBorder) {
    ball.speedY = -ball.speedY;
    ball.posY = board.posY + board.heightField - ball.size + board.sizeBorder;
  }
  if (ball.posY < board.posY + board.sizeBorder) {
    ball.speedY = -ball.speedY;
    ball.posY = board.posY + board.sizeBorder;
  }
  ball.update();
}

function checkYPlayer1() {
  return (ball.posY + ball.size / 2 > racket1.posY) && (ball.posY + ball.size / 2 < racket1.posY + racket1.height);
}

function checkHitPlayer1() {
  return ball.posX < board.posX + racket1.width;
}

function checkOutPlayer1() {
  return ball.posX < board.posX;
}

function checkYPlayer2() {
  return (ball.posY + ball.size / 2 > racket2.posY) && (ball.posY + ball.size / 2 < racket2.posY + racket2.height);
}

function checkHitPlayer2() {
  return ball.posX > board.posX + board.wightField - ball.size - racket1.width;
}

function checkOutPlayer2() {
  return ball.posX > board.posX + board.wightField - ball.size;
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
  racket1.update();
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
  racket2.update();
}

function winPlayer(playerWin) {
  let winner = document.getElementById('winner');
  if (playerWin === 1) {
    winner.style.left = board.posX + board.wightField / 4 + 'px';
    winner.style.color = '#09AA57';
  }
  if (playerWin === 2) {
    winner.style.left = board.posX + board.wightField * 3 / 4 + 'px';
    winner.style.color = '#191497';
  }
  winner.innerText = 'WINNER !!!';
  score.player1 = 0;
  score.player2 = 0;
}