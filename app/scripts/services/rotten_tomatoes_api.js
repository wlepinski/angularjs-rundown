'use strict';

angular.module('angularjsRundownApp')
  .factory('rottenTomatoesApi', ['$http', '$q', function($http, $q) {
    // Private methods
    var getUrl = function (url) {
      return url;
    };

    // Public API he,re
    return {
      topRentals: function() {
        var defer = $q.defer();

        $http.get(getUrl('api/public/v1.0/lists/dvds/top_rentals.json'))
          .success(function(data){
            defer.resolve(data);
          });

        return defer.promise;
      },
      movieInfo: function(movieId) {
        var defer = $q.defer();

        $http.get(getUrl('api/public/v1.0/movies/' + movieId + '.json'))
          .success(function(data){
            defer.resolve(data);
          });

        return defer.promise;
      },
      movieClips: function (movieId) {
        var defer = $q.defer();

        $http.get(getUrl('api/public/v1.0/movies/' + movieId + '/clips.json'))
          .success(function(data){
            defer.resolve(data);
          });

        return defer.promise;
      },
      similar: function (movieId) {
        var defer = $q.defer();

        $http.get(getUrl('api/public/v1.0/movies/' + movieId + '/similar.json'))
          .success(function(data){
            defer.resolve(data);
          });

        return defer.promise;
      },
      upcoming: function (movieId) {
        var defer = $q.defer();

        $http.get(getUrl('api/public/v1.0/lists/movies/upcoming.json'))
          .success(function(data){
            defer.resolve(data);
          });

        return defer.promise;
      },
      search: function(q, page, pageLimit) {
        pageLimit = pageLimit || 30;
        page = page || 1;

        var defer = $q.defer();

        $http({
            method: 'GET',
            url: getUrl('api/public/v1.0/movies.json'),
            params: {
              'q': q,
              'page': page,
              'page_limit': pageLimit
            }
          })
          .success(function(data){
            defer.resolve(data);
          });

        return defer.promise;
      }
    };
  }]);
