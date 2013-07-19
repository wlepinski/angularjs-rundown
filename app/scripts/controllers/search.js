'use strict';

angular.module('angularjsRundownApp')
  .controller('SearchCtrl', ['rottenTomatoesApi', '$scope', '$routeParams', function (rottenTomatoesApi, $scope, $routeParams) {
    $scope.query = $routeParams.q;
    $scope.results = rottenTomatoesApi.search($routeParams.q);
    $scope.results.then(function(results){
      $scope.total = results.total;
    });

    $scope.paginate = function (currentPage) {
      $scope.results = rottenTomatoesApi.search($routeParams.q, currentPage);
    }
  }]);
