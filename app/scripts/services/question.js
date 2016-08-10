'use strict';

/**
 * @ngdoc service
 * @name amExHackathonApp.questions
 * @description
 * # questions
 * Factory in the amExHackathonApp.
 */
angular.module('amExHackathonApp')
  .factory('questionsService', function ($resource) {
    return $resource('/api/questions/', null, {
      update: { method: 'PUT'}
    });
  });