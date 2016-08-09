'use strict';

describe('Service: softpenImage', function () {

  // load the service's module
  beforeEach(module('amExHackathonApp'));

  // instantiate service
  var softpenImage;
  beforeEach(inject(function (_softpenImage_) {
    softpenImage = _softpenImage_;
  }));

  it('should do something', function () {
    expect(!!softpenImage).toBe(true);
  });

});
