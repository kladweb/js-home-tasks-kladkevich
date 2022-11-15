'use strict';
var lineOdd = '#';
var lineEven = ' ';
var x = 8;
var y = 8;

for (var i = 0; i < (x - 1); i++) {
  if (lineOdd.charAt(i) === '#') {
    lineOdd = lineOdd + ' ';
    lineEven = lineEven + '#';
  } else {
    lineOdd = lineOdd + '#';
    lineEven = lineEven + ' ';
  }
}
var board = lineOdd;
for (var i = 2; i <= y; i++) {
  if ((i % 2) !== 0) {
    board = board + '\n' + lineOdd;
  } else {
    board = board + '\n' + lineEven;
  }
}
console.log(board);