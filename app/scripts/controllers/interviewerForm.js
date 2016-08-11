'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:InterviewerFormCtrl
 * @description
 * # InterviewerFormCtrl
 * Controller of the amExHackathonApp
 */
angular.module('amExHackathonApp')
  .controller('InterviewerFormCtrl', function ($scope, $routeParams, candidateService, questionsService) {

  var candidateId = $routeParams.candidateId;
  $scope.pages = [];
  $scope.currentInterview = '';
  $scope.candidate = {};
  $scope.activeForms = [];
  $scope.pictureAdded = false;
  $scope.endInterview = false;
  $scope.interviewQId = 0;

  $scope.setInterview = function() {
    $scope.currentInterview = $scope.activeForms[$scope.interviewQId];
    $scope.pages = $scope.currentInterview.Images;
    if($scope.interviewQId + 1 === $scope.activeForms.length) {
      $scope.endInterview = true;
    }
  };

  $scope.init = function() {
    // Get selected Candidate information
    candidateService.get({ id: candidateId }).$promise.then(value => {
      $scope.candidate = value;
    });

    // Get the active form
    questionsService.query().$promise.then(values => {
      console.log("THIS IS WORKING");
      var i;
      for(i = 0; i < values.length; i++) {
        if(values[i].active === true) {
          $scope.activeForms.push(values[i]);
        }
      }

      // Set the canvas current page
      if($scope.activeForms !== undefined) {
        $scope.interviewQId = 0;
        $scope.setInterview();
      }
    });


  };

  $scope.next = function() {

    // SAVE THE IMAGE
    var canvas = $("#c")[0];
    var image = new Image();
    image.src = canvas.toDataURL("image/png");

    // set the softpenImage.src to the base64 image from canvas
    softpenImage.src = image.src;

    // redirect to form, which uses softpenImage
    $location.path('screener/candidateForm');

    // SET THE NEXT page
    if($scope.endInterview) {
        $timeout(() => {
          $location.path('interviewer/interviews');
        }, 1000);
    } else {
      interviewQId++;
      setInterview();
    }
  };

  $scope.readImage = function(event) {
    var files = event.target.files;

    if (files && files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $scope.$apply(function() {
          $scope.QuestionBase64 = e.target.result;
          $scope.pictureAdded = true;
        });
      };
      reader.readAsDataURL(files[0]);
    }
  };

  loadFabric();

  $scope.init();
});


var loadFabric = function() {
  //Module Fields
  //-------------------------------------------------------------------------------------
  var colors = {
    red: "rgba(255,0,0,1)",
    blue: "rgba(0,0,204,1)",
    yellow: "rgba(255,255,102,1)",
    black: "rgba(0,0,0,1)",
    green: "rgba(51,255,120,1)"
  };

  var defaultPenColor = "black";
  var defaultMarkerColor = "yellow";
  var penThickOptions = [1, 5, 10];
  var markerThickOptions = [20, 35, 50];
  var markerOppacity = 0.2;
  var penSelectedThickness = 0;
  var markerSelectedThickness = 0;


  var colorButtons = $(".color-button");
  var toolButtons = $(".tool-button");

  $(document).ready(function() {
    var buttons = $(".color-button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].style = "color: " + colors[buttons[i].value];
    }
  });



  //Fabric setup and image load
  //-------------------------------------------------------------------------------------
  var canvas = new fabric.Canvas("c");
  var h;
  var eventStack = [];
  var isRedoing = false;
  var isPictureLoaded = 0;
  canvas.isDrawingMode = true;

  var imgObj = new Image();
  var input = document.getElementById('resume-image');

  canvas.on('object:added', function() {
    if (!isRedoing) {
      h = [];
    }
    isRedoing = false;
  });



  //Tool functions
  //----------------------------------------------------------------------------------
  function undo() {
    if (canvas._objects.length > isPictureLoaded) {
      console.log(h);
      h.push(canvas._objects.pop());
      canvas.renderAll();
    }
  }

  function redo() {
    if (h.length > 0) {

      isRedoing = true;
      canvas.add(h.pop());
    }
  }

  function changeColor(color) {
    if (($("#pen")[0].getAttribute("class")).indexOf("active") !== -1) {
      canvas.freeDrawingBrush.color = colors[color];
      defaultPenColor = color;

    } else {
      var newColor = colors[color].split(",");
      newColor[3] = markerOppacity + ')';
      console.log(newColor.join());
      canvas.freeDrawingBrush.color = newColor.join();
      defaultMarkerColor = color;
    }
  }

  function activateTag(tag) {
    tag.className += " active";
  }

  function updateThicknessDisplay(thickness) {
    $("#thickness").text(thickness + 1);
  }

  function findTagByColor(color) {
    for (var i = 0; i < colorButtons.length; i++) {
      if (colorButtons[i].value == color)
        return colorButtons[i];
    }
    return {
      class: "",
      value: ""
    };
  }

  function increaseWidth() {
    if ($("#pen").hasClass("active")) {
      if (penSelectedThickness < penThickOptions.length - 1) {
        canvas.freeDrawingBrush.width = penThickOptions[++penSelectedThickness];
        updateThicknessDisplay(penSelectedThickness);
      }
    } else if ($("#marker").hasClass("active")) {
      if (markerSelectedThickness < markerThickOptions.length - 1) {
        canvas.freeDrawingBrush.width = markerThickOptions[++markerSelectedThickness];
        updateThicknessDisplay(markerSelectedThickness);
      }
    }
  }

  function decreaseWidth() {
    if ($("#pen").hasClass("active")) {
      if (penSelectedThickness > 0) {
        canvas.freeDrawingBrush.width = penThickOptions[--penSelectedThickness];
        updateThicknessDisplay(penSelectedThickness);
      }
    } else if ($("#marker").hasClass("active")) {
      if (markerSelectedThickness > 0) {
        canvas.freeDrawingBrush.width = markerThickOptions[--markerSelectedThickness];
        updateThicknessDisplay(markerSelectedThickness);
      }
    }
  }

  //Event Listeners
  // --------------------------------------------------------------------------------
  $("#resume-image").on("load", function() {
    imgObj.src = input.src;
    var image = new fabric.Image(imgObj);

    image.height = 995;
    image.width = 775;

    canvas.add(image);
    isPictureLoaded = 1;
  });

  $("#undo").on("click", function() {
    undo();
  });

  $("#redo").on("click", function() {
    redo();
  });

  $(".color-button").on("click", function() {
    $(".color-button").removeClass("active");
    changeColor(this.value);
    activateTag(this);
  });

  $(".thinknessChanger").on("click", function() {
    if (this.value == "plus") {
      console.log("increase");
      increaseWidth();
    } else {
      console.log("decrease");
      decreaseWidth();
    }
  });

  $(".tool-button").on("click", function() {
    $(".tool-button").removeClass("active");
    this.className += " active";

    if (this.id == 'pen') {
      $(".color-button").removeClass("active");
      canvas.freeDrawingBrush.width = penThickOptions[penSelectedThickness];
      updateThicknessDisplay(penSelectedThickness);
      changeColor(defaultPenColor);
      activateTag(findTagByColor(defaultPenColor));
    } else {
      $(".color-button").removeClass("active");
      canvas.freeDrawingBrush.width = markerThickOptions[markerSelectedThickness];
      updateThicknessDisplay(markerSelectedThickness);
      changeColor(defaultMarkerColor);
      activateTag(findTagByColor(defaultMarkerColor));
    }
  });
};
