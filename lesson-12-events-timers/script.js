'use strict';

createClock();
startTime();

function createClock() {
  var wrapper = document.getElementById('wrapper');
  var base = document.createElement('div');
  base.id = 'base';
  wrapper.appendChild(base);
  for (var i = 1; i <= 12; i++) {
    var number = document.createElement('div'); //кружок с цифрой на циферблате часов
    number.className = 'number';
    number.appendChild(document.createTextNode(i + ''));
    base.appendChild(number);
    var numberX = (base.offsetWidth / 2 - number.offsetWidth * 0.8) * Math.sin(i * 30 * Math.PI / 180);
    var numberY = (base.offsetHeight / 2 - number.offsetHeight * 0.8) * Math.cos(i * 30 * Math.PI / 180);
    // 0.8 - отступ центров кружков с цифрами от наружной грани часов в долях от размера кружка (т.е. 80%).
    number.style.left = (base.offsetWidth / 2 - number.offsetWidth / 2) + numberX + 'px';
    number.style.top = (base.offsetHeight / 2 - number.offsetHeight / 2) - numberY + 'px';
  }
  createDigitalClock();
  createArrow('hours');
  createArrow('minutes');
  createArrow('seconds');
  createArrow('dot');

  function createDigitalClock() {
    var digitalclock = document.createElement('div');
    digitalclock.className = 'digitalclock';
    base.appendChild(digitalclock);
    digitalclock.innerHTML = '- - : - - : - -';
  }

  function createArrow(arrowType) {
    var arrow = document.createElement('div');
    arrow.className = 'arrow ' + arrowType;
    base.appendChild(arrow);
    arrow.style.left = base.offsetWidth / 2 - arrow.offsetWidth / 2 + 'px';
    arrow.style.top = base.offsetHeight / 2 - arrow.offsetHeight / ((arrowType === 'dot') ? 2 : 1) + 'px';
    // делим на два только для кружка, которое по центру часов, так как он позиционируется по центру.
  }
}

function startTime() {
  var digitalclock = document.querySelector('.digitalclock');
  var seconds = document.querySelector('.seconds');
  var minutes = document.querySelector('.minutes');
  var hours = document.querySelector('.hours');

  setInterval(UpdateTime, 1000);

  function UpdateTime() {
    var currTime = new Date();
    var argCurrTime = getArgumentsTime(currTime);
    digitalclock.innerHTML = FormatDateTime(argCurrTime);
    var secondsDegrees = argCurrTime[2] * 6;
    var minutesDegrees = argCurrTime[1] * 6 + argCurrTime[2] * 6 / 60;
    var hoursDegrees = argCurrTime[0] * 30 + argCurrTime[1] * 30 / 60;
    if (secondsDegrees === 0) {
      secondsDegrees = 360;
    }
    seconds.style.transform = 'rotate(' + secondsDegrees + 'deg)';
    minutes.style.transform = 'rotate(' + minutesDegrees + 'deg)';
    hours.style.transform = 'rotate(' + hoursDegrees + 'deg)';
  }

  function getArgumentsTime(AT) {
    var hours = AT.getHours();
    var minutes = AT.getMinutes();
    var seconds = AT.getSeconds();
    return [hours, minutes, seconds];
  }

  function FormatDateTime(DT) {
    return Str0L(DT[0], 2) + ' : ' + Str0L(DT[1], 2) + ' : ' + Str0L(DT[2], 2);
  }

  function Str0L(Val, Len) {
    var StrVal = Val.toString();
    if (StrVal.length < Len) {
      StrVal = '0' + StrVal;
    }
    return StrVal;
  }
}