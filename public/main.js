console.log('📕 Main');

let drawingNumber = 0;
let storyCurrentlyRunning = false;
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
const illustrationStroke = 6;

let sketchillustrationArr;

let globalCanv;
let pauseBool = true;

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
let currIllustration = [];

let fablesJson;

let sentanceContainer = [];
let sentimentContainer = [];

// sketchRnnDrawing stuff


let vectoredStory = [];


let canvasWidth;
let canvasHeight;
let drawingRatio = 2.0;

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

const birdsArr = ["jackdaw", "eagle", "crow", "crows", "swallow", "raven", "swallow", "kite", "lark", "birds", "chicken", "chickens", "stork"];
const swanArr = ["crane", "cranes", "goose", "ducks", "peacock", "peacocks", "heron", "herons", "stork"];
const mosquitoArr = ["gnat", "grasshopper", "grasshoppers", "flies", "wasps", "hornet"];
const dogArr = ["goat", "goats", "wolf", "fox", "dogs", "boar", "weasels", "weasel"];
const sheepArr = ["lamb"];
const spiderArr = ["beetle"];
const basketArr = ["pail"];
const turtleArr = ["tortoise", "tortoises"];
const squirrelArr = ["mice"];
const lionArr = ["lion's"];
const catArr = ["tiger", "tiger's", "tigers", "cats"];
const owlArr = ["owl's", 'bat', 'bats'];
const frogArr = ['frogs', "frog's"];
const rabitArr = ["Mice", 'hare'];

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

    drawingRatio = 2.0;
  }

  loadJsonfile();

  const sketchRnn = ml5.SketchRNN('book', (result) => {
    // console.log('cb result', result);
    loadBookSketch('book', sketchRnn);
  });

  const format = document.getElementById('one-page');
  format.style.opacity = '0.0';

  // document.body.style.cursor =   "none";
  // document.body.style.cursor =   "url('images/pencil.svg'), auto";
}

window.onload = function () {

  // let fadeinElement2 = document.getElementById("start-container");
  // // fadeinElement2.style.visibility = "visible";
  // fadein(fadeinElement2);
  // //turn bg to 0.9 opaque

  // setTimeout(() => {
  //   let startBackground = document.getElementById("start-background");
  //   startBackground.style.opacity = 0.9;
  // }, 1000);

  // //fade the sentence into the page.
  // let fadeinElement = document.getElementById("start-button");
  // fadeinButton(fadeinElement);

  // let fadeinElement1 = document.getElementById("start-background");
  // fadeinButton(fadeinElement1);
};


function loadJsonfile() {
  // console.log("loadjson");
  return fetch('/aesopFables.json')
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

  // story Start Bool
  storyCurrentlyRunning = true;

  maxSentences = thisStoryArray.length - 1;

  // console.log(thisStoryArray);
  socket.emit('sendSeedSentance', { 'animal': checkword, 'randomSentance': randomSentance, 'originalStory': thisStoryArray });

  // add the sentance to the page
  addSentence(thisStoryArray[0], 'notnet');
}

