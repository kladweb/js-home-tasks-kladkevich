'use strict';
var obj = {
  className: 'open menu menu'
};
removeClass(obj, 'menu');
console.log(obj.className);

function removeClass(obj, cls) {
  var classes = obj['className'];
  var classesNew = classes.replace(cls, '');
  while (classes !== classesNew) {
    classes = classesNew;
    classesNew = classes.replace(cls, '');
  }
  classes = classes.trim();
  obj['className'] = classes;
  return obj;
}

/* Первый вариант решения этой задачи мне нравится больше (файл script2.js).
Но, интуитивно, почему-то кажется, что от нас ожидается решение, которое ближе ко второму варианту, хотя оба
 варианта решают поставленную задачу.*/