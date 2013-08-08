'use strict';

angular.module('angularjsRundownApp')
  .service('appSession', function appSession(parseApi) {
    var currentUser = null;

    this.setCurrentUser = function(facebookData) {
      var expireDate = new Date();
      expireDate.setTime(expireDate.getTime() + facebookData.authResponse.expiresIn);

      parseApi.linkUser({
        userId: facebookData.authResponse.userID,
        accessToken: facebookData.authResponse.accessToken,
        expirationDate: expireDate.toISOString()
      })
      .then(function(parseUser){
        // Call the Facebook API to get some more information about the user
        FB.api('/me', function(facebookUser) {

          currentUser = angular.extend(facebookUser, parseUser);
        });
      });
    };

    this.getCurrentUser = function() {
      return currentUser;
    };
  });
