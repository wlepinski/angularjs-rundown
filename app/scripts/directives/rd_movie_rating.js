'use strict';

angular.module('angularjsRundownApp')
  .directive('rdMovieRating', function () {
    return {
      templateUrl: '/views/directives/rd_movie_rating.html',
      replace: true,
      restrict: 'E',
      scope: {
        movie: '='
      },
      link: function postLink(scope, element, attrs) {
        console.log(scope.movie);
      }
    };
  });
