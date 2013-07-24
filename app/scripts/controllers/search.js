'use strict';

angular.module('angularjsRundownApp')
  .controller('SearchCtrl', ['rottenTomatoesApi', '$scope', '$routeParams', function (rottenTomatoesApi, $scope, $routeParams) {
    var query = $scope.query = $routeParams.q;

    // Search for movies using the query passed via URL
    $scope.results = rottenTomatoesApi.search($routeParams.q);
    $scope.results.then(function(results){
      $scope.total = results.total;

      // Track event of the movie search
      ga('send', 'event', 'movie', 'search', query);
    });

    // Method to handle the result pagination.
    // When this method is called, a new request will be made to the
    // backend to fetch a new collection of data.
    $scope.paginate = function (currentPage) {
      $scope.results = rottenTomatoesApi.search($routeParams.q, currentPage);
    }
  }]);
