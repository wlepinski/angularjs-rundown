'use strict';

describe('Service: rottenTomatoesApi', function () {

  // load the service's module
  beforeEach(module('angularjsRundownApp'));

  // instantiate service
  var rottenTomatoesApi;
  beforeEach(inject(function(_rottenTomatoesApi_) {
    rottenTomatoesApi = _rottenTomatoesApi_;
  }));

  it('should do something', function () {
    expect(!!rottenTomatoesApi).toBe(true);
  });

});
