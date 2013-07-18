'use strict';

angular.module('angularjsRundownApp')
  .directive('rdBackgroundImage', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        scope.$watch(attrs.rdBackgroundImage, function(newValue, oldValue, scope){
          if (newValue) {
            element.css('background-image', 'url("' + newValue + '")');
          }
        });
      }
    };
  });
