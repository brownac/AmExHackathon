'use strict';

var app = angular.module('amExHackathonApp');
app.controller('SoftPenCtrl', function($scope, $location, softpenImage) {
  $scope.src = '../../images/resume.png';

  $scope.next = function() {
    var canvas = $("#c")[0];
    var image = new Image();
    image.src = canvas.toDataURL("image/png");

    // set the softpenImage.src to the base64 image from canvas
    softpenImage.src = image.src;

    // redirect to form, which uses softpenImage
    $location.path('screener/candidateForm');
  }
});
