'use strict';
var tasksCompleted = {
  'Anna': 29,
  'Serg': 35,
  'Elena': 1,
  'Anton': 99
};
var win;
var BestValue = 0;
var employee = [];
var total;

//Находим лучший результат
for (win in tasksCompleted) {
  if (BestValue < tasksCompleted[win]) {
    BestValue = tasksCompleted[win];
  }
}
//Находим всех сотрудников, выполнивших лучший результат, и сохраняем их в массив
var i = 0;
for (win in tasksCompleted) {
  if (BestValue === tasksCompleted[win]) {
    employee[i] = win;
    i++;
  }
}
//собираем и выводим результат:
if (employee.length === 1) {
  total = `Больше всех задач выполнил(а) ${employee[0]} с результатом ${BestValue} .`;
} else {
  total = `Больше всех задач выполнили ${employee[0]}`;
  for (i = 1; i < (employee.length - 1); i++) {
    total += `, ${employee[i]}`;
  }
  total += ` и ${employee[employee.length - 1]} c результатом ${BestValue} задач каждый.`;
}
console.log(total);