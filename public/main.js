let posOne = new THREE.Vector3( 100, 0, 200 );
let drawingNumber = 0;
let sentanceNumber = 0;
let currColor = 0;
let camera, scene, renderer;
let mesh;
let targetMesh;
let phase = 4;
let delta = 5;
let deltaoneNumber = 0;
let timecounter = 0;
let pos = { x : 0, y: 0, z:0 };
let newPos = {x: 0, y: 0, z:0 }
let targetPos = { x : 0, y: 0, z: 0 };
let phasesin = 0;
let blinkOpacity = 0;
let gameTime = 60;
let gameOn = false;
let startingValue = 120;
let similarSentences = [];
let similaritiesArray = [];
let sketchColor;
let maxSentences = 6;
let startStory = false;
let penStrokesopening = 0;
let viewportWidth;
let viewportHeight;

let penStrokes = 0;

let lstm;
let textInput;
let tempSlider;
let lengthSlider;
let netTemperature;

let userStory = [];
let storyBuild = [];
let currIllustration = '';

let fablesJson;

let sentanceContainer = [];
let sentimentContainer = [];

////// sketchRnnDrawing stuff

let sketchmodel;
let sketchBookmodel;
let previous_pen = 'down';
let x, y;
let startX = 300;
let startY = 130;

let startBookX;
let startBookY;
let sketch;
let bookSketch;

let canvasWidth = 600;
let canvasHeight = 350;
let drawingRation = 1.6;



let drawingClasses = ["alarm_clock",	"ambulance",	"angel", "ant", "antyoga","backpack",	"barn",	"basket",	"bear",	"bee",
"beeflower",	"bicycle",	"bird",	"book",	"brain",
"bridge",	"bulldozer",	"bus",	"butterfly",	"cactus",
"calendar",	"castle",	"cat",	"catbus",	"catpig",
"chair",	"couch", "crab",	"crabchair",	"crabrabbitfacepig",
"cruise_ship",	"diving_board",	"dog",	"dogbunny",	"dolphin",
"duck",	"elephant",	"elephantpig", "eye",	"face",
"fan",	"fire_hydrant",	"firetruck",	"flamingo",	"flower",
"floweryoga",	"frog",	"frogsofa",	"garden",	"hand",
"hedgeberry",	"hedgehog",	"helicopter",	"kangaroo",	"key",
"lantern",	"lighthouse",	"lion",	"lionsheep",	"lobster",
"map",	"mermaid",	"monapassport",	"monkey",	"mosquito",
"octopus",	"owl",	"paintbrush",	"palm_tree",	"parrot",
"passport",	"peas",	"penguin",	"pig",	"pigsheep",
"pineapple",	"pool",	"postcard",	"power_outlet",	"rabbit",
"rabbitturtle",	"radio",	"radioface",	"rain",	"rhinoceros",
"rifle",	"roller_coaster",	"sandwich",	"scorpion",	"sea_turtle",
"sheep",	"skull",	"snail",	"snowflake",	"speedboat",
"spider",	"squirrel",	"steak",	"stove",	"strawberry",
"swan",	"swing_set",	"the_mona_lisa",	"tiger",	"toothbrush",
"toothpaste",	"tractor",	"trombone",	"truck",	"whale",
"windmill",	"yoga",	"yogabicycle",	"everything"];

let birdsArr = ["jackdaw", "eagle", "crow", "crows", "swallow", "raven", "kite", "lark", "birds", "chicken", "chickens"];
let swanArr = ["crane", "cranes", "goose","ducks", "peacock", "peacocks" , "heron", "herons"];
let mosquitoArr = ["gnat", "grasshopper", "grasshoppers", "flies", "wasps", "hornet"];
let dogArr = ["goats", "wolf", "fox","dogs", "boar", "weasels", "weasel" ];
let sheepArr = ["lamb"];
let spiderArr = ["beetle"];
let basketArr = ["pail"];
let turtleArr = ["tortoise", "tortoises"];
let squirrelArr =["hare"];
let lionArr = ["lion's"];
let catArr = ["tiger", "tiger's", "tigers", "cats"];
let owlArr = ["owl's"];
let frogArr = ["frogs", "frog's"]


