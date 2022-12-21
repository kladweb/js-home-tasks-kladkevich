'use strict';

const baseRadius = 180; //радиус циферблата
const numbersBaseRadius = baseRadius * 0.8; //радиус оси цифр циферблата
const cRadius = 24; // радиус кружков с цифрами
const arrHour = [8, 80, 'rgba(255, 255, 255, 0.7)']; // толщина, длина и цвет часовой стрелки
const arrMin = [4, 100, 'rgba(255, 255, 255, 0.7)']; // толщина, длина и цвет минутной стрелки
const arrSec = [2, 120, 'yellow']; // толщина, длина и цвет секундной стрелки
const dotSize = 6; //размер точки в центре часов
const wrapper = document.getElementById('wrapper');
let canvas = createCanvas()
wrapper.appendChild(canvas);
let context = canvas.getContext('2d');

createWatch();
setInterval(tickTimer, 1000);

// UI

function createCanvas() {
  let canvas = document.createElement('canvas');
  canvas.id = 'watch';
  canvas.setAttribute('width', baseRadius * 2);
  canvas.setAttribute('height', baseRadius * 2);
  return canvas;
}

function createWatch() {
  drawBase();
  drawClockFace();
  drawDigitalWatch('- -', '- -', '- -');
  drawArrow(arrHour, 0);
  drawArrow(arrMin, 0);
  drawArrow(arrSec, 0);
  drawDot(dotSize);
}

function drawBase() {
  context.beginPath();
  context.arc(baseRadius, baseRadius, baseRadius, 0, Math.PI * 2);
  let grad = context.createLinearGradient(0, 0, 0, baseRadius * 2);
  grad.addColorStop(0, 'tomato');
  grad.addColorStop(1, 'crimson');
  context.fillStyle = grad;
  context.fill();
}

function drawClockFace() {
  for (let number = 1; number <= 12; number++) {
    let angle = number * 30 / 180 * Math.PI;
    let x = (baseRadius + numbersBaseRadius * Math.sin(angle));
    let y = (baseRadius - numbersBaseRadius * Math.cos(angle));
    //рисуем кружки для цифр
    context.beginPath();
    context.arc(x, y, cRadius, 0, Math.PI * 2);
    let grad = context.createLinearGradient(x, y - cRadius, x, y + cRadius);
    grad.addColorStop(0, 'crimson');
    grad.addColorStop(1, 'tomato');
    context.fillStyle = grad;
    context.fill();
    //рисуем цифры на кружках
    context.fillStyle = '#FFF';
    context.font = 'italic normal 24px Ubuntu';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    //также немного центрируем цифры из-за использования наклонного шрифта, т.е. смещаем влево на величину: cRadius*0.1
    context.fillText(number + '', x - cRadius * 0.1, y);
  }
}

function drawDigitalWatch(hour, minute, second) {
  context.fillStyle = '#FFF';
  context.font = 'normal lighter 20px Ubuntu';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(hour + ' : ' + minute + ' : ' + second, baseRadius, baseRadius * 1.35);
}

function drawArrow(arrowType, angle) {
  context.strokeStyle = arrowType[2];
  context.lineWidth = arrowType[0];
  context.lineCap = 'round';
  context.beginPath();
  let x = (baseRadius + arrowType[1] * Math.sin(angle * Math.PI / 180));
  let y = (baseRadius - arrowType[1] * Math.cos(angle * Math.PI / 180));
  context.moveTo(baseRadius, baseRadius);
  context.lineTo(x, y);
  context.stroke();
}

function drawDot(size) {
  context.beginPath();
  context.arc(baseRadius, baseRadius, size, 0, Math.PI * 2);
  context.fillStyle = '#FFF';
  context.fill();
}

// Logic (redrawing)

function tickTimer() {
  let now = new Date();
  let thisSecond = now.getSeconds();
  let thisMinute = now.getMinutes();
  let thisHour = now.getHours();
  var hour = addZeroToNumber(thisHour);
  var minute = addZeroToNumber(thisMinute);
  var second = addZeroToNumber(thisSecond);
  context.clearRect(0, 0, baseRadius * 2, baseRadius * 2);
  drawBase();
  drawClockFace();
  drawDigitalWatch(hour, minute, second);
  updateWatch(thisHour, thisMinute, thisSecond);
}

function updateWatch(hour, minute, second) {
  let thisSecondRotate = second * 6;
  let thisMinuteRotate = minute * 6 + second * 6 / 60;
  let thisHourRotate = hour * 30 + minute * 30 / 60;
  drawArrow(arrHour, thisHourRotate);
  drawArrow(arrMin, thisMinuteRotate);
  drawArrow(arrSec, thisSecondRotate);
  drawDot(dotSize);
}

function addZeroToNumber(currentTime) {
  return (`${currentTime}`.length < 2) ? (`0${currentTime}`) : currentTime;
}