'use strict';

function interviewQuestion(profession) {
  return function (name) {
    if (profession === 'designer') {
      return `${name} can you please explain what UX design is?`;
    }
    if (profession === 'teacher') {
      return `What subject do you teach ${name}?`;
    }
    return `Hello ${name}, what do you do?`;
  }
}

console.log(interviewQuestion('teacher')('John'));