'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:adminOptionsCtrl
 * @description
 * # adminOptionsCtrl
 * Controller of the amExHackathonApp
 */


angular.module('amExHackathonApp').controller('adminOptionsCtrl', function($scope) {
  $scope.forms = [{
    active: true,
    type: 'Technical',
    form: 'A',
    version: 1.0
  },
  {
    active: false,
    type: 'Technical',
    form: 'B',
    version: 1.0
  },
  {
    active: false,
    type: 'Behavioral',
    form: 'A',
    version: 2.0
  },
  {
    active: true,
    type: 'Behavioral',
    form: 'B',
    version: 2.0
  }];
});
