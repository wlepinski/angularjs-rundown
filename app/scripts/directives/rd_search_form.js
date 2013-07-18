'use strict';

angular.module('angularjsRundownApp')
  .directive('rdSearchForm', ['$location', function ($location) {
      // Returns a function, that, as long as it continues to be invoked, will not
      // be triggered. The function will be called after it stops being called for
      // N milliseconds. If `immediate` is passed, trigger the function on the
      // leading edge, instead of the trailing.
      var debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
          var context = this, args = arguments;
          var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
        };
      };

      return {
        restrict: 'A',
        require: '^form',
        link: function postLink(scope, element, attrs, controller) {
          scope.$watch('q', debounce(function(newValue, oldValue){
            $location.path('search');
            $location.search('q', newValue);
            scope.$apply();
          }, 300));
        }
      };
    }]);
