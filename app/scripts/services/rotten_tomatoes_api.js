'use strict';

angular.module('angularjsRundownApp')
  .factory('rottenTomatoesApi', ['$http', '$q',
    function ($http, $q) {
      // Public API he,re
      return {
        /**
         * Retrieves the current top dvd rentals.
         *
         * @return {Promise} The request's Promise.
         */
        topRentals: function () {
          var defer = $q.defer();

          $http.get('/api/public/v1.0/lists/dvds/top_rentals.json')
            .success(function (data) {
              defer.resolve(data);
            });

          return defer.promise;
        },
        /**
         * Detailed information on a specific movie specified by Id.
         * You can use the movies search endpoint or peruse the lists of movies/dvds to get the urls to movies.
         *
         * @param  {Integer} movieId The Movie's ID.
         *
         * @return {Promise}         The request's Promise.
         */
        movieInfo: function (movieId) {
          var defer = $q.defer();

          $http.get('/api/public/v1.0/movies/' + movieId + '.json')
            .success(function (data) {
              defer.resolve(data);
            });

          return defer.promise;
        },
        /**
         * Related movie clips and trailers for a movie
         *
         * @param  {Integer} movieId The Movie's ID.
         *
         * @return {Promise}         The request's Promise.
         */
        movieClips: function (movieId) {
          var defer = $q.defer();

          $http.get('/api/public/v1.0/movies/' + movieId + '/clips.json')
            .success(function (data) {
              defer.resolve(data);
            });

          return defer.promise;
        },
        /**
         * Shows similar movies for a movie. The example below shows a movie similar to Toy Story 3
         *
         * @param  {Integer} movieId The Movie's ID.
         *
         * @return {Promise}         The request's Promise.
         */
        similar: function (movieId, limit) {
          limit = limit || 5;

          var defer = $q.defer();

          $http({
            method: 'GET',
            url: '/api/public/v1.0/movies/' + movieId + '/similar.json',
            params: {
              limit: limit
            }
          })
            .success(function (data) {
              defer.resolve(data);
            });

          return defer.promise;
        },
        /**
         * Retrieves upcoming movies. Results are paginated if they go past the specified page limit
         *
         * @return {Promise}         The request's Promise.
         */
        upcoming: function () {
          var defer = $q.defer();

          $http.get('/api/public/v1.0/lists/movies/upcoming.json')
            .success(function (data) {
              defer.resolve(data);
            });

          return defer.promise;
        },
        /**
         * The movies search endpoint for plain text queries.
         *
         * @param  {String} q         The plain text search query to search for a movie. Remember to URI encode this!
         * @param  {Integer} page      The selected page of movie search results
         * @param  {Integer} pageLimit The amount of movie search results to show per page
         *
         * @return {Promise}           The request's Promise.
         */
        search: function (q, page, pageLimit) {
          pageLimit = pageLimit || 30;
          page = page || 1;

          var defer = $q.defer();

          $http({
            method: 'GET',
            url: '/api/public/v1.0/movies.json',
            params: {
              'q': q,
              'page': page,
              'page_limit': pageLimit
            }
          })
            .success(function (data) {
              defer.resolve(data);
            });

          return defer.promise;
        },

        currentReleases: function (country, page, pageLimit) {
          country = country || 'us';
          pageLimit = pageLimit || 30;
          page = page || 1;

          var defer = $q.defer();

          $http({
            method: 'GET',
            url: '/api/public/v1.0/lists/dvds/current_releases.json',
            params: {
              'country': country,
              'page': page,
              'page_limit': pageLimit
            }
          })
            .success(function (data) {
              defer.resolve(data);
            });

          return defer.promise;
        },

        newReleases: function (country, page, pageLimit) {
          country = country || 'us';
          pageLimit = pageLimit || 30;
          page = page || 1;

          var defer = $q.defer();

          $http({
            method: 'GET',
            url: '/api/public/v1.0/lists/dvds/new_releases.json',
            params: {
              'country': country,
              'page': page,
              'page_limit': pageLimit
            }
          })
            .success(function (data) {
              defer.resolve(data);
            });

          return defer.promise;
        }
      };
    }
  ]);
