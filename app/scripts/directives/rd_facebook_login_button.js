'use strict';

angular.module('angularjsRundownApp')
  .directive('rdFacebookLoginButton', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        // Bind an click event to the element to trigger the Facebook authentication.
        element.bind('click', function(){
          FB.login(angular.noop, {scope: 'email,user_likes'});
        });
      }
    };
  });
