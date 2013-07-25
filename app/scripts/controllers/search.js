'use strict';

angular.module('angularjsRundownApp')
  .controller('SearchCtrl', ['rottenTomatoesApi', '$scope', '$rootScope', '$routeParams',
    function (rottenTomatoesApi, $scope, $rootScope, $routeParams) {
      // On app.js we put a reloadOnSearch = false that doesn't instanciate the controller
      // everytime I search with a new query. With this setup we need to know when the
      // user has entered a new query, the $routeUpdate is triggered whenever the rdSearchForm
      // directive update the search portion of the URL using $location.search method.
      $rootScope.$on('$routeUpdate', function () {
        // Fetch the results using the new route params.
        fetchResults();
      });

      /**
       * Fetch search results
       */
      var fetchResults = function () {
        // We need to set the query on the $rootScope because the searchbox is created on the $rootScope.
        $rootScope.query = $routeParams.q;

        // Search for movies using the query passed via URL
        $scope.results = rottenTomatoesApi.search($scope.query);
        $scope.results.then(function (results) {
          $scope.total = results.total;

          // Track event of the movie search
          ga('send', 'event', 'movie', 'search', $scope.query);
        });
      };

      // When the user enters for the first time we need to search.
      // After this point the method fetchResults will be called only inside
      // $routeUpdate event handler.
      fetchResults();

      // Method to handle the result pagination.
      // When this method is called, a new request will be made to the
      // backend to fetch a new collection of data.
      $scope.paginate = function (currentPage) {
        $scope.results = rottenTomatoesApi.search($scope.query, currentPage);
      };
    }
  ]);
