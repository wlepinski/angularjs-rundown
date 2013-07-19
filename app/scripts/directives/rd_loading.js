/*global Spinner:true*/

'use strict';

angular.module('angularjsRundownApp')
  .directive('rdLoading', function () {
    var defaultOptions = {
      lines: 13,
      length: 2,
      width: 2,
      radius: 4,
      corners: 1,
      rotate: 0,
      direction: 1,
      color: '#FFF',
      speed: 1,
      trail: 60,
      shadow: false,
      hwaccel: true,
      className: 'spinner',
      zIndex: 2e9,
      top: '0',
      left: '0'
    };

    return {
      template: '<div class="rd-loading"></div>',
      replace: true,
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // Checking if we have custom options. If not, just create an empty object to
        // avoid exceptions during the extend phase.
        attrs.options = attrs.options || {};

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
  });
