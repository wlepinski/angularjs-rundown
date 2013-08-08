'use strict';

angular.module('angularjsRundownApp')
  .service('appSession', ['$log', '$q', '$cookieStore', '$rootScope', 'parseApi',
    function ($log, $q, $cookieStore, $rootScope, parseApi) {
      // Assign the appSession the $rootScope.appSession
      // This means that any modification to appSession will be propagated
      // to the scope and to the view.
      $rootScope.appSession = this;

      var currentUser = null;

      /**
       * Set the current user on the application using a Facebook authentication data.
       *
       * @param  {[type]}   facebookData The Facebook's authentication data.
       * @param  {Function} callback     A callback that will be called when the authentication job is done.
       *
       * @return {[type]}                [description]
       */
      this.setCurrentUser = function (facebookData) {
        var job = $q.defer();

        // If auResponse is null we need to logout the user.
        if (facebookData === null) {
          // Remove the current user and remove it from the $cookieStore.
          currentUser = null;
          $cookieStore.remove('currentUser');

          return job.resolve(currentUser);
        }

        var expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + facebookData.authResponse.expiresIn);

        $log.debug('Linking user on the Parse.com API.');

        parseApi.linkUser({
          userId: facebookData.authResponse.userID,
          accessToken: facebookData.authResponse.accessToken,
          expirationDate: expireDate.toISOString()
        })
          .then(function (parseUser) {
            $log.debug('User linked. Calling /me on Facebook');

            // Call the Facebook API to get some more information about the user
            FB.api('/me', function (facebookUser) {
              $rootScope.$apply(function () {
                $log.debug('Facebook user fetched.');

                // We need to extend the Facebook's user with the parse user cause
                // some parts of the application use information of both providers.
                currentUser = angular.extend(facebookUser, parseUser);

                // Record a cookie with the currentUser
                $cookieStore.put('currentUser', currentUser);

                // Resolve the job defer using the current user.
                job.resolve(currentUser);
              });
            });
          }, function () {
            $log.error(arguments);
          });

        return job.promise;
      };

      this.getCurrentUser = function () {
        return currentUser;
      };
    }
  ]);
