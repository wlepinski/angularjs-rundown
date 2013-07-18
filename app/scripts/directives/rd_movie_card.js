'use strict';

angular.module('angularjsRundownApp')
  .directive('rdMovieCard', ['$compile', function ($compile) {
      return {
        templateUrl: '/views/directives/rd_movie_card.html',
        restrict: 'A',
        compile: function (tElement) {
          // if (!tElement.attr('rd-background-image')) {
            // tElement.attr('rd-background-image', 'movie.posters.detailed');
          // }

          var content = angular.element('<div rd-background-image="movie.posters.detailed"></div>');
          content.append(tElement.children());
          tElement.replaceWith(content);

          return function postLink(scope, element, attrs) {
            element.addClass('movie-card');
          };
        }
      };
    }]);
