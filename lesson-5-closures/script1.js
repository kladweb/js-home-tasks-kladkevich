'use strict';
var john = {
  name: 'John',
  bills: [124, 48, 268, 180, 42],
  tips: [],
  finalValues: [],
  tipCalc: function () {
    var percentage;
    for (var i = 0; i < this.bills.length; i++) {
      if (this.bills[i] < 50) {
        percentage = 20;
      } else if (this.bills[i] >= 50 && this.bills[i] <= 200) {
        percentage = 15;
      } else {
        percentage = 10;
      }
      this.tips[i] = this.bills[i] * percentage / 100;
      this.finalValues[i] = this.bills[i] + this.tips[i];
    }
    return this.tips;
  }
};
john.tipCalc();
console.log('---------------------------------------');
console.log('Аll John\'s tips: ' + john.tips);
console.log('Final paid John\'s amounts (bill + tip): ' + john.finalValues);

var mark = {
  name: 'Mark',
  bills: [77, 375, 110, 45],
  tips: [],
  finalValues: [],
  tipCalc: function () {
    var percentage;
    for (var i = 0; i < this.bills.length; i++) {
      if (this.bills[i] < 100) {
        percentage = 20;
      } else if (this.bills[i] >= 100 && this.bills[i] <= 300) {
        percentage = 15;
      } else {
        percentage = 10;
      }
      this.tips[i] = this.bills[i] * percentage / 100;
      this.finalValues[i] = this.bills[i] + this.tips[i];
    }
    return this.tips;
  }
};
mark.tipCalc();
console.log('---------------------------------------');
console.log('Аll Mark\'s tips: ' + mark.tips);
console.log('Final paid Mark\'s amounts (bill + tip): ' + mark.finalValues);

function averageTip(client) {
  var tipSum = 0;
  for (var i = 0; i < client.tips.length; i++) {
    tipSum += client.tips[i];
  }
  return tipSum / client.tips.length;
}

var avarageJohn = averageTip(john);
var avarageMark = averageTip(mark);
console.log('---------------------------------------');
if (avarageJohn > avarageMark) {
  console.log(john.name + '\'s family paid the highest tips on average of $' + avarageJohn);
} else if (avarageJohn < avarageMark) {
  console.log(mark.name + '\'s family paid the highest tips on average of $' + avarageMark);
} else {
  console.log(`Families ${mark.name}\s and ${mark.name}\s paid the same tips on average of $${avarageJohn}`);
}
console.log('---------------------------------------');