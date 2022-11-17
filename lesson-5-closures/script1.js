'use strict';
var john = {
  bills: [124, 48, 268, 180, 42],
  tips: [],
  finalValues: [],
  tipCalc: function () {
    var percentage;
    for (var i = 0; i < this.bills.length; i++) {
      if (this.bills[i] < 50) {
        percentage = 0.2;
      } else if (this.bills[i] >= 50 && this.bills[i] < 200) {
        percentage = 0.15;
      } else {
        percentage = 0.1;
      }
      this.tips[i] = this.bills[i] * percentage;
      this.finalValues[i] = this.bills[i] + this.tips[i];
    }
    return this.tips;
  }
};
john.tipCalc();
console.log('Аll tips: ' + john.tips);
console.log('Final paid amounts (bill + tip): ' + john.tips);

/*
function tipCalculator(bill) {
  var percentage;
  if (bill < 50) {
    percentage = 0.2;
  } else if (bill >= 50 && bill < 200) {
    percentage = 0.15;
  } else {
    percentage = 0.1;
  }
  return percentage * bill;
}

var bills = [124, 48, 268];
var tips = [tipCalculator(bills[0]),
  tipCalculator(bills[1]),
  tipCalculator(bills[2])];

var finalValues = [bills[0] + tips[0],
  bills[1] + tips[1],
  bills[2] + tips[2]];

console.log(tips, finalValues);*/
