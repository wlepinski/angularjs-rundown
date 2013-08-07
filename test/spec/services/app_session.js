'use strict';

describe('Service: appSession', function () {

  // load the service's module
  beforeEach(module('angularjsRundownApp'));

  // instantiate service
  var appSession;
  beforeEach(inject(function (_appSession_) {
    appSession = _appSession_;
  }));

  it('should do something', function () {
    expect(!!appSession).toBe(true);
  });

});
