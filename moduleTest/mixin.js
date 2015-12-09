var us = require('underscore');

us.mixin({
  betterWithNode: function (str) {
    return str + 'is better with node';
  }
});

console.log(us.betterWithNode('chocolate'));
