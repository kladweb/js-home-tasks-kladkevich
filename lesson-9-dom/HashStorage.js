'use strict';

function THashStorage() {
  var self = this;
  var storage = {};
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
    var keys = [];
    for (var key in storage) {
      keys.push(key);
    }
    return keys;
  }
}