'use strict';
var frame = document.getElementById('container');
var images = document.getElementsByTagName('img');
var DragImage = null;
var DragShiftX;
var DragShiftY;

frame.style.position = 'relative';

for (var i = (images.length - 1); i >= 0; i--) {
  var x = images[i].offsetLeft;
  var y = images[i].offsetTop;
  images[i].style.position = 'absolute';
  images[i].style.left = x + 'px';
  images[i].style.top = y + 'px';
  images[i].addEventListener('mousedown', Drag_Start);
}

function Drag_Start(event) {
  event = event || window.event;
  event.preventDefault();
  DragImage = this;
  DragShiftX = event.screenX - DragImage.offsetLeft;
  DragShiftY = event.screenY - DragImage.offsetTop;
  frame.addEventListener('mouseup', Drag_Stop);
  frame.addEventListener('mousemove', Drag_Move);

  function Drag_Stop() {
    frame.removeEventListener('mousemove', Drag_Move);
    DragImage.style.zIndex = 'auto';
  }

  function Drag_Move(event) {
    event = event || window.event;
    DragImage.style.left = (event.screenX - DragShiftX) + 'px';
    DragImage.style.top = (event.screenY - DragShiftY) + 'px';
    DragImage.style.zIndex = '100';
  }
}
