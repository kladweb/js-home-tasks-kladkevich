'use strict';
var frame = document.getElementById('container');
var images = document.getElementsByTagName('img');
var DragImage = null;  //какая картинка сейчас перетаскивается
var DragShiftX;  //разница между положением курсора мыши и положением верхнего левого угла картинки
var DragShiftY;
var currentX;   //текущие координаты верхнего левого угла картинки, которые необходимо установить
var currentY;

var imagePos; //массив с getBoundingClientRect() для текущей (активной) картинки
var framePos; //то же для рамки;

//Сохраняем в глобальные переменные поправку на margin у картинок. Предполагаем для данной задачи, что margin у всех
// картинок будет одинаковый, поэтому просто возьмём у первой:
var imageCorrectX = parseFloat(window.getComputedStyle(images[0]).marginLeft);
var imageCorrectY = parseFloat(window.getComputedStyle(images[0]).marginTop);

for (var i = (images.length - 1); i >= 0; i--) {
  var x = images[i].offsetLeft;
  var y = images[i].offsetTop;
  images[i].style.cursor = 'grab';
  images[i].style.left = x + 'px';
  images[i].style.top = y + 'px';
}

for (var i = (images.length - 1); i >= 0; i--) {
  images[i].style.position = 'absolute';
  images[i].addEventListener('mousedown', Drag_Start);
}

window.addEventListener('resize', returnImage); //реагируем на изменение масштаба окна для следующей фишки:

// Эту функцию я сделал для того, чтобы картинка, которая осталась за пределами экрана в случае его масштабирования,
// возвращалась на край экрана и была в поле зрения, т.е. чтобы ничто и никогда не оставалось за пределами экрана по
// ширине и не появлялось горизонтальных полос прокрутки при масштабировании страницы.
// Да, лишние действия, лишнее загружение памяти, но это только для практики, так как первый раз делаю подобное задание

function returnImage() {
  framePos = frame.getBoundingClientRect();
  for (var i = (images.length - 1); i >= 0; i--) {
    if ((images[i].offsetLeft + images[i].offsetWidth) > (framePos.x + framePos.width)) {
      images[i].style.left = (framePos.x + framePos.width - images[i].offsetWidth - imageCorrectX) + 'px';
    }
  }
}

function Drag_Start(event) {
  event = event || window.event;
  event.preventDefault();
  DragImage = this;
  DragImage.style.cursor = 'grabbing';
  DragShiftX = event.clientX - DragImage.offsetLeft;
  DragShiftY = event.clientY - DragImage.offsetTop;
  //перенёс переменные с данными рамки в эту функцию из глобальной области для того, чтобы корректно работало при
  // масштабировании окна браузера, иначе нужно было обновлять экран после масштабирования
  framePos = frame.getBoundingClientRect();
  var xFrameStart = framePos.x;
  var xFrameEnd = framePos.x + framePos.width;
  var yFrameStart = framePos.y;
  var yFrameEnd = framePos.y + framePos.height;

  window.addEventListener('mouseup', Drag_Stop);
  window.addEventListener('mousemove', Drag_Move);

  function Drag_Stop() {
    window.removeEventListener('mousemove', Drag_Move);
    DragImage.style.zIndex = 'auto';
    DragImage.style.cursor = 'grab';
  }

  function Drag_Move(event) {
    event = event || window.event;
    imagePos = DragImage.getBoundingClientRect();
    DragImage.style.zIndex = '100';
    currentX = event.clientX - DragShiftX - imageCorrectX;
    currentY = event.clientY - DragShiftY - imageCorrectY;

// Также ограничиваем передвижение картинки в пределах нашей рамки

    if (currentX >= (xFrameEnd - imagePos.width - imageCorrectX)) {
      currentX = xFrameEnd - imagePos.width - imageCorrectX;
      // Делаем корректным покидание и возврат курсора при удержании кнопки мыши и выхода курсора за пределы
      // рабочей области. Добавляем единичку для корректного возвращения вида курсора при возвращении мыши обратно
      // на картинку:
      if (DragShiftX >= imagePos.width - 1) {
        DragShiftX = imagePos.width - 1;
      } else {
        DragShiftX = event.clientX - DragImage.offsetLeft;
      }
    }

    if (currentY >= (yFrameEnd - imagePos.height - imageCorrectY + window.scrollY)) {
      currentY = yFrameEnd - imagePos.height - imageCorrectY + window.scrollY;
      if (DragShiftY >= imagePos.height - 1) {
        DragShiftY = imagePos.height - 1;
      } else {
        DragShiftY = event.clientY - DragImage.offsetTop;
      }
    }

    if (currentX <= xFrameStart - imageCorrectX) {
      currentX = xFrameStart - imageCorrectX;
      if (DragShiftX <= 0) {
        DragShiftX = 0;
      } else {
        DragShiftX = event.clientX - DragImage.offsetLeft;
      }
    }

    if (currentY <= yFrameStart - imageCorrectY + window.scrollY) {
      currentY = yFrameStart - imageCorrectY;
      if (DragShiftY <= 0) {
        DragShiftY = 0;
      } else {
        DragShiftY = event.clientY - DragImage.offsetTop;
      }
    }

    DragImage.style.left = currentX + 'px';
    DragImage.style.top = currentY + 'px';
  }
}