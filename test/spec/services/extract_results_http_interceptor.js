'use strict';

describe('Service: extractResultsHttpInterceptor', function () {

  // load the service's module
  beforeEach(module('angularjsRundownApp'));

  // instantiate service
  var extractResultsHttpInterceptor;
  beforeEach(inject(function (_extractResultsHttpInterceptor_) {
    extractResultsHttpInterceptor = _extractResultsHttpInterceptor_;
  }));

  it('should do something', function () {
    expect(!!extractResultsHttpInterceptor).toBe(true);
  });

});
