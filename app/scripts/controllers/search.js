'use strict';

angular.module('angularjsRundownApp')
  .controller('SearchCtrl', ['rottenTomatoesApi', '$scope', '$routeParams', function (rottenTomatoesApi, $scope, $routeParams) {
    console.log($routeParams);
    $scope.query = $routeParams.q;
    $scope.results = rottenTomatoesApi.search($routeParams.q);
  }]);
