'use strict';

angular.module('angularjsRundownApp')
  .controller('MovieDetailsCtrl', ['$rootScope', '$scope', '$routeParams', 'rottenTomatoesApi',
    function ($rootScope, $scope, $routeParams, rottenTomatoesApi) {
      $rootScope.movieSelected = $scope.movie = rottenTomatoesApi.movieInfo($routeParams['movie_id']);

      // After the load, track an event using the Google Analitycs API
      $scope.movie.then(function(movie){
        ga('send', 'event', 'movie', 'details', movie.title);
      });

    }]);
