'use strict';

var app = angular.module('amExHackathonApp');
app.controller('SoftPenCtrl', function($scope, $location, softpenImage) {
  $scope.pictureAdded = false;

  $scope.next = function() {
    var canvas = $("#c")[0];
    var image = new Image();
    image.src = canvas.toDataURL("image/png");

    // set the softpenImage.src to the base64 image from canvas
    softpenImage.src = image.src;

    // redirect to form, which uses softpenImage
    $location.path('screener/candidateForm');
  };

  $scope.readImage = function(event) {
    var files = event.target.files;

    if (files && files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $scope.$apply(function() {
          $scope.resumeBase64 = e.target.result;
          $scope.pictureAdded = true;
        });
      };
      reader.readAsDataURL(files[0]);
    }
  };

  loadFabric();
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
  var drawingMode = true;


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

  function switchDrawingMode(){
    if(drawingMode){
      $(".canvas-container").addClass("hide");
      $("#inactive").removeClass("hide");
      drawingMode = false;
    }
    else{
      $(".canvas-container").removeClass("hide");
      $("#inactive").addClass("hide");
      drawingMode = true;
    }
  }

  //Event Listeners
  // --------------------------------------------------------------------------------
  $("#resume-image").on("load", function() {
    console.log("ADWADW");
    imgObj.src = input.src;
    var image = new fabric.Image(imgObj);
    canvas.add(image);
    isPictureLoaded = 1;
  });

  $("#undo").on("click", function() {
    if(drawingMode)
      undo();
  });

  $("#redo").on("click", function() {
    if(drawingMode)
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
      if(!drawingMode)
        switchDrawingMode();
    } 
    else if(this.id == 'marker'){
      $(".color-button").removeClass("active");
      canvas.freeDrawingBrush.width = markerThickOptions[markerSelectedThickness];
      updateThicknessDisplay(markerSelectedThickness);
      changeColor(defaultMarkerColor);
      activateTag(findTagByColor(defaultMarkerColor));
      if(!drawingMode)
        switchDrawingMode();
    }
  });

  $("#stopDrawingMode").on("click", function(){
    var canvas = $("#c")[0];
    $("#inactive").attr("src", canvas.toDataURL("image/png"));
    if(drawingMode){
      switchDrawingMode();
      console.log("inside here");
    }
  });
};