console.log('🎨 SketchRNN');
/* eslint-disable */

// drawing class

let sketchmodel;
let previous_pen = 'down';
let x, y;
let startX;
let startY;
let sketch;


let thisIllustrationContainer;
let paintStrokes = 0


function addRNNCanvas() {

  // console.log('add RNN Canv');

  sketchRnnDrawing = function (p5RNNdrawing) {

    p5RNNdrawing.setup = function () {
      p5RNNdrawing.createCanvas(canvasWidth, canvasHeight);
      p5RNNdrawing.background(255, 204, 0, 0);;
      p5RNNdrawing.frameRate(60);

      previous_pen = 'down';

      p5RNNdrawing.loop();
    };

    // p5RNNdrawing.mouseDragged = function () {
    //   // console.log('painting');
    //   p5RNNdrawing.strokeWeight(illustrationStroke);
    //   p5RNNdrawing.smooth();

    //   p5RNNdrawing.line(p5RNNdrawing.mouseX, p5RNNdrawing.mouseY, prevMouseX, prevMouseY);


    //   p5RNNdrawing.stroke(secondColor);
    //   p5RNNdrawing.strokeWeight(1);
    //   let randomdist = Math.floor((Math.random() * 1) + 3)
    //   p5RNNdrawing.line(p5RNNdrawing.mouseX + randomdist, p5RNNdrawing.mouseY + randomdist, prevMouseX + randomdist, prevMouseY+ randomdist);


    //   prevMouseX = p5RNNdrawing.mouseX;
    //   prevMouseY = p5RNNdrawing.mouseY;





    // };


    p5RNNdrawing.updateNewAnimal = function () {
      // console.log('animal needs to update here');
    }

    p5RNNdrawing.draw = function () {

      if (sketch) {

        // ------>  music stuff

        penStrokes++;
        const penOffset = penStrokes % 4;

        if (sentimentContainer[sentanceNumber] >= 0) {
          // sentiment is positive

          // for these animals play this synth
          if ((currIllustration == 'lion') || (currIllustration == 'dog') || (currIllustration == 'bear')) {
            // each 25th pen stroke
            if ((penStrokes % 25 == 0) && (penOffset != 1)) {
              let noteLenngth = noteLength(sketch.dx);
              if (noteLenngth == undefined) {
                noteLenngth = '6n';
              }
              const notetoplayMajor = convertDiamToNoteMajor(sketch.dy) / 4;
              playNote2(noteLenngth, notetoplayMajor);
            }
          } else {
            // play this synth each 12th stroke
            if ((penStrokes % 12 == 0) && (penOffset != 1)) {
              let noteLenngth = noteLength(sketch.dx);
              if (noteLenngth == undefined) {
                noteLenngth = '6n';
              }
              playNote1(noteLenngth, convertDiamToNoteMajor(sketch.dy) * 2);
            }
          }
        } else {
          // Sentiment is negeative

          // for these animals play this synth
          if ((currIllustration == 'lion') || (currIllustration == 'dog') || (currIllustration == 'bear')) {
            // each 25th pen stroke
            if ((penStrokes % 25 == 0) && (penOffset != 1)) {
              let noteLenngth = noteLength(sketch.dx);
              if (noteLenngth == undefined) {
                noteLenngth = '6n';
              }

              const notetoplayMinor = convertDiamToNoteMinor(sketch.dy) / 4;
              playNote2(noteLenngth, notetoplayMinor);
            }
          } else {
            // play this synth each 12th stroke
            if ((penStrokes % 11 == 0) && (penOffset != 1)) {
              let noteLenngth = noteLength(sketch.dx);
              if (noteLenngth == undefined) {
                noteLenngth = '6n';
              }
              playNote1(noteLenngth, convertDiamToNoteMinor(sketch.dy) * 2);
            }
          }
        }

        // <----- end music stuff

        if (previous_pen == 'down') {
          p5RNNdrawing.stroke(colorArray[currentDrawIndex]);
          p5RNNdrawing.strokeWeight(illustrationStroke);
          p5RNNdrawing.line(x, y, x + sketch.dx / drawingRatio, y + sketch.dy / drawingRatio);



          p5RNNdrawing.stroke(secondColorArray[currentDrawIndex]);
          p5RNNdrawing.strokeWeight(2);
          let randomdist = Math.floor((Math.random() * 1) + 3)
          p5RNNdrawing.line(x + randomdist, y + randomdist, x + sketch.dx / drawingRatio + randomdist, y + sketch.dy / drawingRatio + randomdist);



          // count brush strokes
          paintStrokes++;

          // reset if gone crazy
          if (paintStrokes > 400) {
            console.log('end and reset');
            p5RNNdrawing.noLoop();
            penStrokes = 0;
            previous_pen = sketch.pen;
            sketch = null;
            sketchmodel = null;

            // start a new drawing from class array
            if (currentDraingsArr.length > 1) {
              console.log('add another illustration if you can?')
              // increase index by one
              currentDrawIndex++;

              // reset state if: 

              if (currentDrawIndex === currentDraingsArr.length) {
                currentDrawIndex = 0;
                currentDraingsArr = [];

                p5RNNdrawing.noLoop();
                penStrokes = 0;
                // previous_pen = sketch.pen;
                sketch = null;
                sketchmodel = null;

                startX = canvasWidth / 2
                startY = canvasHeight / 2;

                // console.log('reset currentDrawIndex after complition');
              }

              // console.log('currentDraingsArr for resend', currentDraingsArr);
              loadASketch(currentDraingsArr);

            }
          }
        }

        x += sketch.dx / drawingRatio;
        y += sketch.dy / drawingRatio;
        previous_pen = sketch.pen;

        if (sketch.pen !== 'end') {
          sketch = null;
          sketchmodel.generate(gotSketch);
        } else {
          // console.log('end and reset');
          p5RNNdrawing.noLoop();
          penStrokes = 0;
          previous_pen = sketch.pen;
          sketch = null;
          sketchmodel = null;

          // start a new drawing from class array
          if (currentDraingsArr.length > 1) {
            // console.log('add another illustration if you can?')
            // increase index by one
            currentDrawIndex++;

            // reset state if: 

            if (currentDrawIndex === currentDraingsArr.length) {
              currentDrawIndex = 0;
              currentDraingsArr = [];

              p5RNNdrawing.noLoop();
              penStrokes = 0;
              // previous_pen = sketch.pen;
              sketch = null;
              sketchmodel = null;

              startX = canvasWidth / 2
              startY = canvasHeight / 2;

              // console.log('reset currentDrawIndex after complition');
            }

            // console.log('currentDraingsArr for resend', currentDraingsArr);
            loadASketch(currentDraingsArr);

          }
        }
      }
    };
  };

  // console.log('thisIllustrationContainer', thisIllustrationContainer)

  return new p5(sketchRnnDrawing, thisIllustrationContainer);
}

