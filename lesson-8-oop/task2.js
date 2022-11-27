'use strict';

function isPal(string) {
  return (string.split(' ').join('').toLowerCase() === string.split(' ').join('').split('').reverse().join('').toLowerCase());
}

console.log(isPal('А роза упала на лапу Азора'));

// Первоначальный вариант
// function isPal(string) {
//   var oldString = '';
//   var newString = '';
//   for (var i = 0; i < string.length; i++) {
//     if (string.charAt(i) !== ' ') {
//       oldString += string.charAt(i);
//     }
//   }
//   for (var i = (oldString.length - 1); i >= 0; i--) {
//     newString += oldString.charAt(i);
//   }
//   return (oldString.toLowerCase() === newString.toLowerCase());
// }
//
// console.log(isPal('А роза упала на лапу Азора'));
