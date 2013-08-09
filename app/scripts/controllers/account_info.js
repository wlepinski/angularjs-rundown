'use strict';

angular.module('angularjsRundownApp')
  .controller('AccountInfoCtrl', function ($scope, facebookPermissions, appSession) {
    $scope.login = function() {
      FB.login(angular.noop, {scope: facebookPermissions.join(',')});
    };

    $scope.logout = function() {
      appSession.setCurrentUser(null);
    };
  });
