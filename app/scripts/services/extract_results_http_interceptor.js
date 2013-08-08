'use strict';

angular.module('angularjsRundownApp')
  .factory('extractResultsHttpInterceptor', ['$q',
    function ($q) {
      return {
        response: function (response) {
          if (angular.isObject(response.data) && ('results' in response.data)) {
            response.data = response.data.results;
          }

          return response || $q.when(response);
        },
      };
    }
  ]);
