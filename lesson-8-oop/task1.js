'use strict';

(function () {
  var result = 0;

  function Question(question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
  }

  Question.prototype.displayQuestion = function () {
    console.log(this.question);

    for (var i = 0; i < this.answers.length; i++) {
      console.log(i + ': ' + this.answers[i]);
    }
  }

  Question.prototype.checkAnswer = function (ans) {
    if (ans === this.correct) {
      result++;
      console.log('Correct answer!');

    } else {
      console.log('Wrong answer. Try again :)')
    }
  }

  Question.prototype.displayResult = function () {
    console.log('Thank you for the game. Your result: ' + result);
  }

  var q1 = new Question('Is JavaScript the coolest programming language in the world?',
    ['Yes', 'No'],
    0);

  var q2 = new Question('What is the name of this course\'s teacher?',
    ['John', 'Micheal', 'Jonas'],
    2);

  var q3 = new Question('What does best describe coding?',
    ['Boring', 'Hard', 'Fun', 'Tediuos'],
    2);

  var questions = [q1, q2, q3];

  function askQuestion() {
    var n = Math.floor(Math.random() * questions.length);
    questions[n].displayQuestion();
    var answerInput = ((prompt('Please select the correct answer.  Enter "exit" to end the game.')) || '');
    if (answerInput === 'exit') {
      return;
    }
    var answer = parseInt(answerInput);
    questions[n].checkAnswer(answer);
    askQuestion();
  }

  askQuestion();
  questions[1].displayResult();
})();