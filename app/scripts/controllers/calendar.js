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
  	var calDate = new Date();
  	$scope.calendarDate = calDate;
  	$scope.calendarTitle = calDate.getMonth() + " " + calDate.getFullYear();
  	$scope.changeView = function(newView){
  		$scope.calendarView = newView;
  	};
  	$scope.calendarModal = function(){
      $("#schedulerModal").modal();
  	}
    $('#submit1').click(function() {
      console.log("hi");
    });
    $scope.addEvent = function() {
      var time = new Date($scope.interviewDate);
      console.log("hello");
      time.setTime($scope.interviewTime);
      events.push({
        title: $scope.location,
        startsAt: time,
        color: {
          primary: '#e3bc08',
          secondary: '#fdf1ba'
        }
      })
        console.log($scope.events);
    }

  	$scope.events = [{
	    title: 'Event Test', // The title of the event
	    startsAt: new Date(2016,7,3,1), // A javascript date object for when the event starts
	    endsAt: new Date(2016,7,26,15), // Optional - a javascript date object for when the event ends

	    actions: [{ // an array of actions that will be displayed next to the event title
	      label: '<i class=\'glyphicon glyphicon-pencil\'></i>', // the label of the action
	      cssClass: 'edit-action', // a CSS class that will be added to the action element so you can implement custom styling
	      onClick: function(args) { // the action that occurs when it is clicked. The first argument will be an object containing the parent event
	        console.log('Edit event', args.calendarEvent);
	      }
	    }],
	    incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view

	}];
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
