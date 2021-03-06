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
  .controller('RecruiterHomeCtrl', function ($scope, calendarService, interviewerService) {
    interviewerService.query().$promise.then(values => {
      $scope.interviewerDropdown = values;
    });


    $scope.init = function() {
      //initializes the fields
      $scope.interviewConflict = false;
      $scope.interviewDate = '';
      $scope.interviewTime = '9:00 AM';
      $scope.location = '';
      $scope.interviewer1 = '';
      $scope.interviewer2 = '';
      //initializes the array
      $scope.candidateQueue = [];
      $scope.scheduledCandidates = [];
      $scope.events = [];
      //creates the array of candidates to be scheduled
      var query = {
        interviewQuery:{
          //searches the db where there are no interview Dates
          interview_Date: null
        },
        sequelize: {
            finalEvaluation:{
            //queries the db for those who have not been turned down
            $not: 'turndown'
          }
        }
      };
      calendarService.query(query).$promise.then(values => {
        for (var i = values.length - 1; i >= 0; i--) {
          values[i].fullName =  values[i].lastName + ', ' + values[i].firstName;
        }
        $scope.candidateQueue = values;
      });

      //creates the array of candidates already scheduled, to populate the calendar
      var query2 = {
        interviewQuery:{
          interview_Date:{
            //queries the db for those who have interviews scheduled
            $not: null
          }
        },
        sequelize: {
            finalEvaluation:{
            //queries the db for those who have not been turned down
            $not: 'turndown'
          }
        }
      };
      calendarService.query(query2).$promise.then(values => {
        //loops through all the scheduled candidates to add them to the calendar
        for (var i = values.length - 1; i >= 0; i--) {
          values[i].fullName =  values[i].lastName + ', ' + values[i].firstName;
          //sets the interview to a js Date object
          values[i].Interview.interview_Date = new Date(values[i].Interview.interview_Date);
          var endDate = new Date(values[i].Interview.interview_Date);
          endDate.setHours(endDate.getHours() + 1, endDate.getMinutes());
          $scope.events.push({
            title:       values[i].fullName + ': ' + values[i].Interview.interview_Location,
            startsAt:    values[i].Interview.interview_Date,
            endsAt:      endDate,
            color: {
              primary: '#e3bc08',
              secondary: '#fdf1ba'
            },
            candidate: values[i]
          });
        }
        $scope.scheduledCandidates = values;
      });
    };

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
      $scope.interviewConflict = false;
      getCorrectTime($scope.interviewTime);
      if($scope.interviewTime.includes("PM") && $scope.hour !== "12"){
        var newHour = parseInt($scope.hour) + 12;
        $scope.hour = newHour;
      }
      time.setHours($scope.hour,$scope.min);
      var endTime = new Date(time);
      endTime.setHours(endTime.getHours() + 1, $scope.min);
      for(var i = 0; i<$scope.events.length; i++){
        if($scope.events[i].startsAt.getTime() === time.getTime()){
          if($scope.events[i].candidate.Interview.interviewer_1 === $scope.interviewer1.name && $scope.events[i].candidate.Interview.interviewer_2 === $scope.interviewer2.name){
            $scope.interviewConflict = true;
            $scope.invalidInterviewer = $scope.interviewer1.name+ " and " + $scope.interviewer2.name + " have";
            return;
          }
          if($scope.events[i].candidate.Interview.interviewer_1 === $scope.interviewer1.name){
            $scope.interviewConflict = true;
            $scope.invalidInterviewer = $scope.interviewer1.name + " has";
            return;
          }
          if($scope.events[i].candidate.Interview.interviewer_2 === $scope.interviewer2.name){
            $scope.interviewConflict = true;
            $scope.invalidInterviewer = $scope.interviewer2.name + " has";
            return;
          }
        }
      }
      $scope.interviewConflict = false;
      //adds the candidates interview to the calendar
      $scope.events.push({
        title: $scope.selectedCandidate +": "+ $scope.location,
        startsAt: time,
        endsAt: endTime,
        color: {
          primary: '#e3bc08',
          secondary: '#fdf1ba'
        },
        candidate: $scope.selectedCandidate,
      });

      //adds the interview information into the database
      var interviewInfo = {
        Interview_Date:  time,
        Interview_Time: $scope.interviewTime,
        Interview_Location: $scope.location,
        Interviewer_1: $scope.interviewer1,
        Interviewer_2: $scope.interviewer2
      };
      $scope.selectedCandidate.Interview = interviewInfo;
      $scope.selectedCandidate.$update().then(values => {
        console.log('INSERTING DATA');
      });
      //requerys the database the initializes the arrays again
      $("#schedulerModal").modal("hide");
      $scope.init();
    };

    //edit interview time
    $scope.getEditingForm = function(calendarEvent) {
      $("#editingModal").modal(); //get edit modal
      $scope.interviewConflict = false;
      var index = $scope.events.indexOf(calendarEvent); //get index of specified interview
      $scope.editedCandidate = calendarEvent.candidate;


      //load preexisting fields to text boxes in editing modal
      $scope.editInterviewDate = $scope.events[index].startsAt;
      $scope.editLocation = $scope.events[index].candidate.Interview.interview_Location;
      $scope.editInterviewTime = getEditTime($scope.events[index].startsAt);
      var gotInterviewer1 = false;
      var gotInterviewer2 = false;
      for(var i = 0; i<$scope.interviewerDropdown.length; i++){
        if(calendarEvent.candidate.Interview.interviewer_1 === $scope.interviewerDropdown[i].name){
          $scope.editInterviewer1 = $scope.interviewerDropdown[i];
          gotInterviewer1 = true;
        }
        else if(calendarEvent.candidate.Interview.interviewer_2 === $scope.interviewerDropdown[i].name){
          $scope.editInterviewer2 = $scope.interviewerDropdown[i];
          gotInterviewer2 = true;
        }
        if(gotInterviewer1 && gotInterviewer2){
          break;
        }
      }
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
      for(var i = 0; i<$scope.events.length; i++){
        if($scope.events[i].startsAt.getTime() === time.getTime() && $scope.events[i].candidate.id !== $scope.editedCandidate.id){
          if($scope.events[i].candidate.Interview.interviewer_1 === $scope.editInterviewer1.name && $scope.events[i].candidate.Interview.interviewer_2 === $scope.editInterviewer2.name){
            $scope.interviewConflict = true;
            $scope.invalidInterviewer = $scope.editInterviewer1.name+ " and " + $scope.editInterviewer2.name + " have";
            return;
          }
          if($scope.events[i].candidate.Interview.interviewer_1 === $scope.editInterviewer1.name){
            $scope.interviewConflict = true;
            $scope.invalidInterviewer = $scope.editInterviewer1.name + " has";
            return;
          }
          if($scope.events[i].candidate.Interview.interviewer_2 === $scope.editInterviewer2.name){
            $scope.interviewConflict = true;
            $scope.invalidInterviewer = $scope.editInterviewer2.name + " has";
            return;
          }
        }
      }
      $scope.interviewConflict = false;
      //adds the interview information into the database
      var interviewInfo = {
        Interview_Date:  time,
        Interview_Time: $scope.editInterviewTime,
        Interview_Location: $scope.editLocation,
        Interviewer_1: $scope.editInterviewer1,
        Interviewer_2: $scope.editInterviewer2
      };
      $scope.editedCandidate.Interview = interviewInfo;
      var editing = {
        editing:true
      };
      $scope.editedCandidate.$update(editing).then(values => {
        console.log('INSERTING DATA');
      });

      $("#editingModal").modal("hide");
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
        Interviewer_1: {name: null},
        Interviewer_2: {name: null}
      };
      $scope.deleteCandidate.Interview = interviewInfo;
      $scope.deleteCandidate.$update().then(values => {
        console.log('Deleting interview information');
      });

      //requerys the database and initializes the arrays again
      $scope.init();
      $("#deletingModal").modal("hide");
    };

  //initializes the calendar
 $scope.init();
});
