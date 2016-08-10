'use strict';

// things to do still:
// add interviewer name,
// add interview scheduling validation

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:RecruiterHomeCtrl
 * @description
 * # RecruiterHomeCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('RecruiterHomeCtrl', function ($scope, calendarService) {
    $scope.init = function() {
      //initializes the fields
      $scope.interviewDate = '';
      $scope.interviewTime = '8:00 AM';
      $scope.location = '';
      //initializes the array
      $scope.candidateQueue = [];
      $scope.scheduledCandidates = [];
      $scope.events = [];
      //creates the array of candidates to be scheduled
      var query = {
        sequelize:{
          //searches the db where there are no interview Dates
          interview_Date: null
        }
      };
      calendarService.query(query).$promise.then(values => {
        for (var i = values.length - 1; i >= 0; i--) {
          values[i].fullName =  values[i].lastName + ', ' + values[i].firstName
        }
        $scope.candidateQueue = values;
      });

      //creates the array of candidates already scheduled, to populate the calendar
      var query2 = {
        sequelize:{
          interview_Date:{
            //queries the db for those who have interviews scheduled
            $not: null
          }
        }
      };
      calendarService.query(query2).$promise.then(values => {
        //loops through all the scheduled candidates to add them to the calendar
        for (var i = values.length - 1; i >= 0; i--) {
          values[i].fullName =  values[i].lastName + ', ' + values[i].firstName
          //sets the interview to a js Date object
          values[i].Interview.interview_Date = new Date(values[i].Interview.interview_Date);
          $scope.events.push({
            title:       values[i].fullName + ': ' + values[i].Interview.interview_Location,
            startsAt:    values[i].Interview.interview_Date,
            color: {
              primary: '#e3bc08',
              secondary: '#fdf1ba'
            },
            candidate: values[i]
          });
        };
        $scope.scheduledCandidates = values;
      });
    }

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
  		defaultTime: '8:00 AM'
  	});
  	$('#timepicker2').timepicker();
  	$scope.changeView = function(newView){
  		$scope.calendarView = newView;
  	};
  	$scope.calendarModal = function(){
      $("#schedulerModal").modal();
  	};

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
  		var beforeNoon = "AM";
  		var offset = 0;
  		if(fullDate.getHours() >= 12){
  			beforeNoon = "PM";
  			offset= 12;
  		}
  		if(fullDate.getHours() === 0){
  			offset = -12;
  		}
  		if(fullDate.getHours() === 12){
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
      getCorrectTime($scope.interviewTime);
      if($scope.interviewTime.includes("PM") && $scope.hour !== "12"){
      	var newHour = parseInt($scope.hour) + 12;
      	$scope.hour = newHour;
      }
      time.setHours($scope.hour,$scope.min);

      //adds the candidates interview to the calendar
      $scope.events.push({
        title: $scope.selectedCandidate +": "+ $scope.location,
        startsAt: time,
        color: {
          primary: '#e3bc08',
          secondary: '#fdf1ba'
        },
        candidate: $scope.selectedCandidate
      });

      //adds the interview information into the database
      var interviewInfo = {
        Interview_Date:  time,
        Interview_Time: $scope.interviewTime,
        Interview_Location: $scope.location,
        Interviewer_Name: 'BAD'
      };
      $scope.selectedCandidate.Interview = interviewInfo;
      $scope.selectedCandidate.$update().then(values => {
        console.log('INSERTING DATA');
      });
      //requerys the database the initializes the arrays again
      $scope.init();
    };

    //edit interview time
    $scope.getEditingForm = function(calendarEvent) {
      $("#editingModal").modal(); //get edit modal
      var index = $scope.events.indexOf(calendarEvent); //get index of specified interview
      $scope.editedCandidate = calendarEvent.candidate;

      //load preexisting fields to text boxes in editing modal
      $scope.editInterviewDate = $scope.events[index].startsAt;
      $scope.editLocation = $scope.events[index].candidate.Interview.interview_Location;
      $scope.editInterviewTime = getEditTime($scope.events[index].startsAt);
    };

    $scope.editEvent = function(calendarEvent) {
      var index = $scope.events.indexOf(calendarEvent); //get index of specified interview

      //get edited info
      var time = new Date($scope.editInterviewDate);
      getCorrectTime2($scope.editInterviewTime);
      if($scope.editInterviewTime.includes("PM") && $scope.hour !== "12"){
      	var newHour = parseInt($scope.hour) + 12;
      	$scope.hour = newHour;
      }
      time.setHours($scope.hour,$scope.min);

      //adds the interview information into the database
      var interviewInfo = {
        Interview_Date:  time,
        Interview_Time: $scope.editInterviewTime,
        Interview_Location: $scope.editLocation,
        Interviewer_Name: 'BAD'
      };
      $scope.editedCandidate.Interview = interviewInfo;
      $scope.editedCandidate.$update().then(values => {
        console.log('INSERTING DATA');
      });

      //requerys the database and initializes the arrays again
      $scope.init();
    };

    //delete interview time
    $scope.deleteEvent = function(calendarEvent) {
      $("#deletingModal").modal();
      $scope.deleteCalendarEvent = calendarEvent;
      $scope.deleteCandidate = calendarEvent.candidate;
    };

    $scope.deleteInterview = function() {

      //deletes the interview information from the database
      var interviewInfo = {
        Interview_Date:  null,
        Interview_Time: null,
        Interview_Location: null,
        Interviewer_Name: null
      };
      $scope.deleteCandidate.Interview = interviewInfo;
      $scope.deleteCandidate.$update().then(values => {
        console.log('Deleting interview information');
      });

      //requerys the database and initializes the arrays again
      $scope.init();
    };

  //initializes the calendar
 $scope.init();
});
