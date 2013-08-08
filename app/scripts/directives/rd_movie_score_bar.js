'use strict';

angular.module('angularjsRundownApp')
  .directive('rdMovieScoreBar', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var score = scope.$eval(attrs.score);

        var G = Math.round((255*score)/100);
        var R = Math.round((255*(100-score))/100);
        var B = 0;

        element.css('width', score + '%');
        element.css('backgroundColor', 'rgba('+R+','+G+','+B+', 1)');
      }
    };
  });
