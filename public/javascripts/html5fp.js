


window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {

  myCanvasApp();
  myGeoLocation();
  myAudio();
}

function myCanvasApp(){

  if (!canvasSupport()) {
    return;
  }else{
    //smily
    var theCanvas = document.getElementById('my_first_canvas');
    var context = theCanvas.getContext('2d');

    drawPicture(theCanvas,context);

    //graphics claculator
    theCanvas = document.getElementById('graph-canvas');
    context = theCanvas.getContext('2d')
   
    graphicCalc(theCanvas,context);  
    
    //finger Painting
   theCanvas = document.getElementById('fp-canvas');
   context = theCanvas.getContext('2d');
   
   fingerPaint(theCanvas,context); 
  }
}  //end canvasApp

function myGeoLocation() {

   //Geo location
   if (geoSupport()) {
	    navigator.geolocation.getCurrentPosition(geolocate_story, throw_error);
    } else {
	    alert('Your browser/ereader does not support geolocation. Sorry.');
    }
	
    function throw_error(position) {
            alert('Unable to geolocate you. Sorry.');
    }
}
    //Audio Streaming
function myAudio() {
    if (audioSupport()) {
	set_up_audio();
    }
    else {
      alert("Browser does not support Audio streaming");
    }
}




 


 
