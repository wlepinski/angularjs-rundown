'use strict';

describe('Controller: MovieDetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('angularjsRundownApp'));

  var MovieDetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $routeParams, $httpBackend) {
    scope = $rootScope.$new();
    MovieDetailsCtrl = $controller('MovieDetailsCtrl', {
      $scope: scope
    });
  }));

  // it('should attach a movie info', function () {
  //   expect(scope.movie.title).toBe('Toy Story 3');
  // });
});
