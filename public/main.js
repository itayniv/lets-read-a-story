console.log('📕 Main');

let drawingNumber = 0;
let sentanceNumber = 0;
let currColor = 0;
let mesh;
let targetMesh;
let phase = 4;
let delta = 5;
let deltaoneNumber = 0;
let timecounter = 0;
let targetPos = { x: 0, y: 0, z: 0 };
let phasesin = 0;
let blinkOpacity = 0;
let gameTime = 60;
let gameOn = false;
let startingValue = 120;
let similarSentences = [];
let similaritiesArray = [];
let sketchColor;
let maxSentences;
let startStory = false;
let penStrokesopening = 0;
let viewportWidth;
let viewportHeight;
let contentContainerArr = [];
const illustrationStroke = 8;

let prevMouseY;
let prevMouseX;

let drawingsketch;

let buttonTimer;
let speakBool = true;

let penStrokes = 0;

let storyMethod = {
  snakesAndLadders: 'false',
  similarSentences: 'false',
  similarStory: 'true',
  originalStory: 'false'
}

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

// sketchRnnDrawing stuff

let sketchmodel;
let previous_pen = 'down';
let x, y;
let startX;
let startY;

let vectoredStory = [];


let sketch;


let canvasWidth;
let canvasHeight;
let drawingRatio = 1.2;

const drawingClasses = ["alarm_clock", "ambulance", "angel", "ant", "antyoga", "backpack", "barn", "basket", "bear", "bee",
  "beeflower", "bicycle", "bird", "book", "brain",
  "bridge", "bulldozer", "bus", "butterfly", "cactus",
  "calendar", "castle", "cat", "catbus", "catpig",
  "chair", "couch", "crab", "crabchair", "crabrabbitfacepig",
  "cruise_ship", "diving_board", "dog", "dogbunny", "dolphin",
  "duck", "elephant", "elephantpig", "eye", "face",
  "fan", "fire_hydrant", "firetruck", "flamingo", "flower",
  "floweryoga", "frog", "frogsofa", "garden", "hand",
  "hedgeberry", "hedgehog", "helicopter", "kangaroo", "key",
  "lantern", "lighthouse", "lion", "lionsheep", "lobster",
  "map", "mermaid", "monapassport", "monkey", "mosquito",
  "octopus", "owl", "paintbrush", "palm_tree", "parrot",
  "passport", "peas", "penguin", "pig", "pigsheep",
  "pineapple", "pool", "postcard", "power_outlet", "rabbit",
  "rabbitturtle", "radio", "radioface", "rain", "rhinoceros",
  "rifle", "roller_coaster", "sandwich", "scorpion", "sea_turtle",
  "sheep", "skull", "snail", "snowflake", "speedboat",
  "spider", "squirrel", "steak", "stove", "strawberry",
  "swan", "swing_set", "the_mona_lisa", "tiger", "toothbrush",
  "toothpaste", "tractor", "trombone", "truck", "whale",
  "windmill", "yoga", "yogabicycle", "everything"];

const birdsArr = ["jackdaw", "eagle", "crow", "crows", "swallow", "raven", "kite", "lark", "birds", "chicken", "chickens", "stork"];
const swanArr = ["crane", "cranes", "goose", "ducks", "peacock", "peacocks", "heron", "herons", "stork"];
const mosquitoArr = ["gnat", "grasshopper", "grasshoppers", "flies", "wasps", "hornet"];
const dogArr = ["goat", "goats", "wolf", "fox", "dogs", "boar", "weasels", "weasel"];
const sheepArr = ["lamb"];
const spiderArr = ["beetle"];
const basketArr = ["pail"];
const turtleArr = ["tortoise", "tortoises"];
const squirrelArr = ["hare"];
const lionArr = ["lion's"];
const catArr = ["tiger", "tiger's", "tigers", "cats"];
const owlArr = ["owl's", 'bat', 'bats'];
const frogArr = ['frogs', "frog's"]

init();

function modelReady() {
  // document.getElementById('status').innerHTML = 'Model Loaded';
  console.log("model loaded");
}

