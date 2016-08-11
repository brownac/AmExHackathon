'use strict';

/**
 * @ngdoc service
 * @name amExHackathonApp.interviews
 * @description
 * # calendar
 * Factory in the amExHackathonApp.
 */

angular.module('amExHackathonApp')
  .factory('linkService', function($resource) {
    return $resource('/api/interviews/emails', null, {
      update: {
        method: 'PUT'
      }
    });
  });
