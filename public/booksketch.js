console.log('📗 book sketch');


let sketchBookmodel;
let startBookX;
let startBookY;
let bookSketch;

//book animation
function loadBookSketch(drawing) {

    sketchbookmodel = ml5.SketchRNN(drawing, function () {
      startDrawingbook();
    });
  
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
    x = startBookX / 2;
    y = startBookY / 2;
  
    sketchbookmodel.reset();
    sketchbookmodel.generate(gotBookSketch);
    previous_pen = 'down';
    // console.log('startDrawingbook');
  }
  
  
  // book class
  let sketchRnnBook = function (drawingBook) {
  
    drawingBook.setup = function () {
      drawingBook.createCanvas(viewportWidth, viewportHeight);
      drawingBook.background(255);
      previous_pen = 'down';
      drawingBook.loop();
      sketchColor = getRandomColor();
    };
  
    drawingBook.mouseDragged = function () {
      drawingBook.strokeWeight(3);
      drawingBook.line(drawingBook.mouseX, drawingBook.mouseY, drawingBook.pmouseX, drawingBook.pmouseY);
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
        }
        x += bookSketch.dx / 2;
        y += bookSketch.dy / 2;
        previous_pen = bookSketch.pen;
  
        if (bookSketch.pen !== 'end') {
          bookSketch = null;
          sketchbookmodel.generate(gotBookSketch);
        } else {
          // console.log("end");
  
          bookSketch = null;
          // sketchbookmodel = null;
  
          // pic random drawing class
          let randomDrawingNumber = Math.floor(Math.random() * drawingClasses.length);
          let randDrawing = drawingClasses[randomDrawingNumber];
          sketchColor = getRandomColor();
  
          sketchBookmodel = ml5.SketchRNN(randDrawing, function () {
            // console.log("sketchmodelReady", randDrawing);
            startBookX = Math.floor(Math.random() * (viewportWidth * 2 - 20) + 20);
            startBookY = Math.floor(Math.random() * (viewportHeight * 2 - 20) + 20);
            // console.log(startBookX,startBookY);
  
            setTimeout(() => {
              startDrawingbook();
            }, 1700);
  
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
    bookSketch = s;
  }