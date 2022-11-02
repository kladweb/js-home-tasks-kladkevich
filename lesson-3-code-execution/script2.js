'use strict';
var image = {
  width: 100,
  height: 400,
  title: 'Cool image'
};

multiplyNumeric(image);
console.log(image);

function multiplyNumeric(image) {
  for (var imageKey in image) {
    if (!(isNaN(Number(image[imageKey])))) {
      image[imageKey] *= 2;
    }
  }
  return image;
}