async function addSentence(result, source) {

  // if app is not paused
  if (storyCurrentlyRunning) {
    console.log('****result****', result);

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


      let resultToLower = result.toLowerCase();
      let res = result.split(' ');
      let resLower = resultToLower.split(' ');


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
        let thisClass = [];

        //  if the object is not undefined then set thisClass to the object's class

        if ((thisClassObject !== undefined) && (thisClassObject.length >= 0)) {
          for (let index = 0; index < thisClassObject.length; index++) {
            const thisclassinstnce = thisClassObject[index].class;
            thisClass.push(thisclassinstnce);
          }
        }
        // splice the sentence

        let resultToLower = result.toLowerCase();
        let res = result.match(/\w+|[^\s\w]+/g);
        let resLower = resultToLower.match(/\w+|[^\s\w]+/g);

        const paragraph = document.createElement('p');
        paragraph.classList.add('voice');

        for (let i = 0; i < res.length; i++) {
          const wordSpan = document.createElement('span');

          // parse punctuation
          if ((res[i + 1] === '.') || (res[i + 1] === ',') || (res[i + 1] === ':') || (res[i + 1] === '!') || (res[i + 1] === "'") || (res[i + 1] === '?')) {
            wordSpan.innerHTML = res[i] + '';
            wordSpan.id = resLower[i];
            wordSpan.classList.add('highlight-disable');

          } else {
            wordSpan.innerHTML = res[i] + ' ';
            wordSpan.id = resLower[i];
            wordSpan.classList.add('highlight-disable');
          }

          for (let index = 0; index < thisClass.length; index++) {

            if (thisClassObject !== undefined) {
              if ((wordSpan.id === thisClass[index]) || (wordSpan.id === thisClassObject[index].word)) {
                wordSpan.style.color = sketchColor;
                // console.log('highlight word ', thisClassObject[index].word);
              }
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
          // console.log('added rebranch');
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
          elm.scrollIntoView({ behavior: 'smooth', block: 'center' });

          // fade the sentence into the page.
          const fadeinElement = document.getElementById(`paragraph${sentanceNumber}`);
          fadein(fadeinElement);

          // calculate Ysize of story element

          const newStoryHeight = checkDivHeight('story-holder');
          // console.log('height is ', newStoryHeight);
          // paint.resizeCanvas(500, newStoryHeight);

        }, 500);

        // run sentence enrichment

        if (sentanceNumber > 1) {

          // add illustration to the page
          if ((thisClass !== undefined) && (thisClass.length >= 1)) {
            if (thisClass[0]) {
              // console.log('first drawing', thisClass[0]);
              await loadASketch(thisClass);
            }
            
            // console.log('loading sketches for', thisClass);

            // const loadSketchPromises = thisClass.map(className => loadASketch(className));
            // Promise.all(loadSketchPromises)
            //   .then(sketchResults => {
            //     console.log('got sketch results', sketchResults);
            //     // drawSketchResults(sketchResults);
            //   });

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

      // additional drawing on left Canvas -->
      // setTimeout(() => {
      //   const startPosition = checkDivPosition(`paragraph${sentanceNumber}`) + 200;
      //   console.log('startPosition', startPosition);
      //   const additionalDrawing = arrow;
      //   globalCanv.startNewDrawing(true, additionalDrawing, startPosition);
      // }, 7500);

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
    elm.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    pauseBool = true;

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

  storyCurrentlyRunning = false;

  const fadeOutElement = document.getElementById('story-name');
  fadeout(fadeOutElement);


  setTimeout(() => {
    const fadeOutElement1 = document.getElementById('story');
    const fadeOutElement2 = document.getElementById('prompt');
    const illustrations = document.getElementById('canvas-Container');

    fadeout(fadeOutElement1);
    fadeout(fadeOutElement2);
    fadeoutandDelete(illustrations);

  }, 500);

  setTimeout(() => {
    drawingNumber = 0;
    sentanceNumber = 0;

    // remove current story
    document.getElementById('story').remove();

    // remove timeline

    // const timelineElements = document.getElementById('timeline-container').childNodes;

    var timelineElements = document.getElementById("timeline-container");
    while (timelineElements.firstChild) {
      timelineElements.removeChild(timelineElements.firstChild);
    }

    var sketchRNNIllustrations = document.getElementById("drawing-container");
    setTimeout(() => {
      fadeout(sketchRNNIllustrations);
    }, 100);

    setTimeout(() => {
      while (sketchRNNIllustrations.firstChild) {
        sketchRNNIllustrations.removeChild(sketchRNNIllustrations.firstChild);
      }
      document.getElementById("drawing-container").style.opacity = '1.0';
      document.getElementById("drawing-container").style.display = '';

    }, 1000);



    // create a story container
    let div = document.createElement('div');
    div.id = 'story';
    div.classList.add('story-column');
    document.getElementById('story-holder').append(div);

  }, 1000);

  setTimeout(() => {
    // scroll to top
    document.body.scrollTop = document.documentElement.scrollTop = 0;

  }, 1200);

  setTimeout(() => {
    // const fadeoutComponent1 = document.getElementById('characterOne');
    const fadeinElement2 = document.getElementById('recordedText');
    const fadeinElement3 = document.getElementById('prompt');
    const fadeinElement4 = document.getElementById('recordedText-eg');
    document.getElementById('recordedText').value = '';

    fadein(fadeinElement2);
    fadein(fadeinElement3);
    fadein(fadeinElement4);
  }, 1400);

  // reset Sentiment Arr
  similarSentences = [];


  // reset story Arr
  sentimentContainer = [];

}


function addACanvas() {
  drawingsketch = function (paint) {

    paint.currDrawing;
    paint.drawingOffset;

    paint.setup = function () {
      paint.createCanvas(canvasWidth, 8000);
      paint.point = 0;
      // console.log('clear',canvasWidth, canvasHeight);
      paint.background(255);
    }
    paint.mouseDragged = function () {
      // pauseBool
      pauseBool = false;

      paint.strokeWeight(illustrationStroke);
      paint.stroke(sketchColor);
      paint.line(paint.mouseX, paint.mouseY, paint.pmouseX, paint.pmouseY);
    }

    paint.draw = function () {
      if (paint.currentlyDrawing) {
        paint.drawSomthing(paint.point, paint.currDrawing, paint.drawingOffset);
        paint.point = paint.point + 1;
        // console.log('*** drawing ***', paint.point);
      }
    }

    paint.startNewDrawing = function (drawBool, json, offset) {
      paint.currentlyDrawing = drawBool;
      paint.currDrawing = json;
      paint.drawingOffset = offset;
    }

    paint.drawSomthing = function (point, jsonDrawing) {
      if (paint.point < jsonDrawing.length) {
        paint.strokeWeight(illustrationStroke);
        paint.stroke(sketchColor);
        paint.line(jsonDrawing[point].thisX, 
          jsonDrawing[point].thisY + paint.drawingOffset, 
          jsonDrawing[point].prevX, 
          jsonDrawing[point].prevY + paint.drawingOffset);
        // console.log('something', point, jsonDrawing[point].thisX );
      } else {
        paint.currentlyDrawing = false;
        paint.point = 0;
      }      
    }

    paint.mouseReleased = function () {
      setTimeout(() => {

        if (pauseBool === false) {

        } else {
          pauseBool = true;
          console.log('pausebool');
        }
       
      }, 1000);
    }
  };

  let canvasContainer = document.createElement('div');
  canvasContainer.id = 'canvas-Container';
  document.getElementById('paint-Container').appendChild(canvasContainer);

  return new p5(drawingsketch, window.document.getElementById('canvas-Container'));

};



function buttonPressed(subject) {

  // // 1st canvas
  // let myCanvas = createCanvas(500, 500);
  // myCanvas.parent('drawing-container');

  let hero = subject;

  //convert to lowercase
  let heroLower = hero.toLowerCase();

  //first animal illustration
  currIllustration.push(heroLower);

  console.log(currIllustration);
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

  let currIllustrationArr = [];
  currIllustrationArr.push(currIllustration);
  // add the sketch to the page
  setTimeout(() => {
    loadASketch(currIllustrationArr[0]);
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

  globalCanv = addACanvas();

  // change writing prompt to somthing
  const textPrompt = document.getElementById('recordedText');
  textPrompt.placeholder = 'What kind of story would you like to read today?';

  const textPromptEg = document.getElementById('recordedText-eg');
  textPromptEg.innerHTML = 'For example, try asking for a story about a sheep...';


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
    const section = document.getElementById(`book`);

    elm.remove();
    section.remove();
  }, 2400);
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

      let currIllustrationArr = [];

      for (let index = 0; index < similaritiesArray.length; index++) {
        currIllustrationObject = {
          class: similaritiesArray[index].class,
          word: similaritiesArray[index].word
        }
        currIllustrationArr.push(currIllustrationObject);
      }

      return currIllustrationArr;
      //add that sketch class to the document
    }
  }
}


