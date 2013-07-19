'use strict';

angular.module('angularjsRundownApp')
  .directive('rdMovieScore', function () {
    return {
      templateUrl: '/views/directives/rd_movie_score.html',
      restrict: 'E',
      replace: true,
      scope: {
        movie: '='
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  });
