'use strict';

angular.module('angularjsRundownApp')
  .controller('MovieDetailsCtrl', ['$rootScope', '$scope', '$routeParams', 'rottenTomatoesApi',
    function ($rootScope, $scope, $routeParams, rottenTomatoesApi) {
      $rootScope.movieSelected = $scope.movie = rottenTomatoesApi.movieInfo($routeParams['movie_id']);
    }]);