//
// ///// speech part
//
// const SpeechRecognition = webkitSpeechRecognition;
// const getSpeech = () => {
//   const recognition = new SpeechRecognition();
//   recognition.lang = 'en-US';
//   recognition.start();
//   // recognition.continuous = false;
//   recognition.interimResults = true;
//   // console.log('started rec');
//
//   recognition.onresult = event => {
//     const speechResult = event.results[0][0].transcript;
//     // console.log('result: ' + speechResult);
//     // console.log('confidence: ' + event.results[0][0].confidence);
//
//     generateNewInput(speechResult);
//
//   };
//
//   recognition.onend = () => {
//     // console.log('it is over');
//     // for "endless" mode, comment out the next line and uncomment getSpeech()
//     // recognition.stop();
//     getSpeech();
//   };
//
//   recognition.onerror = event => {
//     // console.log('something went wrong: ' + event.error);
//   };
// };
//
// function splitInput(inputText){
//   var newtextArr = inputText.toLowerCase().split(" ");
//
//   for (var i = 0; i < newtextArr.length; i++) {
//     storyBuild.push(newtextArr[i]);
//   }
//   // console.log(newtextArr);
//   // console.log('textarray input', newtextArr);
// }
//
//
// function generateNewInput(text){
//
//   walk(text); // word2vec
//
//   let thistextToString = text.toLowerCase().split(" ");
//   splitInput(text);
//   let storyBuildText = storyBuild.toString();
//   // console.log(storyBuildText);
//   let replace = storyBuildText.replace(/,/g, " "); // replace ','
//   // console.log(replace);
//   generate(replace);
//
//   addSentence(text, "voice / input");
//
// }
//
//
// ///// speech part

init();

function modelReady() {
  // document.getElementById('status').innerHTML = 'Model Loaded';
  console.log("model loaded");
}

function init() {

  viewportWidth = window.innerWidth;
  viewportHeight = window.innerHeight;

  startBookX = viewportWidth/2;
  startBookY = viewportHeight/2;

  if (viewportWidth < 450 ){
    canvasWidth = 300;
    canvasHeight = 200;

    startX = canvasWidth/2;
    startY = canvasHeight/2;

    drawingRation = 1.6;


  }


  loadJsonfile();
  setTimeout(() => {
    loadBookSketch('book');
  }, 1000);
}

window.onload = function() {

  let fadeinElement2 = document.getElementById("start-container");
  fadeinElement2.style.visibility = "visible";

  //turn bg to 0.9 opaque

  setTimeout(() => {
    let startBackground = document.getElementById("start-background");
    startBackground.style.opacity = 0.9;
  }, 1000);

  //fade the sentence into the page.
  let fadeinElement = document.getElementById("start-button");
  fadeinButton(fadeinElement);

  let fadeinElement1 = document.getElementById("start-background");
  fadeinButton(fadeinElement1);

};


function loadJsonfile(){
  console.log("loadjson");
  fetch('/aesopFables.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    // console.log(myJson);
    fablesJson = myJson;
  });
}


socket.on('sentencesResults', function(result){
  similarSentences = result;
});


socket.on('sentencesSentiment', function(result){
  // console.log(result);
  sentimentContainer = result;
});



