window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {

  myCanvasApp();
}

function myCanvasApp(){

  if (!canvasSupport()) {
    return;
  }else{    
    //finger Painting
   theCanvas = document.getElementById('fp-canvas');
   context = theCanvas.getContext('2d');
   
   fingerPaint(theCanvas,context); 
  }
}  //end canvasApp

//set up color arrays
var rainbowColors = ['Red','Orange','Yellow','Green','Blue','Purple'];
var patrioticColors = ['Red','White','Blue'];
var color_index=0;
var clipboard_index=1;
var selcted_clip_image_id="canvasImg1";

function fingerPaint(theCanvas,context) {

  var redButton = document.getElementById("Red");
  var orangeButton = document.getElementById("Orange");
  var yellowButton = document.getElementById("Yellow");
  var greenButton = document.getElementById("Green");
  var blueButton = document.getElementById("Blue");
  var purpleButton = document.getElementById("Purple");
  var brownButton = document.getElementById("Brown");
  var blackButton = document.getElementById("Black");
  var whiteButton = document.getElementById("White");
  var colorChosen = document.getElementById("color_chosen");
  var resetButton = document.getElementById("reset_image");
  var rainbowButton = document.getElementById("Rainbow");
  var patrioticButton = document.getElementById("Patriotic");
  var saveButton = document.getElementById("saveImage");
  var loadButton = document.getElementById("loadImage");
  var brush =  document.getElementById("brush_size");
  var brushSize =  brush.value;
  var canvas_image = document.getElementById("canvasImg"+clipboard_index);
  var clip1 = document.getElementById("canvasImg1");
  var clip2 = document.getElementById("canvasImg2");
  var clip3 = document.getElementById("canvasImg3");
  var clip4 = document.getElementById("canvasImg4");


        redButton.addEventListener('click', colorPressed, false);
        orangeButton.addEventListener('click', colorPressed, false);
        yellowButton.addEventListener('click', colorPressed, false);
        greenButton.addEventListener('click', colorPressed, false);
        blueButton.addEventListener('click', colorPressed, false);
        purpleButton.addEventListener('click', colorPressed, false);
        brownButton.addEventListener('click', colorPressed, false);
        blackButton.addEventListener('click', colorPressed, false);
        whiteButton.addEventListener('click', colorPressed, false);
        brush.addEventListener('change', sizeChanged, false);
        resetButton.addEventListener('click', resetPressed, false);
	rainbowButton.addEventListener('click', colorPressed, false);
	patrioticButton.addEventListener('click', colorPressed, false);
	saveButton.addEventListener('click', getImagedata, false);
	loadButton.addEventListener('click', loadImageFromClipboard, false);
        clip1.addEventListener('click', pickClipImage, false);
        clip2.addEventListener('click', pickClipImage, false);
        clip3.addEventListener('click', pickClipImage, false);
        clip4.addEventListener('click', pickClipImage, false);
        //canvas_image.addEventListener('contextmenu', getImagedata, false);
	drawScreen();

    function drawScreen() {
	theCanvas.addEventListener('mousedown', mouse_pressed_down, false);
	theCanvas.addEventListener('mousemove', mouse_moved, false);
	theCanvas.addEventListener('mouseup', mouse_released, false);
//	theCanvas.addEventListener('touchmove', touch_move_gesture, false);
	context.fillStyle = 'white';
	context.fillRect(0, 0, theCanvas.width, theCanvas.height);
	context.strokeStyle = '#000000'; 
	context.strokeRect(1,  1, theCanvas.width-2, theCanvas.height-2);
    }

    // For the mouse_moved event handler.
    var begin_drawing = false;

    function mouse_pressed_down (ev) {
	begin_drawing = true;
	
	if (colorChosen.innerHTML == 'Rainbow') {
	    context.fillStyle = cycle_colors(rainbowColors);
	} else if (colorChosen.innerHTML == 'Patriotic') {
	    context.fillStyle = cycle_colors(patrioticColors);	
	    
	} else {
	    context.fillStyle = colorChosen.innerHTML;
	}
    }

    function mouse_moved (ev) {
	var x, y;	
	// Get the mouse position in the canvas
	x = ev.pageX - theCanvas.offsetLeft;
	y = ev.pageY - theCanvas.offsetTop;
	
	//rainbow
	if (colorChosen.innerHTML == 'Rainbow') {
	    context.fillStyle = cycle_colors(rainbowColors);
	} else if (colorChosen.innerHTML == 'Patriotic') {
	    context.fillStyle = cycle_colors(patrioticColors);		    
	}
	
	if (begin_drawing) {
	    context.beginPath();
	    context.arc(x, y, brushSize, (Math.PI/180)*0, (Math.PI/180)*360, false);
            //context.stroke(); // draw circle
            context.fill(); // fill in circle
            context.closePath();
	}
    }

    function mouse_released (ev) {
	begin_drawing = false;
    }

//   function touch_move_gesture (ev) {
//	// For touchscreen browsers/readers that support touchmove
//	var x, y;
//	ev.preventDefault(); //override default UI behavior for better results on touchscreen devices
//	context.beginPath();
//	context.fillStyle = colorChosen.innerHTML;
//	if(ev.touches.length == 1){
//	    var touch = ev.touches[0];
//	    x = touch.pageX;
//	    y = touch.pageY;
//	    context.arc(x, y, 7, (Math.PI/180)*0, (Math.PI/180)*360, false);
//	    context.fill();
//	}
//  }

    //take an array of colors and return a color
    //advance the index to the next color so that
    //color is returned the next time the function is called
    function cycle_colors(colorArray) {
	var num_colors = colorArray.length;
	var color = 'Black'; // just so there is a default color
	if (color_index < num_colors) {
	   color = colorArray[color_index];
	   color_index++; 
	} else {
	    color_index=0;
	    color = colorArray[color_index];
	}
	return color;
    }

    function colorPressed(e) {
	var color_button_selected = e.target;
	var color_id = color_button_selected.getAttribute('id');
	colorChosen.innerHTML = color_id;
	color_index=0;
    }
    function sizeChanged(e) {
        var brush = document.getElementById("brush_size");
        brushSize=  brush.value;
    }

    function resetPressed(e) {
        theCanvas.width = theCanvas.width; // Reset grid
        drawScreen();
    }

    function highlight_clipbox(clip_index) {
      //highlight the clipboard image
      //var clip = document.getElementById("clipSpan" + clip_index);
      alert($("#clipSpan1"));
      $("#clipSpan1").addClass('grey');
      //clip.border = '3px';
    }

    function pickClipImage(e) {
      var clip_selected = e.target;
      var clip_id =  clip_selected.getAttribute('id');
      selcted_clip_image_id = clip_id;
      var id_length = clip_id.length;
      highlight_clipbox(clip_id.substr(id_length-1,1));
    }
     
    function getImagedata(e) {
            // save canvas image as data url (png format by default)
            var dataURL = theCanvas.toDataURL("image/png");
	    //theCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	    //dataURL = "name:canvas.png;" + dataURL;
            // set canvasImg image src to dataURL
            // so it can be saved as an image
	   
       	if (clipboard_index >4){
	    if (confirm("click ok to replace the first image in the clipboard")){
		clipboard_index =1;
		canvas_image = document.getElementById("canvasImg"+clipboard_index);
		canvas_image.src = dataURL;
		clipboard_index++;
	    }
	} else {
	    canvas_image = document.getElementById("canvasImg"+clipboard_index);
	    canvas_image.src = dataURL;
	    clipboard_index++;
	}
    }

    function loadImageFromClipboard(e) {
      canvas_image = document.getElementById(selcted_clip_image_id);

      newImage = new Image();
      newImage.src = canvas_image.src;
      context.drawImage(newImage, 0, 0);

      //theCanvas 

    }
    
    function loadImageFromDisk(e) {
    }
}


  


