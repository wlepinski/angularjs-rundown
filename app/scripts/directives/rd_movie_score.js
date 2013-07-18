'use strict';

angular.module('angularjsRundownApp')
  .directive('rdMovieScore', function () {
    return {
      templateUrl: '/views/directives/rd_movie_score.html',
      restrict: 'E',
      scope: {
        movie: '='
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  });
