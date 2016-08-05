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
    $('#datepicker2').datepicker({
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
  $('#calendarSelectArrow2').click(function(){
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
  $('#timepicker2').timepicker();
  	$scope.changeView = function(newView){
  		$scope.calendarView = newView;
  	};
  	$scope.calendarModal = function() {
      $("#schedulerModal").modal();
  	};

  	function getCorrectTime (time){
  		var offset = 1;
  		if($scope.interviewTime.substring(0,2).includes(":")){
  			offset = 0;
  		}
  		$scope.hour = $scope.interviewTime.substring(0,1+offset);
  		$scope.min = $scope.interviewTime.substring(2+offset,4+offset);
  	}
    function getCorrectTime2 (time){
  		var offset = 1;
  		if($scope.editInterviewTime.substring(0,2).includes(":")){
  			offset = 0;
  		}
  		$scope.hour = $scope.editInterviewTime.substring(0,1+offset);
  		$scope.min = $scope.editInterviewTime.substring(2+offset,4+offset);
  	}

    $scope.addEvent = function() {
      var time = new Date($scope.interviewDate);
      getCorrectTime($scope.interviewTime);
      time.setHours($scope.hour,$scope.min);
      $scope.events.push({
        title: $scope.candidateName + ": " + $scope.location,
        startsAt: time,
        color: {
          primary: '#e3bc08',
          secondary: '#fdf1ba'
        }
      });
    };

    //edit interview time
    $scope.getEditingForm = function(calendarEvent) {
      $("#editingModal").modal(); //get edit modal
      var index = $scope.events.indexOf(calendarEvent); //get index of specified interview
      var titleString = $scope.events[index].title;
      titleString.split(""); //split string chars into array values

      //parse name and location
      var colonPos = titleString.search(':');
      var name = titleString.substring(0,colonPos); //get candidate name
      var location = titleString.substring(colonPos+2,titleString.length); //get location

      //load preexisting fields to text boxes in editing modal
      $scope.editCandidateName = name;
      $scope.editLocation = location;
    };

    $scope.editEvent = function(calendarEvent) {
      var index = $scope.events.indexOf(calendarEvent); //get index of specified interview

      //get edited info and add it to calendar
      var time = new Date($scope.editInterviewDate);
      getCorrectTime2($scope.editInterviewTime);
      time.setHours($scope.hour,$scope.min);
      $scope.events.splice(index,1);
      $scope.events.push({
        title: $scope.editCandidateName + ": " + $scope.editLocation,
        startsAt: time
      });
    };

    //delete interview time
    $scope.deleteEvent = function(calendarEvent) {
      var index = $scope.events.indexOf(calendarEvent);
      $scope.events.splice(index,1);
    };

  	$scope.events  = [];
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
