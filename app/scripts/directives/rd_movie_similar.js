'use strict';

angular.module('angularjsRundownApp')
  .controller('rdMovieSimilarCtrl', ['$scope', 'rottenTomatoesApi', function($scope, rottenTomatoesApi){
    this.loadMovieClips = function() {
      $scope.data = rottenTomatoesApi.similar($scope.movie.id);
    };
  }])
  .directive('rdMovieSimilar', function () {
    return {
      templateUrl: '/views/directives/rd_movie_similar.html',
      restrict: 'E',
      replace: true,
      controller: 'rdMovieSimilarCtrl',
      scope: {
        movie: '='
      },
      link: function postLink(scope, element, attrs, controller) {
        scope.$watch('movie', function (newValue, oldValue) {
          if (newValue) {
            controller.loadMovieClips();
          }
        });
      }
    };
  });