function init() {

  getSpeech();
  sketchColor = getRandomColor();


  viewportWidth = window.innerWidth;
  viewportHeight = window.innerHeight;

  startBookX = viewportWidth / 2;
  startBookY = viewportHeight / 2;

  if (viewportWidth < 450) {
    canvasWidth = 300;
    canvasHeight = 200;

    startX = canvasWidth / 2;
    startY = canvasHeight / 2;

    drawingRatio = 1.2;
  }
  loadJsonfile();

  setTimeout(() => {
    loadBookSketch('book');
  }, 1000);

  const format = document.getElementById('one-page');
  format.style.opacity = '0.0';
}

window.onload = function () {

  let fadeinElement2 = document.getElementById("start-container");
  // fadeinElement2.style.visibility = "visible";
  fadein(fadeinElement2);
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


function loadJsonfile() {
  // console.log("loadjson");
  fetch('/aesopFables.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      // console.log(myJson);
      fablesJson = myJson;
    });
}


socket.on('similarSentences', function (result) {
  if (storyMethod.similarSentences === 'true') {
    similarSentences = result.sentences;
    sentimentContainer = result.sentiment;
    console.log('📚 story method similarSentences ', storyMethod.similarSentences)
  }
});

// incoming Socket for similar story 
socket.on('similarStory', function (result) {
  if (storyMethod.similarStory === 'true') {

    for (let index = 0; index < result.sentiment.sentences.length; index++) {
      similarSentences.push(result.sentiment.sentences[index]);
      sentimentContainer.push(result.sentiment.sentiment[index]);
    }

    console.log('📚 story method similarStory ', storyMethod.similarStory)
  }

  // result gives similar story
});

// incoming Socket for original story 
socket.on('originalStoryAndSentiment', function (result) {
  // maxSentences = result.sentences.length;

  if (storyMethod.originalStory === 'true') {
    console.log('result', result);
    for (let index = 0; index < result.sentences.length; index++) {
      similarSentences.push(result.sentences[index]);
      sentimentContainer.push(result.sentiment[index]);
    }

    console.log('📚 story method original story ', storyMethod.similarStory)
  }

});

socket.on('nextVectoredLine', function (result) {
  if (storyMethod.snakesAndLadders === 'true') {
    console.log('📚 story method snakesAndLadders ', storyMethod.snakesAndLadders)

    // console.log('nextVectoredLine result', result);

    const nextVectorLine = result.sentiment.sentences;
    const nextVectorSentiment = result.sentiment.sentiment;

    vectoredStory.push(nextVectorLine[0]);

    similarSentences.push(nextVectorLine[0]);
    sentimentContainer.push(nextVectorSentiment[0])

    if (vectoredStory.length <= 6) {
      recieveLineSendStory(nextVectorLine);
    }

    if (vectoredStory.length === 6) {
      console.log('generated story: ', vectoredStory);
    }
  }
});

// get the new seed response
socket.on('NewSeedResult', function (result) {
  insertNewSeed(result);
});


// socket.on('sentencesSentiment', function(result){
//   // console.log(result);
//   sentimentContainer = result;
// });


function runjsonCheck(json, checkword) {

  // add a regex search for a specific given word
  const regex = new RegExp(checkword);

  // reset a sentance container that will hold all sentances related to the search
  sentanceContainer = [];

  // run through all the sentences in the json file.
  for (let key in json.stories) {
    // json.stories[key].story.length
    //run over the first third and pick a sentence
    for (let i = 0; i < Math.floor(json.stories[key].story.length / 2); i++) {

      //convert line to lower case
      let lineInStory = json.stories[key].story[i];
      lineInStory = lineInStory.toLowerCase();

      // does line contain search?
      if (lineInStory.match(regex)) {

        // push all the right sentences to an array.
        sentanceContainer.push(json.stories[key].story[i]);
      }
    }
  }

  // pick a randon sentance from that array.
  const randomSentance = sentanceContainer[Math.floor(Math.random() * Math.floor(sentanceContainer.length))];
  let thisStoryArray = [];
  // get the entire story of that sentence

  // run through all the sentences in the json file.
  for (let key in json.stories) {
    for (let i = 0; i < json.stories[key].story.length; i++) {
      if (randomSentance === json.stories[key].story[i]) {
        thisStoryArray = json.stories[key].story;
      }
    }
  }

  maxSentences = thisStoryArray.length - 1;

  // console.log(thisStoryArray);
  socket.emit('sendSeedSentance', { 'animal': checkword, 'randomSentance': randomSentance, 'originalStory': thisStoryArray });

  // add the sentance to the page
  addSentence(thisStoryArray[0], 'notnet');

}

