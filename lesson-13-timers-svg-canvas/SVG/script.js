'use strict';
const baseRadius = 180; //радиус циферблата
const numbersBaseRadius = baseRadius * 0.8; //радиус оси цифр циферблата
const cRadius = 24; // радиус кружков с цифрами
const dotSize = 6; //размер точки в центре часов
const wrapper = document.getElementById('wrapper');
const xmlns = 'http://www.w3.org/2000/svg';

wrapper.appendChild(createWatch());
setInterval(tickTimer, 1000);

// UI

function createWatch() {
  let svg = document.createElementNS(xmlns, 'svg');
  svg.id = 'base';
  svg.setAttributeNS(null, 'width', baseRadius * 2);
  svg.setAttributeNS(null, 'height', baseRadius * 2);
  svg.appendChild(createGradients());
  svg.appendChild(createBase());
  svg.appendChild(createClockFace());
  svg.appendChild(createDigitalWatch());
  svg.appendChild(createArrow('hours', 8, 80));
  svg.appendChild(createArrow('minutes', 4, 100));
  svg.appendChild(createArrow('seconds', 2, 120, 'yellow'));
  svg.appendChild(createDecorativeDot(dotSize));
  return svg;
}

function createGradients() {
  let defs = document.createElementNS(xmlns, 'defs');
  defs.appendChild(createLinearGradient('LG1', 'tomato', 'crimson'));
  defs.appendChild(createLinearGradient('LG2', 'crimson', 'tomato'));
  return defs;

  function createLinearGradient(nameGradient, startColor, endColor) {
    let gr = document.createElementNS(xmlns, 'linearGradient');
    gr.setAttributeNS(null, 'id', nameGradient);
    gr.setAttributeNS(null, 'x1', '0%');
    gr.setAttributeNS(null, 'y1', '0%');
    gr.setAttributeNS(null, 'x2', '0%');
    gr.setAttributeNS(null, 'y2', '100%');
    let stop0 = document.createElementNS(xmlns, 'stop');
    stop0.setAttributeNS(null, 'offset', '0%');
    stop0.setAttributeNS(null, 'stop-color', startColor);
    gr.appendChild(stop0);
    let stop100 = document.createElementNS(xmlns, 'stop');
    stop100.setAttributeNS(null, 'offset', '100%');
    stop100.setAttributeNS(null, 'stop-color', endColor);
    gr.appendChild(stop100);
    return gr;
  }
}

function createBase() {
  let circle = document.createElementNS(xmlns, 'circle');
  circle.setAttributeNS(null, 'cx', baseRadius);
  circle.setAttributeNS(null, 'cy', baseRadius);
  circle.setAttributeNS(null, 'r', baseRadius);
  // circle.setAttributeNS(null, 'stroke', 'tomato');
  circle.setAttributeNS(null, 'fill', 'url(#LG1)');
  return circle;
}

function createClockFace() {
  let clockFace = document.createDocumentFragment();
  for (let number = 1; number <= 12; number++) {
    let angle = number * 30 / 180 * Math.PI;
    let x = (baseRadius + numbersBaseRadius * Math.sin(angle));
    let y = (baseRadius - numbersBaseRadius * Math.cos(angle));
    clockFace.appendChild(createHourCircle(x, y));
    clockFace.appendChild(createHourNumber(x, y, number));
  }
  return clockFace;
}

function createHourCircle(circleX, circleY) {
  let circle = document.createElementNS(xmlns, 'circle');
  circle.setAttributeNS(null, 'cx', circleX);
  circle.setAttributeNS(null, 'cy', circleY);
  circle.setAttributeNS(null, 'r', cRadius);
  circle.setAttributeNS(null, 'fill', 'url(#LG2)');
  return circle;
}

