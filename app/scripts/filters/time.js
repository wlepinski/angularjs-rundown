'use strict';

angular.module('angularjsRundownApp')
  .filter('time', function () {
    return function (input) {
      var hours = parseInt(input / 60, 10);
      var minutes = input - (hours * 60);
      return hours + 'h ' + minutes + 'm';
    };
  });
