'use strict';

angular.module('angularjsRundownApp')
  .controller('rdMovieClipsCtrl', ['$scope', 'rottenTomatoesApi', function($scope, rottenTomatoesApi){
    this.loadMovieClips = function() {
      $scope.data = rottenTomatoesApi.movieClips($scope.movie.id);
      $scope.limit = 5;
      $scope.seeAll = function() {
        $scope.limit = 90;
      };
    };
  }])
  .directive('rdMovieClips', function () {
    return {
      templateUrl: '/views/directives/rd_movie_clips.html',
      restrict: 'E',
      controller: 'rdMovieClipsCtrl',
      scope: {
        movie: '='
      },
      link: function postLink(scope, element, attrs, controller) {
        scope.$watch('movie', function (newValue) {
          if (newValue) {
            controller.loadMovieClips();
          }
        });
      }
    };
  });
