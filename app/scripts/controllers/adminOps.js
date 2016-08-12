'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:adminOptionsCtrl
 * @description
 * # adminOptionsCtrl
 * Controller of the amExHackathonApp
 */


angular.module('amExHackathonApp').controller('adminOptionsCtrl', function($scope, $q, $timeout, $routeParams, $location, linkService, calendarService, questionsService) {

  $scope.submitted = false;
  $scope.saved = false;
  $scope.fileId = 0;
  $scope.newForm = {};
  $scope.forms = [];
  $scope.interviews = [];





  $scope.init = function() {
    $scope.submitted = false;
    $scope.saved = false;
    $scope.initNewForm();
    $scope.buttonText = "Submit";
    $scope.sendingData = false;
    $scope.submitBtnClasses = "btn btn-primary";
    console.log("INIT CALLED 0");

    // Get all the interview questions in the database
    questionsService.query().$promise.then(values => {
    console.log("INIT CALLED");
    $scope.forms = values;
    console.log("IMAGES: " + values.Images);
    });

    calendarService.query().$promise.then(values => {
    $scope.interviews = values;


    });

  };

  $scope.toggleActive = function(form) {
    var i = $scope.forms.indexOf(form);
    $scope.forms[i].active = !$scope.forms[i].active;

    console.log(form);
    // Call server size function to make server-side update
    $scope.forms[i].$update().then(values => {
    console.log("UPDATE BACK END ACTIVE");
    $timeout(() => {
    }, 1500);
    });

    $scope.init();
  };

  $scope.initNewForm = function() {
    $scope.fileId = 0;
    $scope.newForm = {
      active: false,
      form_type: '',
      form_model: '',
      version: 0,
      files: new Array(5)
    };
  };

  $scope.readImage = function(event) {
    var files = event.target.files;

    if (files && files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $scope.$apply(function() {
          $scope.newForm.files[$scope.fileId] = e.target.result;
        });
      };
      reader.readAsDataURL(files[0]);
    }
  };

  $scope.submit = function() {
    // Flag denoted that the form has been submitted
    $scope.submitted = true;

    // Save on the backend
    console.log($scope.newForm);
    questionsService.save($scope.newForm).$promise.then(values => {
    // show success by changing submit button class and value
    console.log("before reset: " + $scope.newForm);
    $scope.saved = true;

    $timeout(() => {
    // No redirection needed
    $('#imageModal').modal('toggle');
    $scope.init();
    }, 1000);
    });
  };

  $scope.submitLink = function(interview_FT_Link, interview_Int_Link) {
    //  console.log(cool);
    $scope.sendingData = true;
    console.log("WE MADE IT TO HERE");
    var i = 0;
    for (; i < $scope.interviews.length; i++) {
      console.log("updated");
      $scope.interviews[i].Interview.Interview_FT_Link = interview_FT_Link;
      $scope.interviews[i].Interview.Interview_Int_Link = interview_Int_Link;

      $scope.linkService.$update($scope.interviews[i]).$promise.then(values => {
      console.log("WHY NOT");
      });

    }



  };

  $scope.tabs = [{
    title: 'Questions',
    url: 'tabQuestions.html'
  }, {
    //title: 'Notes',
    //temporary. Just to show image
    title: 'Email',
    url: 'tabEmail.html'
  }];

  $scope.currentTab = 'tabQuestions.html';

  $scope.onClickTab = function(tab) {
    $scope.currentTab = tab.url;
  }

  $scope.isActiveTab = function(tabUrl) {
    return tabUrl == $scope.currentTab;
  }


  $scope.init();
});
