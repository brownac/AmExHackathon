'use strict';

/**
 * @ngdoc service
 * @name amExHackathonApp.interviews
 * @description
 * # calendar
 * Factory in the amExHackathonApp.
 */
angular.module('amExHackathonApp')
  .factory('interviewerService', function ($resource) {
    return $resource('/api/interviewers/:id', null, {
    });
  });
