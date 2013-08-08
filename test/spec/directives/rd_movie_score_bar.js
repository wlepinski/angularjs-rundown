'use strict';

describe('Directive: rdMovieScoreBar', function () {
  beforeEach(module('angularjsRundownApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<rd-movie-score-bar></rd-movie-score-bar>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the rdMovieScoreBar directive');
  }));
});
