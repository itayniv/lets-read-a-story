console.log('📗 book sketch');
/* eslint-disable */


let sketchBookmodel;
let startBookX;
let startBookY;
let bookSketch;

let numberOfBooks = 0;

//book animation
function loadBookSketch(drawing, sketchRnn) {
  // console.log('rnn', sketchRnn);
  sketchBookmodel = sketchRnn;
  startDrawingbook();

  //create a div container for drawing
  // drawingNumber ++;
  const div = document.createElement("div");
  div.id = "bookillustration";
  div.style.background = "white";
  div.style.color = "white";
  div.style.paddingBottom = "0px";
  div.style.position = "absolute";
  div.style.zIndex = "1";
  div.style.top = "0px";
  document.getElementById("book").appendChild(div);

  let drawingBookCanvas = new p5(sketchRnnBook, document.getElementById("bookillustration"));
}

//  Book animation in beginning
function startDrawingbook() {

  numberOfBooks ++;

  x = startBookX / 2;
  y = startBookY / 2;

  if (sketchBookmodel) {
    sketchBookmodel.reset();
    sketchBookmodel.generate(gotBookSketch);
  }
  previous_pen = 'down';
}


// book class
let sketchRnnBook = function (drawingBook) {

  drawingBook.setup = function () {
    drawingBook.createCanvas(viewportWidth, viewportHeight);
    drawingBook.background(255);
    previous_pen = 'down';
    drawingBook.loop();
    sketchColor = getRandomColor();
    secondColor = LightenDarkenColor(sketchColor, 30); 

  };

  drawingBook.mouseDragged = function () {
    drawingBook.strokeWeight(3);
    drawingBook.line(drawingBook.mouseX, drawingBook.mouseY, drawingBook.pmouseX, drawingBook.pmouseY);

    drawingBook.strokeWeight(1);
    let randomdist = Math.floor((Math.random() * 2) + 1)
    drawingBook.stroke(secondColor);

    drawingBook.line(drawingBook.mouseX+ randomdist, drawingBook.mouseY+ randomdist, drawingBook.pmouseX+randomdist, drawingBook.pmouseY+ randomdist);


  }

  drawingBook.draw = function () {
    if (bookSketch) {
      if (previous_pen == 'down') {
        //make music here
        penStrokesopening++;

        if (penStrokesopening % 20 == 0) {
          let noteToPlay = convertDiamToNoteMajor(bookSketch.dy);
          if (noteToPlay == undefined) {
            noteToPlay = 0;
          }

          let noteLenngth = noteLength(bookSketch.dx);
          if (noteLenngth == undefined) {
            noteLenngth = '6n';
          }
          playNoteStart(noteLenngth, noteToPlay);
        }

        
        drawingBook.stroke(sketchColor);
        drawingBook.strokeWeight(3);
        drawingBook.line(x, y, x + bookSketch.dx / 2, y + bookSketch.dy / 2);


        drawingBook.stroke(secondColor);
        drawingBook.strokeWeight(1);
        let randomdist = Math.floor((Math.random() * 1) + 6)
        drawingBook.line(x + randomdist, y+ randomdist, x + bookSketch.dx / 2 + randomdist, y + bookSketch.dy / 2+ randomdist);


      }
      x += bookSketch.dx / 2;
      y += bookSketch.dy / 2;
      previous_pen = bookSketch.pen;

      if (bookSketch.pen !== 'end') {
        bookSketch = null;
        sketchBookmodel.generate(gotBookSketch);
      } else {
        // console.log("end");

        bookSketch = null;

        // pic random drawing class
        let randomDrawingNumber = Math.floor(Math.random() * drawingClasses.length);
        let randDrawing = drawingClasses[randomDrawingNumber];
        
        sketchColor = getRandomColor();

        ml5.SketchRNN(randDrawing, function () {
          // console.log("sketchmodelReady", randDrawing);
          startBookX = Math.floor(Math.random() * (viewportWidth * 2 - 20) + 20);
          startBookY = Math.floor(Math.random() * (viewportHeight * 2 - 20) + 20);
          // console.log(startBookX,startBookY);


          if (numberOfBooks <= 19){
            setTimeout(() => {
              startDrawingbook();
              secondColor = LightenDarkenColor(sketchColor, 30); 
            }, 1700);
          }
        

        });
        //stop looping in draw
        if (startStory) {
          drawingBook.noLoop();
          bookSketch = null;

          sketchBookmodel = null;

        }
        //convert essential for stoping the animation
        // previous_pen = sketch.pen;
        //draw another ones
      }
    }
  };
};




function gotBookSketch(err, s) {

  // console.log('got book sketch', s);
  bookSketch = s;
}