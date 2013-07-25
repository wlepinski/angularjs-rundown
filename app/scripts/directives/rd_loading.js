/*global Spinner:true*/

'use strict';

angular.module('angularjsRundownApp')
  .directive('rdLoading', ['$parse',
    function ($parse) {
      var baseOptions = {
        'default': {
          lines: 11,
          length: 0,
          width: 2,
          radius: 5,
          corners: 0,
          rotate: 6,
          direction: 1,
          color: '#FFF',
          speed: 1,
          trail: 60,
          shadow: false,
          hwaccel: true,
          className: 'spinner',
          zIndex: 2e9,
          top: 'auto',
          left: 'auto'
        },

        'big': {
          lines: 9,
          length: 0,
          width: 5,
          radius: 11,
          corners: 1,
          rotate: 6,
          direction: 1,
          color: '#FFF',
          speed: 1,
          trail: 100,
          shadow: false,
          hwaccel: true,
          className: 'spinner',
          zIndex: 2e9,
          top: 'auto',
          left: 'auto'
        }
      };

      return {
        template: '<div class="rd-loading"></div>',
        replace: true,
        restrict: 'E',
        link: function postLink(scope, element, attrs) {
          var size = attrs.size || "default";

          // Get the default options set
          var defaultOptions = baseOptions[size];

          console.log(defaultOptions);

          // Checking if we have custom options. If not, just create an empty object to
          // avoid exceptions during the extend phase.
          attrs.options = $parse(attrs.options)() || {};

          // Create a new options object extending the default options with the custom
          // options passed on the directive tag.
          var options = angular.extend({}, defaultOptions, attrs.options);

          // Create the Spinner Object and pass the directive's element.
          // We need to get the [0] because the element is actually an Array
          // so we need to get the first one.
          var spinner = new Spinner(options).spin(element[0]);

          // If the element was destroyed, we need to stop the spinner
          element.bind('$destroy', function () {
            spinner.stop();
          });
        }
      };
    }
  ]);
