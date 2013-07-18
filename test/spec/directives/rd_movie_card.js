'use strict';

describe('Directive: rdMovieCard', function () {
  beforeEach(module('angularjsRundownApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<rd-movie-card></rd-movie-card>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the rdMovieCard directive');
  }));
});
