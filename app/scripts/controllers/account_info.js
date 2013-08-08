'use strict';

angular.module('angularjsRundownApp')
  .controller('AccountInfoCtrl', function ($scope, appSession) {
    $scope.login = function() {
      FB.login(angular.noop, {scope: 'email,user_likes'});
    };

    $scope.logout = function() {
      appSession.setCurrentUser(null);
    };
  });
