'use strict';

/**
 * @ngdoc service
 * @name amExHackathonApp.calendarUI
 * @description
 * # calendar
 * Factory in the amExHackathonApp.
 */
angular.module('amExHackathonApp')
  .factory('calendarService', function ($resource) {
    return $resource('/api/interviews/:id', null, {
      update: { method: 'PUT'}
    });
  });