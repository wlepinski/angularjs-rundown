'use strict';

describe('Service: parseApi', function () {

  // load the service's module
  beforeEach(module('angularjsRundownApp'));

  // instantiate service
  var parseApi;
  beforeEach(inject(function (_parseApi_) {
    parseApi = _parseApi_;
  }));

  it('should do something', function () {
    expect(!!parseApi).toBe(true);
  });

});