function addSentence(result, source) {

  console.log('result', result);

  //  if the current sentence is smaller than the entire length of the story
  if (sentanceNumber <= maxSentences) {
    //  increase sentence number
    sentanceNumber++;

    // create content container to hold new sentence and buttons
    const container = document.createElement('div');
    container.id = `content-container${sentanceNumber}`;
    container.classList.add('content-container');

    // create div to hold new sentence
    const div = document.createElement('div');
    div.id = `paragraph${sentanceNumber}`;
    div.classList.add('paragraph-container');


    const resultToLower = result.toLowerCase();
    const res = result.split(' ');
    const resLower = resultToLower.split(' ');


    // check source of the sentence
    if (source == "net") {
      let para = document.createElement('p');
      para.classList.add("net");
      let node = document.createTextNode(result);
      para.appendChild(node);
      document.getElementById('story').appendChild(div).appendChild(para);

    } else {

      // random color
      // let thisAnimalColor
      sketchColor = getRandomColor();

      //  run check to see if there is an illustration that fits here
      let thisClassObject = ifInClass(result);
      let thisClass;

      //  if the object is not undefined then set thisClass to the object's class
      if (thisClassObject != undefined) {
        thisClass = thisClassObject.class;
      }


      const resultToLower = result.toLowerCase();
      const res = result.split(' ');
      const resLower = resultToLower.split(' ');

      const paragraph = document.createElement('p');
      paragraph.classList.add('voice');


      for (let i = 0; i < res.length; i++) {
        const wordSpan = document.createElement('span')
        wordSpan.innerHTML = res[i] + ' ';
        wordSpan.id = resLower[i];

        if (thisClassObject != undefined) {
          if ((wordSpan.id === thisClass) || (wordSpan.id === thisClassObject.word)) {
            wordSpan.style.color = sketchColor;
          }
        }

        // add all spans to paragraph
        paragraph.appendChild(wordSpan);
      }

      // create button container
      const reBranchContainer = document.createElement('div');
      reBranchContainer.id = 'rebranch-container';
      reBranchContainer.classList.add('rebranch-container');

      // remove prev rebranch
      const prevRebranchButton = document.getElementById(`rebranch-button${sentanceNumber - 1}`);
      const thisObjectID = `rebranch-button${sentanceNumber - 1}`;
      if (prevRebranchButton != null) {
        fadeoutandDeletecurrOpacity(prevRebranchButton, thisObjectID);
      }


      // create the putton
      const reBranch = document.createElement('div');
      reBranch.classList.add('rebranch-button');
      reBranch.id = `rebranch-button${sentanceNumber}`;
      reBranch.onclick = function () { rebranchThis(sentanceNumber); };
      reBranch.style.backgroundImage = "url('./images/branch.svg')";

      if (sentanceNumber <= maxSentences) {
        reBranchContainer.appendChild(reBranch);
        console.log('added rebranch');
      }


      const paragraphNumber = document.createElement('div');
      paragraphNumber.classList.add('currnet-paragraph');
      paragraphNumber.id = `paragraphNumber${sentanceNumber}`;
      paragraphNumber.innerHTML = `${sentanceNumber} / ${maxSentences + 1}`


      document.getElementById('story').appendChild(container).appendChild(div).appendChild(paragraphNumber);
      document.getElementById('story').appendChild(container).appendChild(div).appendChild(paragraph);
      document.getElementById(`paragraph${sentanceNumber}`).appendChild(reBranchContainer);

      // create an object to push to array
      let containerObject = {
        "object": paragraphNumber,
        "isVisible": ''
      };

      // push object to array
      contentContainerArr.push(containerObject);

      setTimeout(() => {
        // scroll into the sentence

        const elm = document.getElementById(`paragraph${sentanceNumber}`);
        elm.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // fade the sentence into the page.
        const fadeinElement = document.getElementById(`paragraph${sentanceNumber}`);
        fadein(fadeinElement);

        // calculate Ysize of story element

       
        const newStoryHeight = checkDivHeight('story-holder');
        console.log('height is ', newStoryHeight);
        // paint.resizeCanvas(500, newStoryHeight);
        console.log(drawingsketch);


      }, 500);

      // run sentence enrichment


      if (sentanceNumber > 1) {
        if (thisClass != undefined) {
          // console.log(`add ${thisClass} illustration here`);
          loadASketch(thisClass);
        } else {
          // TODO console.log('dont add illustration here');
        }
      }
    }


    // Read the paragraph

    if (speakBool) {
      setTimeout(() => {
        if (narration) {
          speak(resultToLower);
        }
      }, 5500);
    }

    // run loop again!
    setTimeout(() => {
      if ((sentanceNumber <= maxSentences)) {
        // add the add one more sentence button
        addOneMoreSentence();
      } else {
        // add another sentence --> go to end
        addSentence(similarSentences[sentanceNumber], 'sentence2Vec');
        // console.log("finished with the sentences");
      }
    }, 4500);

  } else {

    // if sentanceNumber is larger than the maxSentences then end story
    endStory();
  }
}


