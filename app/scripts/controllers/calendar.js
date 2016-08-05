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
  	//$('#datetimepicker1').datepicker();
  	$('#datepicker').datepicker({
    	todayHighlight: true
	});
	$('#calendarSelectArrow').click(function(){
		setTimeout(function(){
			document.getElementsByClassName('ui-icon ui-icon-circle-triangle-w')[0].innerHTML='';
        	document.getElementsByClassName('ui-icon ui-icon-circle-triangle-e')[0].innerHTML='';
			document.getElementsByClassName('ui-icon ui-icon-circle-triangle-w')[0].className= "glyphicon glyphicon-chevron-left select-arrow";
			document.getElementsByClassName("ui-icon ui-icon-circle-triangle-e")[0].className= "glyphicon glyphicon-chevron-right select-arrow";
        },200);
	});
	$('.ui-corner-all').click(function(){
		setTimeout(function(){
			document.getElementsByClassName('ui-icon ui-icon-circle-triangle-w')[0].innerHTML='';
        	document.getElementsByClassName('ui-icon ui-icon-circle-triangle-e')[0].innerHTML='';
			document.getElementsByClassName('ui-icon ui-icon-circle-triangle-w')[0].className= "glyphicon glyphicon-chevron-left select-arrow";
			document.getElementsByClassName("ui-icon ui-icon-circle-triangle-e")[0].className= "glyphicon glyphicon-chevron-right select-arrow";
        },200);
	});
	$('#timepicker1').timepicker();
  	$scope.changeView = function(newView){
  		$scope.calendarView = newView;
  	};
  	$scope.calendarModal = function(){
      $("#schedulerModal").modal();
  	}

  	function getCorrectTime (time){
  		var offset = 1;
  		if($scope.interviewTime.substring(0,2).includes(":")){
  			offset = 0;
  		}
  		$scope.hour = $scope.interviewTime.substring(0,1+offset);
  		$scope.min = $scope.interviewTime.substring(2+offset,4+offset);
  	}

    $scope.addEvent = function() {
      var time = new Date($scope.interviewDate);
      getCorrectTime($scope.interviewTime)
      time.setHours($scope.hour,$scope.min);
      $scope.events.push({
        title: $scope.location,
        startsAt: time,
        color: {
          primary: '#e3bc08',
          secondary: '#fdf1ba'
        }
      });
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
