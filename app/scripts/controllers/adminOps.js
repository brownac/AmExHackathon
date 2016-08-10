'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:adminOptionsCtrl
 * @description
 * # adminOptionsCtrl
 * Controller of the amExHackathonApp
 */


angular.module('amExHackathonApp').controller('adminOptionsCtrl', function($scope, $q, $timeout, questionsService) {
  $scope.fileId = 0;
  $scope.saved = false;         // Denoting that info has been saved to database
  $scope.forms = [{
    active: true,
    type: 'Technical',
    form: 'A',
    version: 1.0
  },
  {
    active: false,
    type: 'Technical',
    form: 'B',
    version: 1.0
  },
  {
    active: false,
    type: 'Behavioral',
    form: 'A',
    version: 2.0
  },
  {
    active: true,
    type: 'Behavioral',
    form: 'B',
    version: 2.0
  }];

  $scope.newForm = {};

  $scope.init = function() {
    questionsService.get({ id: candidateId }).$promise.then(value => {
      $scope.postCandidate = value;
    });
  };

  $scope.toggleActive = function(form) {
    var i = $scope.forms.indexOf(form);
    $scope.forms[i].active = !form.active;

    // Call server size function to make server-side update
  };

  $scope.initNewForm = function(){
    $scope.fileId = 0;
    $scope.newForm = {
      active: false,
      type: '',
      form: '',
      version: 0,
      files: new Array(5)
    };
  };

  $scope.readImage = function(event) {
    var files = event.target.files;

    if (files && files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
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
      // $scope.initNewForm();
      $scope.saved = true;

      $timeout(() => {
        // No redirection needed
        // $location.path('viewCandidate/' + $routeParams.candidateId);
      }, 1000);
    });
  }

  $scope.initNewForm();
});
