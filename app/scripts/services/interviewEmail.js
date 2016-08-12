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
    console.log("im at the service");
    return $resource('/api/interviews/emails', null, {

      update: {
        method: 'PUT'
      }
    });
  });
