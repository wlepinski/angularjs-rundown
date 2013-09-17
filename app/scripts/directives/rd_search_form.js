'use strict';

angular.module('angularjsRundownApp')
  .directive('rdSearchForm', ['$rootScope', '$location', '$routeParams',
    function ($rootScope, $location, $routeParams) {
      // Returns a function, that, as long as it continues to be invoked, will not
      // be triggered. The function will be called after it stops being called for
      // N milliseconds. If `immediate` is passed, trigger the function on the
      // leading edge, instead of the trailing.
      var debounce = function (func, wait, immediate) {
        var timeout;
        return function () {
          var context = this,
            args = arguments;
          var later = function () {
            timeout = null;
            if (!immediate) {
              func.apply(context, args);
            }
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);

          if (callNow) {
            func.apply(context, args);
          }
        };
      };

      return {
        restrict: 'A',
        require: '^form',
        link: function postLink(scope) {
          // If we have a $routeParams.q setted copy the value to the scope.
          if ($routeParams.q) {
            scope.q = $routeParams.q;
          }

          // We need to watch on the q scope variable. When a new value
          // arrives we need to update the $location.path and $location.search.
          // We're using a debounce function to control how much times this method
          // will be called during user typing. We setup up to call this function only
          // every 300 milliseconds, any other calls between this time will be ignored.
          scope.$watch('query', debounce(function (newValue) {
            if (newValue) {
              $location.path('search');
              $location.search('q', newValue);

              // The $apply here is to force the scope digest process ASAP.
              scope.$apply();
            }
          }, 1200));
        }
      };
    }
  ]);
