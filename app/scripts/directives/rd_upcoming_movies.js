'use strict';

angular.module('angularjsRundownApp')
  .controller('rdUpcomingMoviesCtrl', ['$scope', 'rottenTomatoesApi', function($scope, rottenTomatoesApi){
    $scope.upcoming = rottenTomatoesApi.upcoming();
  }])
  .directive('rdUpcomingMovies', function () {
    return {
      templateUrl: 'views/directives/rd_upcoming_movies.html',
      restrict: 'E',
      replace: true,
      controller: 'rdUpcomingMoviesCtrl',
      scope: true
    };
  });
