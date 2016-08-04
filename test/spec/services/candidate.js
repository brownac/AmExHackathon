'use strict';

describe('Service: candidate', function () {

  // load the service's module
  beforeEach(module('amExHackathonApp'));

  // instantiate service
  var candidate;
  beforeEach(inject(function (_candidate_) {
    candidate = _candidate_;
  }));

  it('should do something', function () {
    expect(!!candidate).toBe(true);
  });

});
