'use strict';

function THashStorage() {
  var storage = {};
  var self = this;
  self.addValue = function (key, value) {
    storage[key] = value;
  };
  self.getValue = function (key) {
    return storage[key];
  }
  self.deleteValue = function (key) {
    if (key in storage) {
      delete storage[key];
      return true;
    } else {
      return false;
    }
  }
  self.getKeys = function () {
    var keys = []
    for (var key in storage) {
      keys.push(key);
    }
    return keys;
  }
}

//
// var drinkStorage = new THashStorage();
//
// drinkStorage.addValue('Маргарита', {alco: true, recept: 'смешать'});
// drinkStorage.addValue('Маргарита2', {alco: true, recept: 'смешать'});
// drinkStorage.addValue('Маргарита3', {alco: true, recept: 'смешать'});
//
// console.log(drinkStorage);
// console.log(drinkStorage.deleteValue('Маргарита3'));
// console.log(drinkStorage.deleteValue('Маргарита3'));