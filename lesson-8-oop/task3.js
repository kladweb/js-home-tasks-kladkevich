'use strict';

function anClean(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = (i + 1); j < arr.length; j++) {
      if (arr[i].length === arr[j].length) {
        if (arr[i].split('').sort().join('').toLowerCase() === arr[j].split('').sort().join('').toLowerCase()) {
          arr.splice(i, 1); //здесь можно удалять j-й элемент вместо i-го, а можно было бы сделать и рандомно)
          j--;
        }
      }
    }
  }
  return arr;
}

var arr = ['воз', 'киборг', 'корсет', 'ЗОВ', 'гробик', 'костер', 'сектор'];
console.log(anClean(arr));