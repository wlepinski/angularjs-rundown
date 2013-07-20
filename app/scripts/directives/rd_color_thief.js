'use strict';

angular.module('angularjsRundownApp')
  .directive('rdColorThief', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var colorThief = new ColorThief();

        scope.$watch(attrs.rdColorThief, function(newValue, oldValue, scope){
          if (newValue) {
            var image = new Image();

            image.onload = function() {
              var color = colorThief.getColor(image);
              element.css('backgroundColor', 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')');
            };

            image.src = '/image?url=' + newValue;
          }
        });
      }
    };
  });
