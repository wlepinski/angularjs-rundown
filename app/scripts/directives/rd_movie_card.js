'use strict';

angular.module('angularjsRundownApp')
  .directive('rdMovieCard', [function () {
      return {
        templateUrl: 'views/directives/rd_movie_card.html',
        replace: true,
        restrict: 'A',
        scope: {
          movie: '='
        }
      };
    }]);
