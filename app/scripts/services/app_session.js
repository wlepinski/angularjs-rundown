'use strict';

angular.module('angularjsRundownApp')
  .service('appSession', function appSession($log, $rootScope, parseApi) {
    // Assign the appSession the $rootScope.appSession
    // This means that any modification to appSession will be propagated
    // to the scope and to the view.
    $rootScope.appSession = this;

    var currentUser = null;

    this.setCurrentUser = function(facebookData, callback) {
      callback = callback || angular.noop;

      // If auResponse is null we need to logout the user.
      if(facebookData === null){
        currentUser = null;
        return callback(currentUser);
      }

      var expireDate = new Date();
      expireDate.setTime(expireDate.getTime() + facebookData.authResponse.expiresIn);

      $log.debug('Linking user on the Parse.com API.');

      parseApi.linkUser({
        userId: facebookData.authResponse.userID,
        accessToken: facebookData.authResponse.accessToken,
        expirationDate: expireDate.toISOString()
      })
      .then(function(parseUser){
        $log.debug('User linked. Calling /me on Facebook');

        // Call the Facebook API to get some more information about the user
        FB.api('/me', function(facebookUser) {
          $log.debug('Facebook user fetched.');

          currentUser = angular.extend(facebookUser, parseUser);
          callback(currentUser);
        });
      }, function(){
        $log.error(arguments);
      });

      $rootScope.$apply();
    };

    this.getCurrentUser = function() {
      return currentUser;
    };
  });
