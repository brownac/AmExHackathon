'use strict';

/**
 * @ngdoc service
 * @name amExHackathonApp.archive
 * @description
 * # archive
 * Factory in the amExHackathonApp.
 */
angular.module('amExHackathonApp')
  .factory('archiveService', function ($resource) {
    return $resource('/api/archives/', null, {
      update: { method: 'PUT'}
    });
  });
