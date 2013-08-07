'use strict';

describe('Service: authenticationHttpInterceptor', function () {

  // load the service's module
  beforeEach(module('angularjsRundownApp'));

  // instantiate service
  var authenticationHttpInterceptor;
  beforeEach(inject(function (_authenticationHttpInterceptor_) {
    authenticationHttpInterceptor = _authenticationHttpInterceptor_;
  }));

  it('should do something', function () {
    expect(!!authenticationHttpInterceptor).toBe(true);
  });

});
