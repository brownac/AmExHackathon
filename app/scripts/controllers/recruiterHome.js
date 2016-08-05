'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:RecruiterHomeCtrl
 * @description
 * # RecruiterHomeCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('RecruiterHomeCtrl', function ($scope) {
  	$scope.candidateQueue = [
	    {firstName:'John', lastName:'Doe', age:25, gender:'boy'},
	    {firstName:'Jessie', lastName:'Adams', age:30, gender:'girl'},
	    {firstName:'Johanna', lastName:'Davids', age:28, gender:'girl'},
	    {firstName:'Joy', lastName:'Express', age:15, gender:'girl'},
	    {firstName:'Mary', lastName:'Airlines', age:28, gender:'girl'},
	    {firstName:'Peter', lastName:'Royal', age:95, gender:'boy'},
	    {firstName:'Sebastian', lastName:'Cruise', age:50, gender:'boy'},
	    {firstName:'Erika', lastName:'Fish', age:27, gender:'girl'},
	    {firstName:'Patrick', lastName:'Cat', age:40, gender:'boy'},
	    {firstName:'Samantha', lastName:'Dog', age:60, gender:'girl'}
  	];
  	$scope.interviewTime = '9:00 AM';
  	$scope.scheduledCandidates = [];
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
	$('#timepicker1').timepicker({
		defaultTime: '9:00 AM'
	});
	$('#timepicker2').timepicker();
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
  		if($scope.interviewTime.includes("AM") && $scope.interviewTime.substring(0,2).includes("12")){
  			$scope.hour = '0';
  		}
  		else{
  			$scope.hour = $scope.interviewTime.substring(0,1+offset);
  		}
  		$scope.min = $scope.interviewTime.substring(2+offset,4+offset);
  	}

  	function getCorrectTime2 (time){
  		var offset = 1;
  		if($scope.editInterviewTime.substring(0,2).includes(":")){
  			offset = 0;
  		}
  		if($scope.editInterviewTime.includes("AM") && $scope.editInterviewTime.substring(0,2).includes("12")){
  			$scope.hour = '0';
  		}
  		else{
  			$scope.hour = $scope.editInterviewTime.substring(0,1+offset);
  		}
  		$scope.min = $scope.editInterviewTime.substring(2+offset,4+offset);
  	}

  	function getEditTime (fullDate){
  		console.log(fullDate.getHours());
  		var beforeNoon = "AM";
  		var offset = 0;
  		if(fullDate.getHours() >= 12){
  			beforeNoon = "PM";
  			offset= 12;
  		}
  		if(fullDate.getHours() == 0){
  			offset = -12;
  		}
  		if(fullDate.getHours() == 12){
  			offset = 0;
  		}
  		var addZero = "";
  		if(fullDate.getMinutes() < 10){
  			addZero ="0";
  		}
  		return (fullDate.getHours() - offset).toString() + ":" + addZero + fullDate.getMinutes().toString() + " " + beforeNoon;
  	}

    $scope.addEvent = function() {
      var time = new Date($scope.interviewDate);
      getCorrectTime($scope.interviewTime)
      if($scope.interviewTime.includes("PM") && $scope.hour != "12"){
      	var newHour = parseInt($scope.hour) + 12;
      	$scope.hour = newHour;
      }
      time.setHours($scope.hour,$scope.min);
      $scope.events.push({
        title: $scope.selectedCandidate +": "+ $scope.location,
        startsAt: time,
        color: {
          primary: '#e3bc08',
          secondary: '#fdf1ba'
        }
      });
      for(var i = 0; i<$scope.candidateQueue.length; i++){
      	if($scope.selectedCandidate.includes($scope.candidateQueue[i].firstName) && $scope.selectedCandidate.includes($scope.candidateQueue[i].lastName)){
      		$scope.scheduledCandidates.push($scope.candidateQueue[i]);
      		$scope.candidateQueue.splice(i,1);
      		break;
      	}
      }
      console.log($scope.scheduledCandidates);
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
      $scope.editInterviewTime = getEditTime($scope.events[index].startsAt);
    };

    $scope.editEvent = function(calendarEvent) {
      var index = $scope.events.indexOf(calendarEvent); //get index of specified interview

      //get edited info and add it to calendar
      var time = new Date($scope.editInterviewDate);
      getCorrectTime2($scope.editInterviewTime);
      if($scope.editInterviewTime.includes("PM") && $scope.hour != "12"){
      	var newHour = parseInt($scope.hour) + 12;
      	$scope.hour = newHour;
      }
      time.setHours($scope.hour,$scope.min);
      $scope.events.splice(index,1);
      $scope.events.push({
        title: $scope.editCandidateName + ": " + $scope.editLocation,
        startsAt: time
      });
    };

    //delete interview time
    $scope.deleteEvent = function(calendarEvent) {
      $("#deletingModal").modal();
      $scope.deleteCalendarEvent = calendarEvent;
    };

    $scope.deleteInterview = function() {
    	var index = $scope.events.indexOf($scope.deleteCalendarEvent);
		var colonPos = $scope.events[index].title.search(':');
		var name = $scope.events[index].title.substring(0,colonPos);
    	for(var i = 0; i<$scope.scheduledCandidates.length; i++){
	      	if(name.includes($scope.scheduledCandidates[i].firstName) && name.includes($scope.scheduledCandidates[i].lastName)){
	      		$scope.scheduledCandidates.splice(i,1);
	      		break;
	      	}
        }
        $scope.events.splice(index,1);
    };

    $scope.updateQueue = function() {
    	var index = $scope.events.indexOf($scope.deleteCalendarEvent);
		var colonPos = $scope.events[index].title.search(':');
		var name = $scope.events[index].title.substring(0,colonPos);
    	for(var i = 0; i<$scope.scheduledCandidates.length; i++){
	      	if(name.includes($scope.scheduledCandidates[i].firstName) && name.includes($scope.scheduledCandidates[i].lastName)){
	      		$scope.candidateQueue.push($scope.scheduledCandidates[i]);
	      		$scope.scheduledCandidates.splice(i,1);
	      		break;
	      	}
        }
        $scope.events.splice(index,1);
    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
