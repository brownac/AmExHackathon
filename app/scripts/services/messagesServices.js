'use strict';

/**
 * @ngdoc service
 * @name amExHackathonApp.messages
 * @description
 * # messages
 * Service in the amExHackathonApp.
 */
angular.module('amExHackathonApp')
  .service('msgService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.messages = {};
  });
