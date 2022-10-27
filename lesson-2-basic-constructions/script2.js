var incorrect = '';

do {
  var lastName = prompt(incorrect + 'Введите Вашу фамилию:', '');
} while (checkFio(lastName) === false);

do {
  var firstName = prompt(incorrect + 'Введите Вашe имя:', '');
} while (checkFio(firstName) === false);

do {
  var secondName = prompt(incorrect + 'Введите Ваше отчество:', '');
} while (checkFio(secondName) === false);

do {
  var fullYears = parseInt(prompt(incorrect + 'Сколько Вам лет? ', ''), 10);
} while (checkFullYears(fullYears) === false);

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

var finalMessage = 'ваше ФИО: ' + fullName + '\n' +
  'Ваш возраст в годах: ' + fullYears + '\n' +
  'Ваш возраст в днях: ' + ageInDays + '\n' +
  'Через 5 лет вам будет: ' + futureYears + '\n' +
  'Ваш пол: ' + gender + '\n' +
  'Вы на пенсии: ' + pension;

alert(finalMessage);

function checkFio(fio) {
  if (fio === null || fio === '') {
    incorrect = 'Некорректный ввод! ';
    return false;
  }
  incorrect = '';
  return true;
}

function checkFullYears(years) {
  if (isNaN(years) || years <= 0 || years > 122) {
    incorrect = 'Введите, пожалуйста, корректный возраст! ';
    return false;
  }
  incorrect = '';
  return true;
}