'use strict';

/**
 * @ngdoc function
 * @name amExHackathonApp.controller:InterviewerFormCtrl
 * @description
 * # InterviewerFormCtrl
 * Controller of the amExHackathonApp
 */
 var canvas;
 var sharedArchive;
angular.module('amExHackathonApp')
  .controller('InterviewerFormCtrl', function ($scope, $timeout, $routeParams, candidateService, $location, questionsService, archiveService, softpenImage) {

  $scope.Questions = [];
  $scope.question;
  $scope.questionId = 0;
  $scope.imgNum = 0;
  $scope.currentPage;
  $scope.newArchive = {};
  $scope.newArchive.files = [];
  var techQID = $routeParams.techQID;
  var behavQID = $routeParams.behavQID;
  var candidateId = $routeParams.candidateId;
  var init = function() {
    candidateService.get({ id: candidateId }).$promise.then(cValue => {
      console.log("CANDIDATE SERVICE INIT");
      $scope.selCandidate = cValue;

      // GET Candidate already completed interview forms
      archiveService.query({ id: candidateId }).$promise.then(value => {
        console.log("ARCHIVE SERVICE INIT");
        $scope.selCandidate.questions = value;
      });
    });

    questionsService.query().$promise.then(values => {
      // Redirect to add new form if the system does not have interview forms yet
      console.log("QUESTION SERVICE TECHID INIT");
      var i;
      for(i = 0; i < values.length; i++) {
        if((values[i].id == techQID) || (values[i].id == behavQID)) {
          $scope.Questions.push(values[i]);
          $scope.newArchive.form = values[1].form_model;
        }
      }
      setInterview();
    });
  }

  var setInterview = function() {
    $scope.imgNum = 0;
    $scope.question = $scope.Questions[$scope.questionId].Images[$scope.imgNum];
    $scope.currentPage = $scope.Questions[$scope.questionId].Images[$scope.imgNum].img_uri;

    if( ($scope.questionId + 1 === $scope.Questions.length) &&
      ($scope.imgNum+1 === $scope.Questions[$scope.questionId].Images.length) ) {
        $scope.endInterview = true;
    }
  };

  var nextPage = function() {
    if(($scope.questionId + 1 === $scope.Questions.length) &&
      ($scope.imgNum+1 === $scope.Questions[$scope.questionId].Images.length)) {
        $scope.endInterview = true;
    } else if($scope.imgNum+1 === $scope.Questions[$scope.questionId].Images.length) {
      $scope.questionId++;
      $scope.imgNum = 0;
      setInterview();
    } else {
      $scope.imgNum++;
      $scope.currentPage = $scope.Questions[$scope.questionId].Images[$scope.imgNum].img_uri;
    }
  };

  $scope.next = function() {

    // SAVE THE IMAGE
    var htmlCanvas = $("#c")[0];
    var image = new Image();
    image.src = htmlCanvas.toDataURL($scope.currentPage);

    $scope.newArchive.files.push(image.src);

    // SET THE NEXT page
    if($scope.endInterview) {
      console.log("INTERVIEW ENDED");
      archiveService.save($scope.newArchive).$promise.then(value => {
        // show success by changing submit button class and value
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

  loadFabric1();

  init();
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
