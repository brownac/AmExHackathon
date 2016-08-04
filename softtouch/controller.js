//Module Fields
//-------------------------------------------------------------------------------------
var colors = {red: "#ff0000", blue: "#0000cc", yellow: "#ffff66", black: "#000000", green: "#33ff78"};
	defaultPenColor = "black";
	defaultMarkerColor = "yellow";
	penThickOptions = [1, 5, 10];
	markerThickOptions = [20, 35, 50];
	penSelectedThickness = 0;
	markerSelectedThickness = 0;

var colorButtons = $(".color-button");
	toolButtons = $(".tool-button");

$(document).ready(function(){
	var buttons = $(".color-button");
	for(var i=0; i<buttons.length; i++){
		buttons[i].style = "color: "+colors[buttons[i].value];
	}
});



//Fabric setup and image load
//-------------------------------------------------------------------------------------
var canvas = new fabric.Canvas("c");
var eventStack = [];
var isRedoing = false;
canvas.isDrawingMode = true;

fabric.Image.fromURL("resume.png", function(img){
	canvas.add(img);
});

canvas.on('object:added', function() {
  if (!isRedoing) {
    h = [];
  }
  isRedoing = false;
});



//Tool functions
//----------------------------------------------------------------------------------
function undo() {
  if (canvas._objects.length > 1) {
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

function changeColor(color){
	canvas.freeDrawingBrush.color = colors[color];
}

function increaseWidth(){
	if($("#pen").hasClass("active")){
		if(penSelectedThickness < penThickOptions.length - 1){
			canvas.freeDrawingBrush.width = penThickOptions[++penSelectedThickness];
			$("#thickness").text(penSelectedThickness + 1);
		}
	}
	else if($("#marker").hasClass("active")){
		if(penSelectedThickness < markerThickOptions.length - 1){
			canvas.freeDrawingBrush.width = markerThickOptions[++markerSelectedThickness];
			$("#thickness").text(markerSelectedThickness + 1);
		}
	}
}

function decreaseWidth(){
	if($("#pen").hasClass("active")){
		if(penSelectedThickness > 0){
			canvas.freeDrawingBrush.width = penThickOptions[--penSelectedThickness];
			$("#thickness").text(penSelectedThickness + 1);
		}
	}
	else if($("#marker").hasClass("active")){
		if(penSelectedThickness > 0){
			canvas.freeDrawingBrush.width = penThickOptions[--penSelectedThickness];
			$("#thickness").text(penSelectedThickness + 1);
		}
	}
}

//Event Listeners
// --------------------------------------------------------------------------------
$("#undo").on("click", function(){
	console.log("undo");
	undo();
});

$("#redo").on("click", function(){
	console.log("redo");
	redo();
});

$(".color-button").on("click", function(){
	console.log("changing color to " + this.value);	
	$(".color-button").removeClass("active");
	this.className += " active";
	changeColor(this.value);
});

$(".thinknessChanger").on("click", function(){
	console.log("changing thickness");
	if(this.value == "plus"){
		console.log("increase");
		increaseWidth();
	}else {
		console.log("decrease");
		decreaseWidth();
	}
});

$(".tool-button").on("click", function(){
	console.log("changing tool");
	$(".tool-button").removeClass("active");
	this.className += " active";
});