'use strict';

angular.module('angularjsRundownApp')
  .factory('parseApi', ['$http', '$q',
    function ($http, $q) {
      var parseUserDefer = $q.defer();
      var parseUser = null;

      return {
        /**
         * [ description]
         *
         * @param  {[type]} facebookAuthData [description]
         *
         * @return {[type]}                  [description]
         */
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

          request.success(function (user) {
            parseUserDefer.resolve(user);
            parseUser = user;
            defer.resolve.apply(this, arguments);
          });

          request.error(function () {
            defer.reject.apply(this, arguments);
          });

          return defer.promise;
        },

        /**
         * [ description]
         *
         * @param  {[type]} movie [description]
         *
         * @return {[type]}       [description]
         */
        isMovieFavorited: function (movie) {
          var defer = $q.defer();
          parseUserDefer.promise.then(function (user) {
            var favorited = (user.favorite_movies.indexOf(movie.id) !== -1);
            defer.resolve(favorited);
          });
          return defer.promise;
        },

        /**
         * [ description]
         *
         * @param  {[type]} movie [description]
         *
         * @return {[type]}       [description]
         */
        toggleFavoriteMovie: function (movie) {
          var operation = (movie.favorited) ? 'AddUnique' : 'Remove';
          var userId = parseUser.objectId;
          var defer = $q.defer();

          $http({
            url: 'https://api.parse.com/1/users/' + userId,
            method: 'PUT',
            data: {
              'favorite_movies': {
                '__op': operation,
                'objects': [movie.id]
              }
            }
          }).success(function (response) {
            parseUser.favorite_movies = response.favorite_movies;
          });

          return defer.promise;
        }

      };
    }
  ]);
