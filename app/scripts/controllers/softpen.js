'use strict';

var app = angular.module('amExHackathonApp');
app.controller('SoftPenCtrl', function($scope, $location, softpenImage) {
  $scope.src = '../../images/resume.png';

  $scope.next = function() {
    var imgBase64 = $("#edited-image").attr('src');
    softpenImage.src = imgBase64;

    // redirect to form
    $location.path('screener/candidateForm');
  }
});
