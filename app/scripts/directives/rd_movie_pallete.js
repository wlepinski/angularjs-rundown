'use strict';

angular.module('angularjsRundownApp')
  .directive('rdMoviePallete', function () {
    return {
      restrict: 'C',
      scope: {
        movie: '='
      },
      link: function postLink(scope, element, attrs) {
        var colorThief = new ColorThief();

        scope.$watch('movie', function(newValue, oldValue, scope){
          if (newValue) {
            var image = new Image();

            image.onload = function() {
              var pallete = colorThief.getPalette(image);
              var colorSpan = null;
              var width = 100 / pallete.length;


              pallete.forEach(function(color){
                colorSpan = $('<span></span>')
                  .css('backgroundColor', 'rgba('+color[0]+','+color[1]+','+color[2]+', 1)')
                  .css('width', width + '%');

                element.append(colorSpan);
              });
            };

            image.src = '/image?url=' + newValue.posters.thumbnail;
          }
        });
      }
    };
  });
