'use strict';

/**
 * @ngdoc service
 * @name amExHackathonApp.interviewQuestions
 * @description
 * # interviewQuestions
 * Factory in the amExHackathonApp.
 */
angular.module('amExHackathonApp')
  .factory('interviewQuestionService', function ($resource) {
    return $resource('/api/interviewQuestions/:id', null, {
      update: { method: 'PUT'}
    });
  });