'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:adminOptionsCtrl
 * @description
 * # adminOptionsCtrl
 * Controller of the amExHackathonApp
 */


angular.module('amExHackathonApp').controller('adminOptionsCtrl', function($scope, $q, $timeout, $routeParams, $location, candidateService, questionsService) {

  $scope.submitted = false;
  $scope.saved = false;
  $scope.fileId = 0;
  $scope.newForm = {};
  $scope.forms = [];

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

  $scope.submitLink = function() {


    $scope.sendingData = true;


    linkFTService.save($scope.postLinkFT).$promise.then(values => {
    // show success by changing submit button class and value
    $scope.pictureAdded = false;
    $scope.sendingData = false;
    $scope.buttonText = "Successfully Submitted";
    $scope.submitBtnClasses = "btn btn-success";
    });


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
