'use strict';
var obj = {
  className: 'open menu menu'
};
removeClass(obj, 'menu');
console.log(obj.className);

function removeClass(obj, cls) {
  var classes = obj['className'];
  var classesArray = classes.split(cls);
  if (classesArray.length <= 1) {
    return obj;
  }
  classes = classesArray.join('');
  classes = classes.trim();
  obj['className'] = classes;
  return obj;
}