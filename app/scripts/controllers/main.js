'use strict';

angular.module('angularjsRundownApp')
  .controller('MainCtrl', ['$scope', 'rottenTomatoesApi',
    function ($scope, rottenTomatoesApi) {
      $scope.upcoming = rottenTomatoesApi.upcoming();
      $scope.newReleases = rottenTomatoesApi.newReleases();
      $scope.currentReleases = rottenTomatoesApi.currentReleases();
    }
  ]);
