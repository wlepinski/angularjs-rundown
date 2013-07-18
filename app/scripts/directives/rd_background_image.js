'use strict';

angular.module('angularjsRundownApp')
  .directive('rdBackgroundImage', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        scope.$watch(attrs.rdBackgroundImage, function(newValue, oldValue, scope){
          if (newValue) {
            console.log(newValue);
            var image = new Image();
            image.onload = function() {
              element.css('background-image', 'url("' + newValue + '")');
            };
            image.src = newValue;
          }
        });
      }
    };
  });
