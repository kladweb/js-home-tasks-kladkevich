'use strict';
var tasksCompleted = {
  'Anna': 29,
  'Serg': 35,
  'Elena': 1,
  'Anton': 99
};
var employee = new Array();
var results = new Array();
var total;
var i = 0;
for (var win in tasksCompleted) {
  employee[i] = win;
  results[i] = tasksCompleted[win];
  i++;
}
var j = [0]; //сначала предполагаем, что первый сотрудник выполнил больше всех;
var BestValue = results[j[0]];
for (var i = 1; i < employee.length; i++) {
  if (BestValue < results[i]) {
    BestValue = results[i];  //ищем лучший результат;
    j[0] = i;  //запоминаем номер сотрудника с этим результатом.
  }
}
//проверяем, есть ли другие сотрудники с таким же наивысшим результатом:
for (var i = 0; i < employee.length; i++) {
  if (BestValue === results[i] && i !== j[0]) { //чтобы дважды не учесть одного и того же сотрудника.
    j.push(i);  //здесь становится понятно, почему j является не простой переменной, а массивом.
  }
}
//собираем результат в строку total:
if (j.length === 1) {
  total = `Больше всех задач выполнил(а) ${employee[j[0]]} с результатом ${BestValue} .`;
} else {
  total = `Больше всех задач выполнили ${employee[j[0]]}`;
  for (var i = 1; i < (j.length - 1); i++) {
    total += `, ${employee[j[i]]}`;
  }
  total += ` и ${employee[j[j.length - 1]]} c результатом ${BestValue} задач каждый.`;
}
console.log(total);
/*
Возможно, код получился слишком большой для такой простой задачи на данный момент. Но решение полностью рабочее, при
 этом мы получаем красивый ответ, особенно, если прилетит исходный массив, в котором максимальное количество
 выполненных задач есть сразу у нескольких сотрудников.
*/