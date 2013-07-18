'use strict';

angular.module('angularjsRundownApp')
  .controller('SearchCtrl', ['rottenTomatoesApi', '$scope', '$routeParams', function (rottenTomatoesApi, $scope, $routeParams) {
    $scope.results = rottenTomatoesApi.search($routeParams.q);
  }]);
