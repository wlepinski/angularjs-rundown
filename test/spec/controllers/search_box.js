'use strict';

describe('Controller: SearchBoxCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsRundownApp'));

  var SearchBoxCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchBoxCtrl = $controller('SearchBoxCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