function runjsonCheck(json, checkword){

  // add a regex search for a specific given word
  let regex = new RegExp(checkword);

  //reset a sentance container that will hold all sentances related to the search
  sentanceContainer = [];

  //run through all the sentences in the json file.
  for (var key in json.stories) {
    // json.stories[key].story.length
    //run over 4 sentences
    for (var i = 0; i < Math.ceil(json.stories[key].story.length/3); i++) {

      //convert line to lower case
      let lineInStory = json.stories[key].story[i];
      lineInStory = lineInStory.toLowerCase();

      //does line contain search?
      if (lineInStory.match(regex)){
        //push all the right sentences to an array.
        sentanceContainer.push(json.stories[key].story[i]);
      }
    }
  }

  // pick a randon sentance from that array.
  let randomSentance = Math.floor(Math.random() * Math.floor(sentanceContainer.length));
  socket.emit('sendSeedSentance', {'animal': checkword, 'randomSentance': sentanceContainer[randomSentance]});

  // add the sentance to the page
  addSentence(sentanceContainer[randomSentance], 'notnet');

}


function addSentence(result, source){

  //if the current sentence is smaller than the entire length of the story
  if (sentanceNumber <= maxSentences ){
    //increase sentence number
    sentanceNumber ++;

    //create div to hold new sentence
    var div = document.createElement("div");
    div.id = `paragraph${sentanceNumber}`;
    div.style.background = "white";
    div.style.color = "white";
    div.style.opacity = 0;
    div.style.filter = 'alpha(opacity=' + 0 * 0 + ")";

    //check source of the sentence
    if (source == "net"){
      let para = document.createElement("p");
      para.classList.add("net");
      let node = document.createTextNode(result);
      para.appendChild(node);
      document.getElementById("story").appendChild(div).appendChild(para);
    } else {

      //random color
      // let thisAnimalColor
      sketchColor = getRandomColor();

      //run check to see if there is an illustration that fits here
      let thisClassObject = ifInClass(result);
      let thisClass;

      //if the object is not undefined then set thisClass to the object's class
      if(thisClassObject != undefined){
        thisClass = thisClassObject.class;
      }

      // console.log('this Class', thisClass);
      // console.log('this Class Object', thisClassObject);


      //Color the word --> TODO

      // let str = result.toLowerCase();
      let resultToLower = result.toLowerCase();
      let res = result.split(" ");
      let resLower = resultToLower.split(' ');
      // console.log(thisClassObject.word)
      // console.log(res);



      let paragraph = document.createElement('p');
      paragraph.classList.add("voice");

      console.log(thisClassObject);


      for (var i = 0; i < res.length; i++) {
        let wordSpan = document.createElement('span')
        wordSpan.innerHTML = res[i] + ' ';
        wordSpan.id = resLower[i];


        if(thisClassObject != undefined){
          if((wordSpan.id == thisClass) || (wordSpan.id == thisClassObject.word)){
            wordSpan.style.color = sketchColor;
            console.log('hit', wordSpan.id, thisClassObject)
          }
        }


        //add all spans to paragraph
        paragraph.appendChild(wordSpan);

      }


      document.getElementById("story").appendChild(div).appendChild(paragraph);

      console.log(paragraph);


      // //create a P element
      // let para = document.createElement("p");
      //
      // //add class to paragraph
      // para.classList.add("voice");
      //
      // //create a text node
      // let node = document.createTextNode(result);
      // para.appendChild(node);


      // document.getElementById("story").appendChild(div).appendChild(para);

      //change animal color in the text



      setTimeout(() => {
        //scroll into the sentence

        let elm  = document.getElementById(`paragraph${sentanceNumber}`);
        elm.scrollIntoView({ behavior: 'smooth', block: 'center' });

        //fade the sentence into the page.
        let fadeinElement = document.getElementById(`paragraph${sentanceNumber}`);
        fadein(fadeinElement);
      }, 500);

      //run sentence enrichment


      if (sentanceNumber > 1){
        if (thisClass != undefined){
          // console.log(`add ${thisClass} illustration here`);
          loadASketch(thisClass);
        } else {
          //TODO console.log('dont add illustration here');
        }
      }
    }

    //run loop again!
    setTimeout(() => {
      if((sentanceNumber <= maxSentences )){
        //add the add one more sentence button
        addOneMoreSentence();
      } else{
        //add another sentence --> go to end
        addSentence(similarSentences[sentanceNumber], 'sentence2Vec');
        // console.log("finished with the sentences");
      }
    }, 4500);

  } else {

    //if sentanceNumber is larger than the maxSentences then end story
    endStory();
  }
}


