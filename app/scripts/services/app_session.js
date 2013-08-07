'use strict';

angular.module('angularjsRundownApp')
  .service('appSession', function appSession() {
    var currentUser = null;

    this.setCurrentUser = function(user) {
      currentUser = user;
    };

    this.getCurrentUser = function() {
      return currentUser;
    };
  });
