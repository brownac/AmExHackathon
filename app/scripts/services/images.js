'use strict';

/**
 * @ngdoc service
 * @name amExHackathonApp.images
 * @description
 * # images
 * Factory in the amExHackathonApp.
 */
angular.module('amExHackathonApp')
  .factory('imageService', function ($resource) {
    return $resource('/api/images/:id', null, {
      update: { method: 'PUT'}
    });
  });