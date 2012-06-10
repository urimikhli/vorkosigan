 function drawPicture(theCanvas,my_canvas) {

    my_canvas.strokeRect(0,0,200,225) // to start, draw a border around the canvas

    //draw face
    my_canvas.beginPath();
    my_canvas.arc(100, 100, 75, (Math.PI/180)*0, (Math.PI/180)*360, false); // circle dimensions
    my_canvas.strokeStyle = "black"; // circle outline is black
    my_canvas.lineWidth = 3; // outline is three pixels wide
    my_canvas.fillStyle = "yellow"; // fill circle with yellow
    my_canvas.stroke(); // draw circle
    my_canvas.fill(); // fill in circle
    my_canvas.closePath();
    
    // now, draw left eye
    my_canvas.fillStyle = "black"; // switch to black for the fill
    my_canvas.beginPath();
    my_canvas.arc(65, 70, 10, (Math.PI/180)*0, (Math.PI/180)*360, false); // circle dimensions
    my_canvas.stroke(); // draw circle
    my_canvas.fill(); // fill in circle
    my_canvas.closePath();

    // now, draw right eye
    my_canvas.beginPath();
    my_canvas.arc(135, 70, 10, (Math.PI/180)*0, (Math.PI/180)*360, false); // circle dimensions
    my_canvas.stroke(); // draw circle
    my_canvas.fill(); // fill in circle
    my_canvas.closePath();

    // draw smile
    my_canvas.lineWidth = 6; // switch to six pixels wide for outline
    my_canvas.beginPath();
    my_canvas.arc(99, 120, 35, (Math.PI/180)*0, (Math.PI/180)*-180, false); // semicircle dimensions
    my_canvas.stroke();
    my_canvas.closePath();

    // Smiley Speaks!
    my_canvas.fillStyle = "black"; // switch to black for text fill
    my_canvas.font = '20px _sans'; // use 20 pixel sans serif font
    my_canvas.fillText ("Hello Canvas!", 45, 200); // write text
  }
