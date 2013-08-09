'use strict';

describe('Service: facebookApi', function () {

  // load the service's module
  beforeEach(module('angularjsRundownApp'));

  // instantiate service
  var facebookApi;
  beforeEach(inject(function(_facebookApi_) {
    facebookApi = _facebookApi_;
  }));

  it('should do something', function () {
    expect(!!facebookApi).toBe(true);
  });

});