function addOneMoreButton() {
  // if sentanceNumber is larger than the maxSentences

  const div = document.createElement('div');
  div.id = 'read-one-more';
  div.classList.add("wrap-one-more");
  div.style.paddingTop = `${canvasHeight / 2}px`;

  const btn = document.createElement('BUTTON');
  btn.classList.add('button-animation-one-more');
  btn.onclick = function () { resetStory(); };
  const node = document.createTextNode('Read one more');
  btn.appendChild(node);

  document.getElementById(`paragraph${sentanceNumber}`).appendChild(div).appendChild(btn);

  const fadeinElement1 = document.getElementById('read-one-more');

  fadein(fadeinElement1);

  setTimeout(() => {
    const elm = document.getElementById('read-one-more');
    elm.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 500);

}

function addOneMoreSentence() {
  // After each sentence 'turn the page'

  const div = document.createElement('div');
  div.id = 'one-more-sentence';
  // div.style.background = 'white';
  // div.style.color = 'white';
  div.style.opacity = 0;
  div.style.filter = 'alpha(opacity=' + 0 * 0 + ")";
  div.style.paddingTop = "30px";

  //remove previouse pause and play

  if (document.getElementById('pauseAndPlay') != undefined) {
    const pausebutton = document.getElementById('pauseAndPlay');
    pausebutton.parentNode.removeChild(pausebutton);
  }

  // create the pause/play container
  const pauseAndPlay = document.createElement('div');
  pauseAndPlay.classList.add('pause-play-container')
  pauseAndPlay.id = 'pauseAndPlay';
  pauseAndPlay.style.opacity = '0.0';

  // pauseBool
  let pauseBool = true;

  // create the putton
  let pauseImage = document.createElement("div");
  pauseImage.classList.add('pause-and-play');
  pauseImage.id = 'pause-button';
  pauseImage.style.backgroundImage = "url('./images/pause.svg')";

  pauseImage.onclick = function () {
    if (pauseBool) {
      pauseBool = false;
      document.getElementById("pause-button").style.backgroundImage = "url('./images/play.svg')";
    } else {
      pauseBool = true;
      document.getElementById("pause-button").style.backgroundImage = "url('./images/pause.svg')";

    }
  };


  // add a boolean to indicate if its pressed
  let addedSentence = false;

  // create the button

  const buttonWrapper = document.createElement('div');
  buttonWrapper.id = 'one-more-sentence-div';
  buttonWrapper.classList.add("wrap-one-more");

  const btn = document.createElement('BUTTON');
  btn.classList.add('what-happened-button');
  btn.onclick = function () {
    addSentenceAfterbutton();

    // interval to 100 here
    clearInterval(buttonTimer);
    let prgsBar = document.getElementById(`one-more-sentence-loader${sentanceNumber}`);
    prgsBar.style.width = '100%';
    addedSentence = true;

    const playPause = document.getElementById('pause-button');
    fadeoutandDelete(playPause);
  };

  const node = document.createTextNode('What happened next?');
  btn.appendChild(node);

  document.getElementById(`paragraph${sentanceNumber}`).appendChild(div).appendChild(btn);

  document.getElementById(`content-container${sentanceNumber}`).appendChild(div).appendChild(buttonWrapper).appendChild(btn);

  // insert footer timeline element
  footerInsert();

  document.getElementById('controls').appendChild(pauseAndPlay).appendChild(pauseImage);

  const fadeinpause = document.getElementById('pauseAndPlay');
  fastFadein(fadeinpause);

  let fadeinElement1 = document.getElementById("one-more-sentence");

  fadein(fadeinElement1);


  // add a timer
  buttonTimer = setInterval(timeOutTimer, 10);

  // draw the progress bar
  let width = 0;

  // call the prgsBar to animate it later
  let prgsBar = document.getElementById(`one-more-sentence-loader${sentanceNumber}`);


  function timeOutTimer() {

    // if timer hasnt reached the end and button was not pressed
    if ((width >= 1000) && (!addedSentence)) {

      clearInterval(buttonTimer);
      addSentenceAfterbutton();

    } else {
      if (pauseBool) {
        width++;
        prgsBar.style.width = width / 10 + '%';
      }
    }
  }
}


function rebranchThis(sentence) {
  // console.log('sentence', sentence-1);
  socket.emit('rebranchSentence', { 'animal': 'checkword', 'rebranchSentance': similarSentences[sentence - 1] });

}

function insertNewSeed(newSeedObject) {
  // get the new sentences
  let newSeedResults = newSeedObject.sentences;

  // first element removed

  newSeedResults.shift();

  // what sentence are we on right now?
  let currSentence = sentanceNumber - 1;

  // cut the sumilar sentence array to the length of this
  similarSentences.length = currSentence;

  // concatinate both arrays
  let concatinatedArray = similarSentences.concat(newSeedResults);

  similarSentences = concatinatedArray;

  // add 'newseed' span to page number
  let thisPageNumber = document.getElementById(`paragraphNumber${sentanceNumber}`);

  // check for recent seed holder
  for (let i = 0; i < (currSentence + 1); i++) {

    let thisSpanNumber = document.getElementById(`currentSeed${i + 1}`);
    if (thisSpanNumber != null) {
      thisSpanNumber.innerHTML = ' ';
    }

  }

  const currentSeedSpan = document.createElement('span')
  currentSeedSpan.innerHTML = 'Current Seed';
  currentSeedSpan.id = `currentSeed${sentanceNumber}`;
  currentSeedSpan.classList.add('current-seed');


  thisPageNumber.appendChild(currentSeedSpan);


  setTimeout(() => {
    clearInterval(buttonTimer);
    addSentenceAfterbutton();
  }, 300);
}


function resetStory() {

  const fadeOutElement = document.getElementById('story-name');
  fadeout(fadeOutElement);


  setTimeout(() => {
    const fadeOutElement1 = document.getElementById('story');
    const fadeOutElement2 = document.getElementById('prompt');

    fadeout(fadeOutElement1);
    fadeout(fadeOutElement2);

  }, 500);

  setTimeout(() => {
    drawingNumber = 0;
    sentanceNumber = 0;

    // remove current story
    document.getElementById('story').remove();

    // remove timeline

    const timelineElements = document.getElementById('timeline-container').childNodes;
    console.log(timelineElements);


    // create a story container
    let div = document.createElement('div');
    div.id = 'story';
    div.classList.add('story-column');
    document.getElementById('story-holder').append(div);

  }, 1000);

  setTimeout(() => {
    // const fadeoutComponent1 = document.getElementById('characterOne');
    const fadeinElement2 = document.getElementById('recordedText');
    const fadeinElement3 = document.getElementById('prompt');
    const fadeinElement4 = document.getElementById('recordedText-eg');
    document.getElementById('recordedText').value = '';

    for (let index = 0; index < 6; index++) {
      const thisfadeout = document.getElementById(`one-more-sentence-loader${index + 1}`);
      fadeoutandDelete(thisfadeout);

    }

    fadein(fadeinElement2);
    fadein(fadeinElement3);
    fadein(fadeinElement4);
  }, 1400);

}



function addACanvas() {

  drawingsketch = function (paint) {
    paint.setup = function () {
      paint.createCanvas(canvasWidth, 4000);
      // console.log('clear',canvasWidth, canvasHeight);
      paint.background(255);
    }
    paint.mouseDragged = function () {
      console.log('painting');
      paint.strokeWeight(4);
      paint.stroke(sketchColor);
      paint.line(paint.mouseX, paint.mouseY, paint.pmouseX, paint.pmouseY);
    }
  
  };

  

  let canvasContainer = document.createElement('div');
  canvasContainer.id = 'canvasContainer1';
  document.getElementById('paint-Container').appendChild(canvasContainer);

  let openingCanvas = new p5(drawingsketch, window.document.getElementById('canvasContainer1'));

}



function buttonPressed(subject) {

  // // 1st canvas
  // let myCanvas = createCanvas(500, 500);
  // myCanvas.parent('drawing-container');

  let hero = subject;

  //convert to lowercase
  let heroLower = hero.toLowerCase();

  //first animal illustration
  currIllustration = heroLower;
  // let thisclass = ifInClass()
  let heroSearch = heroLower + ' ';

  // fade out buttons and prompt
  setTimeout(() => {
    // let fadeoutComponent1 = document.getElementById('characterOne');
    const fadeoutComponent2 = document.getElementById('recordedText');
    const fadeoutComponent3 = document.getElementById('recordedText-eg');
    // fadeout(fadeoutComponent1);
    fadeout(fadeoutComponent2);
    fadeout(fadeoutComponent3);
  }, 100);

  // create the story name
  const storyName = document.getElementById('story-name');
  storyName.innerHTML = `A story about a ${heroSearch}`;

  storyName.style.display = "none";
  storyName.style.opacity = '0.0';

  storyName.id = 'story-name';

  // fade in the story name
  setTimeout(() => {
    fadeInelement = document.getElementById('story-name');
    fadein(fadeInelement);
  }, 1000);

  // run the storycheck
  setTimeout(() => {
    runjsonCheck(fablesJson, heroSearch);
  }, 1500);

  // add the sketch to the page
  setTimeout(() => {
    loadASketch(currIllustration);
  }, 2000);
}


function startbuttonPressed(clicked_id) {

  sketch = null;
  startStory = true;

  setTimeout(() => {
    let fadeoutComponent1 = document.getElementById('book');
    fadeout(fadeoutComponent1);
  }, 300);

  setTimeout(() => {
    let fadeoutComponent = document.getElementById('start-button');
    let fadeoutComponent1 = document.getElementById('start-background');
    fadeout(fadeoutComponent1);
    fadeout(fadeoutComponent);
  }, 500);

  const pageApp = document.getElementById('one-page');
  pageApp.style.display = '';

  canvasWidth = document.getElementById("drawing-container").offsetWidth;
  canvasHeight = document.getElementById("drawing-container").offsetHeight;

  startX = canvasWidth / 2;
  startY = canvasHeight / 2;

  addACanvas();

  // change writing prompt to somthing
  const textPrompt = document.getElementById('recordedText');
  textPrompt.placeholder = 'what kind of story would you like to read today?';

  const textPromptEg = document.getElementById('recordedText-eg');
  textPromptEg.innerHTML = 'For example, try asking for a story about a certain animal?';


  setTimeout(() => {

    // const fadeinComponent2 = document.getElementById('characterOne');
    // fadein(fadeinComponent2);
    const fadeinComponent1 = document.getElementById('prompt');
    const format = document.getElementById('one-page');
    fadein(fadeinComponent1);
    fadein(format);

    // create story container

    let div = document.createElement('div');
    div.id = 'story-container';
    document.getElementById('story').append(div);

  }, 1700);

  setTimeout(() => {
    const elm = document.getElementById(`startbutton`);
    elm.remove();
  }, 2400);
}

// --> sketchrnn

// drawing class
let sketchRnnDrawing = function (drawingOne) {

  drawingOne.setup = function () {
    drawingOne.createCanvas(canvasWidth, canvasHeight);
    drawingOne.background(255);
    drawingOne.frameRate(60)
    previous_pen = 'down';

    drawingOne.loop();
  };


  drawingOne.mouseDragged = function () {
    // console.log('painting');
    drawingOne.strokeWeight(3);
    drawingOne.smooth();
    

    drawingOne.line(drawingOne.mouseX, drawingOne.mouseY, prevMouseX, prevMouseY);

    prevMouseX = drawingOne.mouseX;
    prevMouseY = drawingOne.mouseY;
  }

  drawingOne.draw = function () {
    if (sketch) {

      penStrokes++;
      let penOffset = penStrokes % 4;

      if (sentimentContainer[sentanceNumber] >= 0) {
        //sentiment is positive

        //for these animals play this synth
        if ((currIllustration == 'lion') || (currIllustration == 'dog') || (currIllustration == 'bear')) {
          // each 25th pen stroke
          if ((penStrokes % 25 == 0) && (penOffset != 1)) {

            let noteLenngth = noteLength(sketch.dx);
            if (noteLenngth == undefined) {
              noteLenngth = '6n';
            }
            let notetoplayMajor = convertDiamToNoteMajor(sketch.dy) / 4;
            playNote2(noteLenngth, notetoplayMajor);
          }
        } else {
          //play this synth each 12th stroke
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

        //for these animals play this synth
        if ((currIllustration == 'lion') || (currIllustration == 'dog') || (currIllustration == 'bear')) {
          // each 25th pen stroke
          if ((penStrokes % 25 == 0) && (penOffset != 1)) {

            let noteLenngth = noteLength(sketch.dx);
            if (noteLenngth == undefined) {
              noteLenngth = '6n';
            }

            let notetoplayMinor = convertDiamToNoteMinor(sketch.dy) / 4;
            playNote2(noteLenngth, notetoplayMinor);
          }
        } else {
          //play this synth each 12th stroke
          if ((penStrokes % 11 == 0) && (penOffset != 1)) {

            let noteLenngth = noteLength(sketch.dx);
            if (noteLenngth == undefined) {
              noteLenngth = '6n';
            }
            playNote1(noteLenngth, convertDiamToNoteMinor(sketch.dy) * 2);
          }
        }
      }

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
      }
    }
  };
};



function loadASketch(drawing) {
  // wait .5 second

  setTimeout(() => {
    sketchmodel = ml5.SketchRNN(drawing, function () {
      startDrawing();
    });
  }, 500);

  //create a div container for drawing
  drawingNumber++;

  const div = document.createElement("div");
  div.id = `drawing${sentanceNumber}`;
  div.style.background = "white";
  div.style.color = "white";
  div.style.paddingBottom = "0px";

  // only on first sentence opacity is 1.0 in the beginning
  if (sentanceNumber > 1) {
    div.style.opacity = '0.0';
  }
  document.getElementById("drawing-container").appendChild(div);

  let drawingCanvas = new p5(sketchRnnDrawing, document.getElementById(`drawing${sentanceNumber}`));

  if (sentanceNumber != 1) {

    // let dimThis  = document.getElementById(`paragraph${sentanceNumber-1}`);
    // dimElement(dimThis);
  }

  // setTimeout(() => {
  //   let elm = document.getElementById(`drawing${sentanceNumber}`);
  //   elm.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // }, 2000);
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




// drawingClasses

function ifInClass(theSentance) {

  //if you can still add sentences
  if (sentanceNumber <= maxSentences) {

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
    for (let i = 0; i < sentenceToArray.length; i++) {
      tempArray.push({
        // add words as classes now, later to be tested as classes
        class: sentenceToArray[i],
        word: sentenceToArray[i]
      })
    }

    //convert sentenceToArray to an array of objects
    sentenceToArray = tempArray;
    // console.log('sentenceToArray before', sentenceToArray);

    //clear the array called similarityArray
    similaritiesArray = [];

    let addClasses = enrichSketchClass(newsentance);

    // console.log('addClasses', addClasses);

    for (let i = 0; i < addClasses.length; i++) {
      // console.log(`add ${addClasses[i].class} to array`);
      sentenceToArray.push({
        class: addClasses[i].class,
        word: addClasses[i].word
      });
    }


    //fo all the words in that new sentence
    for (let i = 0; i < sentenceToArray.length; i++) {

      //if a word in the class apears inside the sentence
      if (drawingClasses.indexOf(sentenceToArray[i].class.toLowerCase()) > -1) {

        // great! found words, now push those word into similaritiesArray
        similaritiesArray.push({
          word: sentenceToArray[i].word,
          class: sentenceToArray[i].class
        });
      } else {
        // didnt find any words do nothing

      }
    }

    //if found words that match
    if (similaritiesArray.length > 0) {
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


