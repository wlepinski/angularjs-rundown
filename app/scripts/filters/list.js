'use strict';

angular.module('angularjsRundownApp')
  .filter('list', function () {
    var getProp = function(propName) {
      return function(item) {
        return item[propName];
      };
    };

    return function (input, property) {
      if (!input) {
        return;
      }

      if (property) {
        input = input.map(getProp(property));
      }

      return input.join(', ');
    };
  });
