'use strict';

angular.module('angularjsRundownApp')
  .factory('authenticationHttpInterceptor', function($q, $rootScope, parseApplicationId, parseRestApiKey){
    return {
      request: function (config) {
        config.headers['X-Parse-Application-Id'] = parseApplicationId;
        config.headers['X-Parse-REST-API-Key'] = parseRestApiKey;

        var user = $rootScope.appSession.getCurrentUser();

        if (user) {
          config.headers['X-Parse-Session-Token'] = user.sessionToken;

          if (config.method === 'POST') {
            if (!('ACL' in config.data)) {
              config.data.ACL = {};
            }
            // Adding the access control list for the current request
            config.data.ACL[user.objectId] = { read: true, write: true };
          }
        }
        return config || $q.when(config);
      },
    };
  });
