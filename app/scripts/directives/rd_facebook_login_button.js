'use strict';

angular.module('angularjsRundownApp')
  .directive('rdFacebookLoginButton', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        element.bind('click', function(){
          FB.login(function(response) {
            var authResponse = response.authResponse;
            var authData = {
              "facebook": {
                "id": authResponse.userID,
                "access_token": authResponse.accessToken,
                "expiration_date": "token expiration date of the format: yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
              }
            }
          }, {scope: 'email,user_likes'});
        });
      }
    };
  });
