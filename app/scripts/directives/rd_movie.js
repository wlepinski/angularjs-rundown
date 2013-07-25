'use strict';

angular.module('angularjsRundownApp')
  .directive('rdMovie', function () {
    return {
      templateUrl: '/views/directives/rd_movie.html',
      restrict: 'A'
    };
  });
