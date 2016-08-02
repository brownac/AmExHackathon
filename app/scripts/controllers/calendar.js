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
  	var date = new Date();
  	$scope.calendarDate = calDate;
  	$scope.calendarTitle = calDate.getMonth() + " " + calDate.getFullYear();
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });