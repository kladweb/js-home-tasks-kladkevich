var digits = [];
var digit;
var i = 0;

do {
  digit = prompt('Введите числа. После каждого числа нажмите OK. Завершить ввод - пустая строка или Cancel');
  if ((digit === '') || (digit === null)) {
    digit = NaN;
  } else {
    digit = Number(digit);
  }
  if (!(isNaN(digit))) {
    digits[i] = digit;
    i++;
  }
} while (!(isNaN(digit)));

/* Далее находим сумму всех элементов массива. По умолчанию здесь, скорее всего, я бы использовал цикл. Но, так как
 на прошлом занятии было предложено попробовать обойтись без цикла, решение будет таким: */
var result = digits.reduce(function (sum, current) {
  return sum + current;
}, 0);
alert(`Сумма всех введенных чисел равна ${result}`);