'use strict';

describe('Filter: list', function () {

  // load the filter's module
  beforeEach(module('angularjsRundownApp'));

  // initialize a new instance of the filter before each test
  var list;
  beforeEach(inject(function ($filter) {
    list = $filter('list');
  }));

  it('should return the input prefixed with "list filter:"', function () {
    var listData = ['angularjs', 'is', 'awesome'];
    expect(list(listData)).toBe('angularjs, is, awesome');
  });

});
