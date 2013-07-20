'use strict';

angular.module('angularjsRundownApp')
  .controller('MovieDetailsCtrl', ['$rootScope', '$scope', '$routeParams', 'rottenTomatoesApi',
    function ($rootScope, $scope, $routeParams, rottenTomatoesApi) {
      $scope.movie = rottenTomatoesApi.movieInfo($routeParams['movie_id']);

      $scope.movie.then(function(data){
        $rootScope.backgroundImage = data.posters.detailed;
      });
    }]);
