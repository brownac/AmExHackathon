'use strict';

angular.module("amExHackathonApp")
  .factory('candidateToScreenerService', function() {
    var candidateInput = {};

    function set(data) {
      candidateInput = data;
    }
    function get() {
      return candidateInput;
    }

    return {
      set: set,
      get: get
    }
});
