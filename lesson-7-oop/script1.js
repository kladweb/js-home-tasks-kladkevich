'use strict';

(function () {
  var Question = function (question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
  };

  var test = [];
  test[0] = new Question('Что такое Git ?',
    ['1) Облачное хранилище данных',
      '2) Консольная утилита для работы с файлами',
      '3) Консольная утилита для создания резервной копии файлов',
      '4) Система контроля версий'], 4);
  test[1] = new Question('Что такое GitHub ?',
    ['1) Облачное хранилище данных',
      '2) Программа для работы с Git',
      '3) Веб-сервис для хостинга проектов и их совместной работы, основанный на Git',
      '4) Хранилище резервных копий файлов'], 3);
  test[2] = new Question('Какая команда предназначена для отправки состояния текущей локальной ветки на удаленный' +
    ' репозиторий ?',
    ['1) git push',
      '2) git pull',
      '3) git upload',
      '4) git update'], 1);

  Question.prototype.askQuestion = function () {
    console.log(this.question);
    for (var i = 0; i < this.answers.length; i++) {
      console.log(this.answers[i]);
    }
  };

  Question.prototype.checkAnswer = function (optionAnswer) {
    if (optionAnswer === this.correct) {
      console.log('ВЕРНО !');
    } else {
      console.log('НЕ ВЕРНО !');
    }
  };

  var numberTest = Math.floor(Math.random() * (test.length));
  test[numberTest].askQuestion();

  var numAnswer = Number(prompt('Введите номер правильного ответа на вопрос, заданный в консоли:'));
  test[numberTest].checkAnswer(numAnswer);
})();