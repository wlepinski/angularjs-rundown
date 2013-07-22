'use strict';

angular.module('angularjsRundownApp')
  .controller('rdTopRentalsCtrl', ['$scope', 'rottenTomatoesApi', function($scope, rottenTomatoesApi){
    $scope.topRentals = rottenTomatoesApi.topRentals();
  }])
  .directive('rdTopRentals', function () {
    return {
      templateUrl: 'views/directives/rd_top_rentals.html',
      restrict: 'E',
      replace: true,
      controller: 'rdTopRentalsCtrl',
      scope: true
    };
  });
