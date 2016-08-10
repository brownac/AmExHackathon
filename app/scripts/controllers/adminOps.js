'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:adminOptionsCtrl
 * @description
 * # adminOptionsCtrl
 * Controller of the amExHackathonApp
 */


angular.module('amExHackathonApp').controller('adminOptionsCtrl', function($scope, $timeout, questionsService) {
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

  $scope.newForm = {
    active: false,
    type: '',
    form: '',
    version: 0,
    files: ['','','','','']
  };

  $scope.toggleActive = function(form) {
    var i = $scope.forms.indexOf(form);
    $scope.forms[i].active = !form.active;

    // Call server size function to make server-side update
  };

  $scope.initNewForm = function(){
    $scope.newForm = null;
  };

  $scope.readImage = function(event) {
    var files = event.target.files;
    if($scope.newForm.files === undefined) {
      $scope.newForm.files = new Array(5);
    }

    if (files && files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $scope.$apply(function() {
          // var i = 0;
          $scope.newForm.files.forEach(function(file){
            file = e.target.result;
          });
        });
      };
      reader.readAsDataURL(files[0]);
    }
  };

  $scope.submit = function(form) {
    // Flag denoted that the form has been subitted
    $scope.submitted = true;

    // If one of the input validation fails, reject submission
    if (form.$invalid) {
      return;
    }

    // Save on the backend
    questionsService.save($scope.newForm).$promise.then(values => {
      // show success by changing submit button class and value
      $scope.initNewForm();
      $scope.saved = true;

      $timeout(() => {
        // No redirection needed
      }, 1000);
    });
  };

});