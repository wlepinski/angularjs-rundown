'use strict';

describe('Directive: rdTopRentals', function () {
  beforeEach(module('angularjsRundownApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<rd-top-rentals></rd-top-rentals>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the rdTopRentals directive');
  }));
});
