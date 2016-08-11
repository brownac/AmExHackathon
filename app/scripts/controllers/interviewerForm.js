'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:InterviewerFormCtrl
 * @description
 * # InterviewerFormCtrl
 * Controller of the amExHackathonApp
 */
 var canvas;
angular.module('amExHackathonApp')
  .controller('InterviewerFormCtrl', function ($scope, $timeout, $routeParams, candidateService, $location, questionsService, archiveService, softpenImage) {

  var candidateId = $routeParams.candidateId;
  $scope.pageNum;
  $scope.pages = [];
  $scope.currentPage;
  $scope.currentInterview = '';
  $scope.candidate = {};
  $scope.activeForms = [];
  $scope.pictureAdded = false;
  $scope.endInterview = false;
  $scope.interviewQId = 0;
  $scope.newArchive = {};

  $scope.setInterview = function() {
    $scope.currentInterview = $scope.activeForms[$scope.interviewQId];
    $scope.pageNum = 0;
    $scope.pages = $scope.currentInterview.Images;
    $scope.currentPage = $scope.pages[$scope.pageNum].img_uri;
  };

  var nextPage = function() {
    if(($scope.interviewQId + 1 === $scope.activeForms.length) &&
      ($scope.pageNum+1 === $scope.pages.length)) {
        $scope.endInterview = true;
    } else if($scope.pageNum+1 === $scope.pages.length) {
      interviewQId++;
      $scope.setInterview();
    } else {
      $scope.pageNum++;
      $scope.currentPage = $scope.pages[$scope.pageNum].img_uri;
    }
  };

  $scope.init = function() {
    // Get selected Candidate information
    candidateService.get({ id: candidateId }).$promise.then(value => {
      $scope.candidate = value;
      console.log("BEFORE archiving");
      // Get candidate question archive

      archiveService.query({ id: candidateId }).$promise.then(value => {
        console.log("Archiving");
        $scope.candidate.questions = value;
      });
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
    if(!$scope.endInterview) {
      var htmlCanvas = $("#c")[0];
      var image = new Image();
      image.src = htmlCanvas.toDataURL($scope.currentPage);

      // set the softpenImage.src to the base64 image from canvas
      // softpenImage.src = image.src;
      if($scope.newArchive.files === undefined) {
        $scope.newArchive.files = new Array(1);
      }
      $scope.newArchive.files.push(image.src);
    }

    // redirect to form, which uses softpenImage
    // $location.path('screener/candidateForm');

    // SET THE NEXT page
    if($scope.endInterview) {
      console.log("INTERVIEW ENDED");
      archiveService.save($scope.newArchive).$promise.then(value => {
        // show success by changing submit button class and value
        $scope.newArchive = {};

        console.log("INTERVIEW ENDED - REROUTING");

        $timeout(() => {
          image = null;
          $location.path('interviewer/interviews');
        }, 1000);
      });
    } else {
      console.log("Next Page reached");
      canvas.clear();
      nextPage();
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

  loadFabric1();

  $scope.init();
});


var loadFabric1 = function() {
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
  canvas = new fabric.Canvas("c");
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
    console.log("changeColor");
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


  // $("#next").on("click", function(){
  //   console.log("YEAHHHH");
  //   canvas.clear();
  // });
};
