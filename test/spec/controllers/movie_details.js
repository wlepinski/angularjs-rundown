'use strict';

describe('Controller: MovieDetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsRundownApp'));

  var MovieDetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MovieDetailsCtrl = $controller('MovieDetailsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
