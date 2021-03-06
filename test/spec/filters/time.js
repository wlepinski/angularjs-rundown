'use strict';

describe('Filter: time', function () {

  // load the filter's module
  beforeEach(module('angularjsRundownApp'));

  // initialize a new instance of the filter before each test
  var time;
  beforeEach(inject(function ($filter) {
    time = $filter('time');
  }));

  it('should return the input prefixed with "time filter:"', function () {
    var timeData = 130;
    expect(time(timeData)).toBe('2h 10m');
  });

});
