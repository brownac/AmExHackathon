'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:CalendarCtrl
 * @description
 * # CalendarCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('CalendarCtrl', function ($scope) {
  	$scope.calendarView = 'month';
  	$scope.calendarDate = new Date();
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });