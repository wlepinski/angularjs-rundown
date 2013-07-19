'use strict';

describe('Directive: rdMovieClips', function () {
  beforeEach(module('angularjsRundownApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<rd-movie-clips></rd-movie-clips>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the rdMovieClips directive');
  }));
});
