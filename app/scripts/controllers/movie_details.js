'use strict';

angular.module('angularjsRundownApp')
  .controller('MovieDetailsCtrl', ['$rootScope', '$scope', '$routeParams', 'rottenTomatoesApi', 'parseApi', 'facebookApi',
    function ($rootScope, $scope, $routeParams, rottenTomatoesApi, parseApi, facebookApi) {
      var movieInfo = rottenTomatoesApi.movieInfo($routeParams.movieId);

      movieInfo.then(function(movie){
        $rootScope.movieSelected = $scope.movie = movie;

        movie.favorited = parseApi.isMovieFavorited(movie);
      });

      $scope.toggleMovieFavorite = function(){
        if ($scope.movie.favorited){
          facebookApi.favoriteMovie($scope.movie);
        }
        parseApi.toggleFavoriteMovie($scope.movie);
      };

      // After the load, track an event using the Google Analitycs API
      movieInfo.then(function(movie){
        ga('send', 'event', 'movie', 'details', movie.title);
      });

    }]);
