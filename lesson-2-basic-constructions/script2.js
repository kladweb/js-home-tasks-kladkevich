var incorrect = '';
var lastName;
var firstName;
var secondName;
var fullYears;

do {
  lastName = prompt(incorrect + 'Введите Вашу фамилию:', '');
  incorrect = checkFio(lastName);
} while (incorrect !== '');

do {
  firstName = prompt(incorrect + 'Введите Ваше имя:', '');
  incorrect = checkFio(firstName);
} while (incorrect !== '');

do {
  secondName = prompt(incorrect + 'Введите Ваше отчество:', '');
  incorrect = checkFio(secondName);
} while (incorrect !== '');

do {
  fullYears = parseInt(prompt(incorrect + 'Сколько Вам лет? ', ''), 10);
  incorrect = checkFullYears(fullYears);
} while (incorrect !== '');

var gender = confirm('Ваш пол - мужской?');
var pension = false;

if (gender && (fullYears >= 63)) {
  pension = true;
} else if (!gender && (fullYears >= 58)) {
  pension = true;
}

var fullName = lastName + ' ' + firstName + ' ' + secondName;
var ageInDays = Math.floor(fullYears * 365.2425);
var futureYears = fullYears + 5;

gender = (gender) ? 'мужской' : 'женский';
pension = (pension) ? 'да' : 'нет';

var finalMessage = 'Ваше ФИО: ' + fullName + '\n' +
  'Ваш возраст в годах: ' + fullYears + '\n' +
  'Ваш возраст в днях: ' + ageInDays + '\n' +
  'Через 5 лет вам будет: ' + futureYears + '\n' +
  'Ваш пол: ' + gender + '\n' +
  'Вы на пенсии: ' + pension;

alert(finalMessage);

function checkFio(fio) {
  if (fio === null || fio === '') {
    incorrect = 'Некорректный ввод! ';
  } else {
    incorrect = '';
  }
  return incorrect;
}

function checkFullYears(years) {
  if (isNaN(years) || years <= 0 || years > 122) {
    incorrect = 'Введите, пожалуйста, корректный возраст! ';
  } else {
    incorrect = '';
  }
  return incorrect;
}