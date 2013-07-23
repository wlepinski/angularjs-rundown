'use strict';

angular.module('angularjsRundownApp')
  .directive('rdColorThief', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var colorThief = new ColorThief();

        if (!attrs.rdColorThief && !attrs.rdColorThiefProperty){
          return;
        }

        scope.$watch(attrs.rdColorThief, function(newValue, oldValue, scope){
          if (newValue) {
            var image = new Image();

            image.onload = function() {
              var color = colorThief.getColor(image);
              element.css('backgroundColor', 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')');
            };

            var remoteImage = scope.$eval(attrs.rdColorThief + '.' + attrs.rdColorThiefProperty);

            image.src = '/image?url=' + encodeURIComponent(remoteImage);
          }
        });
      }
    };
  });
