'use strict';

angular.module('angularjsRundownApp')
  .directive('rdMoviePallete', function () {
    return {
      restrict: 'C',
      scope: {
        movie: '='
      },
      link: function postLink(scope, element) {
        element = $(element[0]);

        var colorThief = new ColorThief();
        var colorSpan = null;

        for (var i = 0; i < 9; i++) {
          colorSpan = $('<span></span>');
          element.append(colorSpan);
        }

        var colorSpans = element.find('span');

        scope.$watch('movie', function(newValue){
          if (newValue) {
            // We need to create a new image to calculate the palette
            var image = new Image();

            // When the image loads, we can grab the color information
            image.onload = function() {
              // Grab the color palette
              var pallete = colorThief.getPalette(image);

              // Calculate the width of each pallete equally
              var width = 100 / pallete.length;

              // For each color on the palette, create a span and assign the color
              var colorSpan = null;
              pallete.forEach(function(color, i){
                colorSpan = $(colorSpans.get(i))
                  .css('backgroundColor', 'rgba('+color[0]+','+color[1]+','+color[2]+', 1)')
                  .css('width', width + '%');
              });
            };

            // Append the image src to start the loading process
            image.src = '/image?url=' + newValue.posters.thumbnail;
          }
        });
      }
    };
  });