function addOneMoreButton(){
  //if sentanceNumber is larger than the maxSentences

  let div = document.createElement("div");
  div.id = "read-one-more";
  div.style.background = "white";
  div.style.color = "white";
  div.style.opacity = 0;
  div.style.filter = 'alpha(opacity=' + 0 * 0 + ")";
  div.style.margin = "auto";
  div.style.width = "24%";

  let btn = document.createElement("BUTTON");
  btn.classList.add("one-more");
  btn.onclick = function() { resetStory(); };
  let node = document.createTextNode("Read one more");
  btn.appendChild(node);
  document.getElementById("story").appendChild(div).appendChild(btn);

  let fadeinElement1 = document.getElementById("read-one-more");

  fadein(fadeinElement1);

  setTimeout(() => {
    let elm  = document.getElementById('read-one-more');
    elm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 500);

}






function addOneMoreSentence(){
  //After each sentence 'turn the page'

  let div = document.createElement("div");
  div.id = "one-more-sentence";
  div.style.background = "white";
  div.style.color = "white";
  div.style.opacity = 0;
  div.style.filter = 'alpha(opacity=' + 0 * 0 + ")";
  div.style.margin = "auto";
  div.style.width = "24%";
  div.style.paddingTop = "30px";


  // //create loder element
  let progressDiv = document.createElement("div");
  progressDiv.id = "one-more-sentence-loader";
  progressDiv.classList.add("progress-moved");

  let progress = document.createElement("div");
  progress.id = "progress";
  progress.classList.add("progress-bar2");

  //create the pause/play container
  let pauseAndPlay = document.createElement("div");
  pauseAndPlay.classList.add('pause-play-container')
  pauseAndPlay.id = "pauseAndPlay";

  //pauseBool
  let pauseBool = true;

  //create the putton
  let pauseImage = document.createElement("div");
  pauseImage.classList.add('pause-and-play');
  pauseImage.id = 'pause-button';
  pauseImage.style.backgroundImage = "url('./images/pause.svg')";

  // pauseImage.background-image: url("./images/pause.svg");

  pauseImage.onclick = function() {
    if(pauseBool){
      pauseBool = false;
      document.getElementById("pause-button").style.backgroundImage = "url('./images/play.svg')";
    } else{
      pauseBool = true;
      document.getElementById("pause-button").style.backgroundImage = "url('./images/pause.svg')";

    }
  };

  console.log(pauseImage);


  //add a boolean to indicate if its pressed
  let addedSentence = false;
  //creat the button
  let btn = document.createElement("BUTTON");
  btn.classList.add("one-more-sentence");

  btn.onclick = function() {
    addSentenceAfterbutton();
    addedSentence = true;
  };


  let para = document.createElement("span");
  let nodepara = document.createTextNode("What happened next?");
  para.appendChild(nodepara);

  btn.appendChild(para);
  document.getElementById("story").appendChild(div).appendChild(btn).appendChild(progressDiv).appendChild(progress);
  document.getElementById("one-more-sentence").appendChild(pauseAndPlay).appendChild(pauseImage);


  let fadeinElement1 = document.getElementById("one-more-sentence");

  fadein(fadeinElement1);

  //draw the progress bar
  let width = 10;
  //add a timer
  let id = setInterval(frame, 10);

  //call the prgsBar to animate it later
  let prgsBar  = document.getElementById('one-more-sentence-loader');

  function frame() {
    //if timer hasnt reached the end and button was not pressed
    if ((width >= 1000) && (!addedSentence)) {
      clearInterval(id);
      addSentenceAfterbutton();
    } else {
      if (pauseBool){
        width++;
        prgsBar.style.width = width/10 + '%';
      }

      // prgsBar.style.width = 100 + '%';

    }
  }

}


function resetStory(){

  let fadeOutElement = document.getElementById("a-story-about");
  fadeOutElement.style.display = "none";
  fadeOutElement.style.opacity = "0.0";

  fadeOutElement.parentNode.removeChild(fadeOutElement);


  setTimeout(() => {
    let fadeOutElement1 = document.getElementById("story");
    let fadeOutElement2 = document.getElementById("prompt");

    fadeout(fadeOutElement1);
    fadeout(fadeOutElement2);

  }, 500);

  setTimeout(() => {
    drawingNumber = 0;
    sentanceNumber = 0;

    document.getElementById("story").remove();

    var div = document.createElement("div");
    div.id = "story";
    document.getElementById("story-container").appendChild(div);
  }, 1000);

  setTimeout(() => {
    let fadeoutComponent1 = document.getElementById("characterOne");
    let fadeinElement2 = document.getElementById("recordedText");
    let fadeinElement3 = document.getElementById("prompt");

    fadein(fadeinElement2);
    fadein(fadeoutComponent1);
    fadein(fadeinElement3);
    fadein(fadeinElement2);
  }, 1400);

}



function buttonPressed(clicked_id){

  let animalOne = clicked_id;

  //convert to lowercase
  let animalOneLower = animalOne.toLowerCase();

  //first animal illustration
  currIllustration = animalOneLower;
  // let thisclass = ifInClass()
  let animalOneSearch = animalOneLower + ' ';

  console.log("pressed", animalOneSearch);
  // fade out buttons and prompt
  setTimeout(() => {
    let fadeoutComponent1 = document.getElementById("characterOne");
    let fadeoutComponent2 = document.getElementById("recordedText");

    fadeout(fadeoutComponent1);
    fadeout(fadeoutComponent2);
  }, 100);

  // create the story name
  let para = document.createElement("p");
  let node = document.createTextNode(`A story about a ${animalOneSearch}`);

  para.appendChild(node);
  para.style.display = "none";
  para.classList.add("title-text-name");
  para.id = "a-story-about";

  var element = document.getElementById("prompt");
  element.appendChild(para);

  // fade in the story name
  setTimeout(() => {
    fadeInelement = document.getElementById("a-story-about");
    fadein(fadeInelement);
  }, 1000);

  // run the storycheck
  setTimeout(() => {
    runjsonCheck(fablesJson, animalOneSearch);
  }, 1500);

  // add the sketch to the page
  setTimeout(() => {
    loadASketch(currIllustration);
  }, 2000);
}


function startbuttonPressed(clicked_id){

  sketch = null;
  startStory = true;

  setTimeout(() => {
    let fadeoutComponent1 = document.getElementById("book");
    fadeout(fadeoutComponent1);
  }, 300);

  setTimeout(() => {
    let fadeoutComponent = document.getElementById("start-button");
    let fadeoutComponent1 = document.getElementById("start-background");
    fadeout(fadeoutComponent1);
    fadeout(fadeoutComponent);



  }, 500);

  setTimeout(() => {
    let fadeinComponent2 = document.getElementById("characterOne");
    fadein(fadeinComponent2);
    let fadeinComponent1 = document.getElementById("prompt");
    fadein(fadeinComponent1);
  }, 1500);

  setTimeout(() => {
    let elm  = document.getElementById(`startbutton`);
    elm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 2400);
}

//


///////sketchrnn

//drawing class
var sketchRnnDrawing = function( drawingOne ) {
  // var x = 100;
  // var y = 100;

  drawingOne.setup = function() {
    drawingOne.createCanvas(canvasWidth, canvasHeight);
    drawingOne.background(255);
    previous_pen = 'down';
    // sketchColor = getRandomColor();

    drawingOne.loop();
  };

  drawingOne.draw = function() {
    if (sketch) {

      penStrokes ++;
      let penOffset = penStrokes % 4;


      if (sentimentContainer[sentanceNumber] >= 0){
        //sentiment is positive

        //for these animals play this synth
        if( (currIllustration == 'lion') || (currIllustration == 'dog')|| (currIllustration == 'bear') ){
          // each 25th pen stroke
          if ((penStrokes % 25 == 0) && (penOffset != 1)){

            let noteLenngth = noteLength(sketch.dx);
            if(noteLenngth == undefined){
              noteLenngth = '6n';
            }
            let notetoplayMajor = convertDiamToNoteMajor(sketch.dy)/4;
            playNote2( noteLenngth, notetoplayMajor);
          }
        } else{
          //play this synth each 12th stroke
          if ((penStrokes % 12 == 0)&& (penOffset != 1)){

            let noteLenngth = noteLength(sketch.dx);
            if(noteLenngth == undefined){
              noteLenngth = '6n';
            }
            playNote1( noteLenngth, convertDiamToNoteMajor(sketch.dy)*2);
          }
        }
      } else {
        // Sentiment is negeative

        //for these animals play this synth
        if( (currIllustration == 'lion') || (currIllustration == 'dog')|| (currIllustration == 'bear') ){
          // each 25th pen stroke
          if ((penStrokes % 25 == 0) && (penOffset != 1)){

            let noteLenngth = noteLength(sketch.dx);
            if(noteLenngth == undefined){
              noteLenngth = '6n';
            }

            let notetoplayMinor = convertDiamToNoteMinor(sketch.dy)/4;
            playNote2( noteLenngth, notetoplayMinor);
          }
        } else{
          //play this synth each 12th stroke
          if ((penStrokes % 11 == 0) && (penOffset != 1)){

            let noteLenngth = noteLength(sketch.dx);
            if(noteLenngth == undefined){
              noteLenngth = '6n';
            }
            playNote1( noteLenngth, convertDiamToNoteMinor(sketch.dy)*2);
          }
        }
      }


      if (previous_pen == 'down') {
        drawingOne.stroke(sketchColor);
        drawingOne.strokeWeight(6);
        drawingOne.line(x, y, x + sketch.dx/drawingRation, y + sketch.dy/drawingRation);
      }
      x += sketch.dx/drawingRation;
      y += sketch.dy/drawingRation;
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
      }
    }
  };
};





function loadASketch(drawing){
  sketchmodel = ml5.SketchRNN(drawing, function() {
    startDrawing();
  });

  //create a div container for drawing
  drawingNumber ++;

  var div = document.createElement("div");
  div.id = `drawing${sentanceNumber}`;
  div.style.background = "white";
  div.style.color = "white";
  div.style.paddingBottom = "0px";
  document.getElementById("story").appendChild(div);

  var drawingCanvas = new p5(sketchRnnDrawing, document.getElementById(`drawing${sentanceNumber}`));

  if( sentanceNumber != 1){

    // let dimThis  = document.getElementById(`paragraph${sentanceNumber-1}`);
    // dimElement(dimThis);
  }

  setTimeout(() => {
    let elm  = document.getElementById(`drawing${sentanceNumber}`);
    elm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 2000);
}



//book animation
function loadBookSketch(drawing){

  sketchbookmodel = ml5.SketchRNN(drawing, function() {
    startDrawingbook();
  });

  //create a div container for drawing
  // drawingNumber ++;

  var div = document.createElement("div");
  div.id = "bookillustration";
  div.style.background = "white";
  div.style.color = "white";
  div.style.paddingBottom = "0px";
  div.style.position = "absolute";
  div.style.zIndex = "1";
  div.style.top = "0px";
  document.getElementById("book").appendChild(div);

  var drawingBookCanvas = new p5(sketchRnnBook, document.getElementById("bookillustration"));
}

//  Book animation in beginning
function startDrawingbook() {
  x = startBookX/2;
  y = startBookY/2;

  sketchbookmodel.reset();
  sketchbookmodel.generate(gotBookSketch);
  previous_pen = 'down';
  // console.log('startDrawingbook');
}


// book class
var sketchRnnBook = function( drawingBook ) {
  // var x = 100;
  // var y = 100;

  drawingBook.setup = function() {
    drawingBook.createCanvas(viewportWidth, viewportHeight);
    drawingBook.background(255);
    previous_pen = 'down';
    drawingBook.loop();
    sketchColor = getRandomColor();
  };

  drawingBook.draw = function() {
    if (bookSketch) {
      if (previous_pen == 'down') {
        //make music here
        penStrokesopening ++;

        if (penStrokesopening % 20 == 0){
          let noteToPlay = convertDiamToNoteMajor(bookSketch.dy);
          if(noteToPlay == undefined){
            noteToPlay = 0;
          }

          let noteLenngth = noteLength(bookSketch.dx);
          if(noteLenngth == undefined){
            noteLenngth = '6n';
          }
          playNoteStart( noteLenngth, noteToPlay);
        }

        drawingBook.stroke(sketchColor);
        drawingBook.strokeWeight(3);
        drawingBook.line(x, y, x + bookSketch.dx/2, y + bookSketch.dy/2);
      }
      x += bookSketch.dx/2;
      y += bookSketch.dy/2;
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

        sketchBookmodel = ml5.SketchRNN(randDrawing, function() {
          // console.log("sketchmodelReady", randDrawing);
          startBookX = Math.floor(Math.random() * (viewportWidth*2 -20) + 20);
          startBookY = Math.floor(Math.random() * (viewportHeight*2 -20)+ 20);
          // console.log(startBookX,startBookY);

          setTimeout(() => {
            startDrawingbook();
          }, 1700);

        });
        //stop looping in draw
        if(startStory){
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



function startDrawing() {
  x = startX ;
  y = startY;

  sketchmodel.reset();
  sketchmodel.generate(gotSketch);
  previous_pen = 'down';
}


function gotSketch(err, s) {
  sketch = s;
}


function gotBookSketch(err, s) {
  bookSketch = s;
}



// drawingClasses
function ifInClass(theSentance){

  //if you can still add sentences
  if (sentanceNumber <= maxSentences ){

    //get theSentance to lower case
    let sentance = theSentance.toLowerCase();

    //remove, ! . ?
    let newsentance = sentance.replace('.', '');
    newsentance = newsentance.replace(',', '');
    newsentance = newsentance.replace('?', '');
    newsentance = newsentance.replace('!', '');

    //split sentence to array
    let sentenceToArray = newsentance.split(" ");

    let tempArray = [];
    for (var i = 0; i < sentenceToArray.length; i++) {
      tempArray.push({
        // add words as classes now, later to be tested as classes
        class: sentenceToArray[i],
        word:sentenceToArray[i]
      })
    }

    //convert sentenceToArray to an array of objects
    sentenceToArray = tempArray;
    // console.log('sentenceToArray before', sentenceToArray);

    //clear the array called similarityArray
    similaritiesArray = [];

    let addClasses = enrichSketchClass(newsentance);

    // console.log('addClasses', addClasses);

    for (var i = 0; i < addClasses.length; i++) {
      // console.log(`add ${addClasses[i].class} to array`);
      sentenceToArray.push({
        class: addClasses[i].class,
        word: addClasses[i].word
      });
    }

    // console.log('sentenceToArray after',sentenceToArray);

    //fo all the words in that new sentence
    for (var i = 0; i < sentenceToArray.length; i++) {

      //if a word in the class apears inside the sentence
      if (drawingClasses.indexOf(sentenceToArray[i].class.toLowerCase()) > -1) {

        // great! found words, now push those word into similaritiesArray
        similaritiesArray.push({
          word:sentenceToArray[i].word,
          class:sentenceToArray[i].class
        });
      } else {
        // didnt find any words do nothing

      }
    }

    //if found words that match
    if (similaritiesArray.length > 0){
      currIllustration = similaritiesArray[0].class;

      currIllustrationObject = {
        class: similaritiesArray[0].class,
        word: similaritiesArray[0].word
      }

      return currIllustrationObject;
      //add that sketch class to the document
    }
  }
}
