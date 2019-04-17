console.log('🎨 SketchRNN');
/* eslint-disable */

// drawing class
const sketchRnnDrawing = function (drawingOne) {

  drawingOne.setup = function () {
    drawingOne.createCanvas(canvasWidth, canvasHeight);
    drawingOne.background(255);
    drawingOne.frameRate(60);

    previous_pen = 'down';

    drawingOne.loop();
  };

  drawingOne.mouseDragged = function () {
    // console.log('painting');
    drawingOne.strokeWeight(illustrationStroke);
    drawingOne.smooth();

    drawingOne.line(drawingOne.mouseX, drawingOne.mouseY, prevMouseX, prevMouseY);
    prevMouseX = drawingOne.mouseX;
    prevMouseY = drawingOne.mouseY;
  };

  drawingOne.draw = function () {

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
        drawingOne.stroke(sketchColor);
        drawingOne.strokeWeight(illustrationStroke);
        drawingOne.line(x, y, x + sketch.dx / drawingRatio, y + sketch.dy / drawingRatio);
      }

      x += sketch.dx / drawingRatio;
      y += sketch.dy / drawingRatio;
      previous_pen = sketch.pen;

      if (sketch.pen !== 'end') {
        sketch = null;
        sketchmodel.generate(gotSketch);
      } else {
        drawingOne.noLoop();
        penStrokes = 0;
        previous_pen = sketch.pen;
        sketch = null;
        sketchmodel = null;

        currentRNNSketch ++;
        loadASketch(drawings)

        // resolve promise instance
      }
    }
  };
};

let drawings = [];
let  currentRNNSketch = 0;

function loadASketch(drawingArr) {
  // wait .5 second
  drawings = drawingArr;

  if (drawings[currentRNNSketch]) {
    // setTimeout(() => {
      console.log('drawings RNN',drawings, drawings[currentRNNSketch] );
      sketchmodel = ml5.SketchRNN(drawings[currentRNNSketch], function () {
        startDrawing();
      });
    // }, 100);

    drawSketchResults(drawingClasses);
  } else {
    currentRNNSketch = 0;
  }
}

function startDrawing() {
  x = startX;
  y = startY;

  sketchmodel.reset();
  sketchmodel.generate(gotSketch);
  previous_pen = 'down';
}

function gotSketch(err, s) {
  sketch = s;
}


function drawSketchResults(drawingClasses) {
  // console.log('drawing results for', drawingClasses);

  // create a div container for drawing
  drawingNumber++;

  const div = document.createElement('div');
  div.id = `drawing${sentanceNumber}`;
  div.style.background = 'white';
  div.style.color = 'white';
  div.style.paddingBottom = '0px';

  // only on first sentence opacity is 1.0 in the beginning
  if (sentanceNumber > 1) {
    div.style.opacity = '0.0';
  }
  document.getElementById('drawing-container').appendChild(div);

  const drawingCanvas = new p5(sketchRnnDrawing, document.getElementById(`drawing${sentanceNumber}`));
}






// function loadASketch(drawing) {
//   return new Promise((resolve, reject) => {
//     const rnn = ml5.SketchRNN(drawing, () => {
//         console.log('generating for', drawing);
//         rnn.generate((err, results) => {
//             console.log('results for', drawing, results);
//             resolve(results);
//         });
//     });
//   });
// }
