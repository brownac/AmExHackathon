'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:adminOptionsCtrl
 * @description
 * # adminOptionsCtrl
 * Controller of the amExHackathonApp
 */


angular.module('amExHackathonApp').controller('adminOptionsCtrl', function($scope) {
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

  $scope.toggleActive = function(form) {
    var i = $scope.forms.indexOf(form);
    $scope.forms[i].active = !form.active;

    // Call server size function to make server-side update
  };

  $scope.initNewForm = function(){
    $scope.newForm = {
      active: false,
      type: '',
      form: '',
      version: 0,
      files: []
    };
  };

  $scope.submit = function(form) {
    // Flag denoted that the form has been subitted
    $scope.submitted = true;

    // If one of the input validation fails, reject submission
    if (form.$invalid) {
      return;
    }

  };

});
