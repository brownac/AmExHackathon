'use strict';

/**
 * @ngdoc service
 * @name amExHackathonApp.interviews
 * @description
 * # calendar
 * Factory in the amExHackathonApp.
 */
angular.module('amExHackathonApp')
  .factory('calendarService', function($resource) {
    return $resource('/api/interviews/', null, {
      update: {
        method: 'PUT'
      }
    });
  });

angular.module('amExHackathonApp')
  .factory('linkFTService', function($resource) {
    return $resource('/api/interviews/interview_FT_Link', null, {
      update: {
        method: 'POST'
      }
    });
  });

angular.module('amExHackathonApp')
factory('linkINTService', function($resource) {
  return $resource('/api/interviews/interview_INT_Link', null, {
    update: {
      method: 'POST'
    }
  });
});
