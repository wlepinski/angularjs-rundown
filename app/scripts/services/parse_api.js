'use strict';

angular.module('angularjsRundownApp')
  .factory('parseApi', function ($http, $q) {
    return {
      linkUser: function (facebookAuthData) {
        var defer = $q.defer();

        var request = $http({
          url: 'https://api.parse.com/1/users',
          method: 'POST',
          data: {
            authData: {
              facebook: {
                'id': facebookAuthData.userId,
                'access_token': facebookAuthData.accessToken,
                'expiration_date': facebookAuthData.expirationDate
              }
            }
          }
        });

        request.success(function(){
          defer.resolve.apply(this, arguments);
        });

        request.error(function(){
          defer.reject.apply(this, arguments);
        });

        return defer.promise;
      }
    };
  });
