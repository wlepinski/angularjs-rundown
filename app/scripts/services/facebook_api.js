'use strict';

angular.module('angularjsRundownApp')
  .factory('facebookApi', ['$q', function($q) {
    // Public API here
    return {
      favoriteMovie: function(movie) {
        var defer = $q.defer();

        FB.api(
          'me/kinetoscope:favorite',
          'post',
          {
            movie: 'http://kinetoscope.herokuapp.com/movie/' + movie.id,
          },
          function(response) {
            defer.resolve(response);
          }
        );

        return defer.promise;
      }
    };
  }]);