let currentDrawIndex = 0;
let currentDraingsArr = [];

async function loadASketch(drawing) {

  currentDraingsArr = drawing;

  if (currentDraingsArr.length === 0)
    return;

  thisIllustrationContainer = document.getElementById(`drawing${sentanceNumber}`);
  // console.log('drawing number', currentDrawIndex);
  // console.log('drawing', currentDraingsArr[currentDrawIndex]);

  if (currentDraingsArr[currentDrawIndex]) {
    setTimeout(() => {
      sketchmodel = ml5.SketchRNN(currentDraingsArr[currentDrawIndex], function () {
        startDrawing();
      });
    }, 900);
  }

  drawSketchResults();
}

function startDrawing() {
  x = startX;
  y = startY;

  sketchmodel.reset();
  sketchmodel.generate(gotSketch);
  previous_pen = 'down';
}

function gotSketch(err, s) {
  // this gets the new coordinate
  // console.log(s);
  sketch = s;
}


function drawSketchResults() {
  paintStrokes = 0

  if (thisIllustrationContainer) {
    // console.log('container exsists should trigger update new animal');
    // update the new illustration


    const randomWidth =  canvasWidth / 2 - canvasWidth / 3.3;
    const randomHeight = canvasHeight / 2;

    startX = randomWidth;
    startY = randomHeight;
    sketchillustrationArr.loop();


  } else {
    // create a div container for drawing
    // console.log('create illustration container');

    drawingNumber++;

    const div = document.createElement('div');
    div.id = `drawing${sentanceNumber}`;
    div.style.color = 'white';
    div.style.paddingBottom = '0px';
    // only on first sentence opacity is 1.0 in the beginning
    if (sentanceNumber > 1) {
      div.style.opacity = '0.0';
    }
    document.getElementById('drawing-container').appendChild(div);

    thisIllustrationContainer = document.getElementById(`drawing${sentanceNumber}`);

    //create a p5 canvas and run the illustration
    sketchillustrationArr = addRNNCanvas();

  }


  // const drawingCanvas = new p5(sketchRnnDrawing, document.getElementById(`drawing${sentanceNumber}`));

  // if (same canvas) {
  //   activep5.updateNewAnimal();
  // } else {
  //   activep5 = drawingCanvas;
  // }
}














