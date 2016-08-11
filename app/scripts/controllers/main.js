'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('MainCtrl', function ($scope, calendarConfig) {
  	$scope.calendarView = 'month';
  	$scope.calendarDate = new Date();
  });
