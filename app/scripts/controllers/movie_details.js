'use strict';

angular.module('angularjsRundownApp')
  .controller('MovieDetailsCtrl', ['$rootScope', '$scope', '$routeParams', 'rottenTomatoesApi', 'parseApi',
    function ($rootScope, $scope, $routeParams, rottenTomatoesApi, parseApi) {
      var movieInfo = rottenTomatoesApi.movieInfo($routeParams.movieId);

      movieInfo.then(function(movie){
        $rootScope.movieSelected = $scope.movie = movie;

        movie.favorited = parseApi.isMovieFavorited(movie);
      });

      $scope.toggleMovieFavorite = function(){
        parseApi.toggleFavoriteMovie($scope.movie);
      };

      // After the load, track an event using the Google Analitycs API
      movieInfo.then(function(movie){
        ga('send', 'event', 'movie', 'details', movie.title);
      });

    }]);
