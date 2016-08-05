//Module Fields
//-------------------------------------------------------------------------------------
var colors = {red: "rgba(255,0,0,1)", blue: "rgba(0,0,204,1)", yellow: "rgba(255,255,102,1)", black: "rgba(0,0,0,1)", green: "rgba(51,255,120,1)"};
	defaultPenColor = "black";
	defaultMarkerColor = "yellow";
	penThickOptions = [1, 5, 10];
	markerThickOptions = [20, 35, 50];
	markerOppacity = 0.2;
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
	if(($("#pen")[0].getAttribute("class")).indexOf("active") !== -1){
		canvas.freeDrawingBrush.color = colors[color];
		defaultPenColor = color;
		
	} else{
		var newColor = colors[color].split(",");
		newColor[3] = markerOppacity + ")";
		console.log(newColor.join());
		canvas.freeDrawingBrush.color = newColor.join();
		defaultMarkerColor = color;
	}
}

function activateTag(tag){
	tag.className += " active";
}

function updateThicknessDisplay(thickness){
	$("#thickness").text(thickness + 1);
}

function findTagByColor(color){
	for(var i=0; i<colorButtons.length; i++){
		if(colorButtons[i].value == color)
			return colorButtons[i];
	}
	return {class: "", value: ""};
}

function increaseWidth(){
	if($("#pen").hasClass("active")){
		if(penSelectedThickness < penThickOptions.length - 1){
			canvas.freeDrawingBrush.width = penThickOptions[++penSelectedThickness];
			updateThicknessDisplay(penSelectedThickness);
		}
	}
	else if($("#marker").hasClass("active")){
		if(markerSelectedThickness < markerThickOptions.length - 1){
			canvas.freeDrawingBrush.width = markerThickOptions[++markerSelectedThickness];
			updateThicknessDisplay(markerSelectedThickness);
		}
	}
}

function decreaseWidth(){
	if($("#pen").hasClass("active")){
		if(penSelectedThickness > 0){
			canvas.freeDrawingBrush.width = penThickOptions[--penSelectedThickness];
			updateThicknessDisplay(penSelectedThickness);
		}
	}
	else if($("#marker").hasClass("active")){
		if(markerSelectedThickness > 0){
			canvas.freeDrawingBrush.width = markerThickOptions[--markerSelectedThickness];
			updateThicknessDisplay(markerSelectedThickness);
		}
	}
}



//Event Listeners
// --------------------------------------------------------------------------------
$("#undo").on("click", function(){
	undo();
});

$("#redo").on("click", function(){
	redo();
});

$(".color-button").on("click", function(){
	$(".color-button").removeClass("active");	
	changeColor(this.value);
	activateTag(this);
});

$(".thinknessChanger").on("click", function(){
	if(this.value == "plus"){
		console.log("increase");
		increaseWidth();
	} else {
		console.log("decrease");
		decreaseWidth();
	}
});

$(".tool-button").on("click", function(){
	$(".tool-button").removeClass("active");
	this.className += " active";

	if(this.id == 'pen'){
		$(".color-button").removeClass("active");
		canvas.freeDrawingBrush.width = penThickOptions[penSelectedThickness];
		updateThicknessDisplay(penSelectedThickness);
		changeColor(defaultPenColor);
		activateTag(findTagByColor(defaultPenColor));
	} else{
		$(".color-button").removeClass("active");
		canvas.freeDrawingBrush.width = markerThickOptions[markerSelectedThickness];		
		updateThicknessDisplay(markerSelectedThickness);
		changeColor(defaultMarkerColor);
		activateTag(findTagByColor(defaultMarkerColor));
	}
});