function createHourNumber(numberX, numberY, number) {
  let hourNumber = document.createElementNS(xmlns, 'text');
  hourNumber.appendChild(document.createTextNode(number));
  //так как для стрелочных часов использую наклонный шрифт, то здесь немного сдвинул цифры влево чтобы было красивее:
  hourNumber.setAttributeNS(null, 'x', numberX - cRadius * 0.1);
  hourNumber.setAttributeNS(null, 'y', numberY);
  hourNumber.setAttributeNS(null, 'fill', '#FFF');
  hourNumber.setAttributeNS(null, 'text-anchor', 'middle');
  hourNumber.setAttributeNS(null, 'dominant-baseline', 'central');
  return hourNumber;
}

function createDigitalWatch() {
  let textClock = document.createElementNS(xmlns, 'text');
  textClock.setAttributeNS(null, 'class', 'digitalwatch');
  textClock.setAttributeNS(null, 'x', baseRadius);
  textClock.setAttributeNS(null, 'y', baseRadius * 1.35);
  textClock.setAttributeNS(null, 'fill', '#FFF');
  textClock.setAttributeNS(null, 'text-anchor', 'middle');
  ['hourstext', 'minutestext', 'secondstext'].map(watchDigits => {
    let digits = document.createElementNS(xmlns, 'tspan');
    digits.setAttributeNS(null, 'class', watchDigits);
    digits.appendChild(document.createTextNode('- -'));
    textClock.appendChild(digits);
    if (watchDigits !== 'secondstext') {
      textClock.appendChild(document.createTextNode(' : '));
    }
  });
  return textClock;
}

function createArrow(arrowType, arrowWidth, arrowLength, arrowColor) {
  let arrow = document.createElementNS(xmlns, 'line');
  arrow.setAttributeNS(null, 'class', arrowType);
  arrow.setAttributeNS(null, 'x1', baseRadius);
  arrow.setAttributeNS(null, 'y1', baseRadius);
  arrow.setAttributeNS(null, 'x2', baseRadius);
  arrow.setAttributeNS(null, 'y2', baseRadius - arrowLength);
  arrow.setAttributeNS(null, 'stroke', arrowColor || 'rgba(255, 255, 255, 0.7)');
  arrow.setAttributeNS(null, 'stroke-width', arrowWidth);
  arrow.setAttributeNS(null, 'stroke-linecap', 'round');
  arrow.style.transformOrigin = baseRadius + 'px ' + baseRadius + 'px';
  return arrow;
}

function createDecorativeDot(size) {
  let dot = document.createElementNS(xmlns, 'circle');
  dot.setAttributeNS(null, 'cx', baseRadius);
  dot.setAttributeNS(null, 'cy', baseRadius);
  dot.setAttributeNS(null, 'r', size);
  dot.setAttributeNS(null, 'fill', '#FFF');
  return dot;
}

// Logic

function tickTimer() {
  let now = new Date();
  let thisSecond = now.getSeconds();
  let thisMinute = now.getMinutes();
  let thisHour = now.getHours();
  updateWatch(thisHour, thisMinute, thisSecond);
  updateDigitalWatch(thisHour, thisMinute, thisSecond);
}

function updateWatch(hour, minute, second) {
  let thisSecondRotate = second * 6;
  let thisMinuteRotate = minute * 6 + second * 6 / 60;
  let thisHourRotate = hour * 30 + minute * 30 / 60;
  rotateHandle('seconds', thisSecondRotate);
  rotateHandle('minutes', thisMinuteRotate);
  rotateHandle('hours', thisHourRotate);
}

function rotateHandle(handle, degree) {
  let arrow = document.querySelector(`.${handle}`);
  arrow.style.transform = `rotate(${degree}deg)`;
}

function updateDigitalWatch(hour, minute, second) {
  let digitalWatchSeconds = document.querySelector('.secondstext');
  let digitalWatchMinutes = document.querySelector('.minutestext');
  let digitalWatchHours = document.querySelector('.hourstext');
  digitalWatchSeconds.textContent = addZeroToNumber(second);
  digitalWatchMinutes.textContent = addZeroToNumber(minute);
  digitalWatchHours.textContent = addZeroToNumber(hour);
}

function addZeroToNumber(currentTime) {
  return (`${currentTime}`.length < 2) ? (`0${currentTime}`) : currentTime;
}