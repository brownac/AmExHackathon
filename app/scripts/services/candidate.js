'use strict';

/**
 * @ngdoc service
 * @name amExHackathonApp.candidate
 * @description
 * # candidate
 * Factory in the amExHackathonApp.
 */
angular.module('amExHackathonApp')
  .factory('candidateService', function ($resource) {
    return $resource('/api/candidates/:id', null, {
      update: { method: 'PUT'}
    });
  });
