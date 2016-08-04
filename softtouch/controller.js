var canvas = new fabric.Canvas("c");
canvas.isDrawingMode = true;

fabric.Image.fromURL("resume.png", function(img){
	canvas.add(img);
});