'use strict';

/**
 * @ngdoc service
 * @name amExHackathonApp.interviews
 * @description
 * # interview
 * Factory in the amExHackathonApp.
 */
angular.module('amExHackathonApp')
  .factory('interviewService', function ($resource) {
    return $resource('/api/interviews/:id', null, {
      update: { method: 'PUT'}
    });
  });