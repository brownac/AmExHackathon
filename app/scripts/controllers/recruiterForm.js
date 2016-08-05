'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:RecruiterFormCtrl
 * @description
 * # RecruiterFormCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('RecruiterFormCtrl', function ($scope) {
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
	$('#timepicker1').timepicker({
		defaultTime: '9:00 AM'
	});
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
        title: $scope.location +": "+ $scope.selectedCandidate,
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
    }
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
