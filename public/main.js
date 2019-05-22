console.log('📕 Main');

let drawingNumber = 0;
let storyCurrentlyRunning = false;
let sentanceNumber = 0;
let currColor = 0;
let mesh;
let targetMesh;
let phase = 4;
let aOrAn = [];
let sessionNumber = 0;
let compromiseResult = [];
let currPrompt = '';
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

let audioStartSound;
let audioEndSound;

let moralArr = [];

let storyBegan = false;

let colorArray = [];
let secondColorArray = [];

let sketchillustrationArr;

let globalCanv;

// global bool for when its paused
let pauseBool = true;

let secondColor;

let sentencesFromEncodingSeed = []

let prevMouseY;
let prevMouseX;

let drawingsketch;

let buttonTimer;
let speakBool = true;
let startButtonPressed = false;

let penStrokes = 0;

let storyMethod = {
  snakesAndLadders: 'false',
  similarSentences: 'false',
  similarStory: 'true',
  originalStory: 'false'
};

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

let vecIllustrations = ['begin_a_new_story.json', 'home_01.json', 'asfe02.json', 'bird01.json', 'asfe04.json', 'asfe_rat.json', 'crystal.json', 'dr-cat.json', 'ears.json', 'home.json', 'idea.json', 'jupiter.json', 'Jupiter1.json', 'kingoftortoise.json',
  'maya01.json', 'maya02.json', 'maya03.json', 'maya04.json', 'maya05.json', 'maya06.json', 'maya07.json', 'maya08.json', 'maya09.json', 'maya10.json',
  'maya11.json', 'maya12.json', 'maya13.json', 'maya15.json', 'mother.json', 'music.json', 'music1.json', 'raven.json', 'tortoise.json', 'wind.json'];



let beginStoryArr = ['begin_a_new_story1.json', 'begin_a_new_story2.json', 'begin_a_new_story3.json', 'begin_a_new_story4.json', 'begin_a_new_story5.json']
let vectoredStory = [];


let canvasWidth;
let canvasHeight;
let drawingRatio = 1.3;

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

const birdsArr = ["jackdaw", "lark", "wing", "wings", "cock", "cocks", "eagle", "crow", "crows", "swallow", "raven", "swallow", "kite", "lark", "birds", "chicken", "chickens", "stork"];
const swanArr = ["crane", "cranes", "goose", "ducks", "peacock", "peacocks", "heron", "herons", "stork"];
const mosquitoArr = ["gnat", "grasshopper", "grasshoppers", "flies", "wasps", "hornet"];
const dogArr = ["goat", "ass", "ass's", "oxen", "hounds", "hound", "goats", "wolf", "leopard", "fox", "dogs", "boar", "weasels", "weasel"];
const sheepArr = ["lamb", "flock"];
const spiderArr = ["beetle"];
const basketArr = ["pail"];
const turtleArr = ["tortoise", "tortoises"];
const squirrelArr = ["mice", "hare", "mouse", "chipmunk", "chipmunks"];
const lionArr = ["lion's"];
const catArr = ["tiger", "tiger's", "tigers", "cats"];
const owlArr = ["owl's", "bat", "bats"];
const frogArr = ['frogs', "frog's", "toad"];
const rabitArr = ["mice", 'hare'];
const skullArr = ["dead", "death", "kill", "died", "die"];
const sandwichArr = ["food", "eat", "meal"];
const whaleArr = ["fish"];
const barnArr = ["house", "hut"];
const palm_treeArr = ["woods", "tree", "forest"];

init();

function modelReady() {
  // document.getElementById('status').innerHTML = 'Model Loaded';
  console.log("model loaded");
}



function init() {

  browserQuery();

  sessionNumber = `room${Math.floor(Math.random() * 9999) + 10000}`;
  socket.emit('roomEntered', sessionNumber);
  getSpeech();
  sketchColor = getRandomColor();
  secondColor = LightenDarkenColor(sketchColor, 40);

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

  audioStartSound = new Audio('./images/audioStartSound.mp3');
  audioEndSound = new Audio('./images/audioEndSound.mp3');

}

window.onload = function () {

};


function loadJsonfile() {
  // console.log("loadjson");
  return fetch('/aesopFables-lite.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      // console.log(myJson);
      fablesJson = myJson;
    });
}


// incoming Socket for similar story 
socket.on('similarStory', function (result) {
  if (storyMethod.similarStory === 'true') {
    for (let index = 0; index < result.sentiment.sentences.length; index++) {
      similarSentences.push(result.sentiment.sentences[index]);
      sentimentContainer.push(result.sentiment.sentiment[index]);
      compromiseResult.push(result.sentiment.compromise[index])
    }
  }
  maxSentences = similarSentences.length - 1;

  // remove loading animation
  let element = document.getElementById('loadingAnimation');
  fadeoutandDelete(element);

  storyCurrentlyRunning = true;
  storyBegan = true;

  // begin the story
  setTimeout(() => {
    initiateStory(currPrompt, similarSentences);
    addSentence(similarSentences[0], 'notnet');
  }, 400);


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


socket.on('restOfStory', function (result) {

  const newArr = result.sentiment.sentences;
  similarSentences.length = sentanceNumber;

  const ConcatArray = similarSentences.concat(newArr)

  similarSentences = [];

  // replace array with new Array.
  similarSentences = ConcatArray;

  // remove the loading animation now!
  setTimeout(() => {

    //remove animation 
    let element = document.getElementById('loadingAnimation');
    fadeoutandDelete(element);

    storyCurrentlyRunning = true;
  }, 2000);

  setTimeout(() => {
    // add content to the page
    addNewContentAfterPressed();
  }, 2400);

  // make sure everything is completed before  ---> addinfg a new sentence.

});


// get the new seed response
socket.on('NewSeedResult', function (result) {
  insertNewSeed(result);
});


// get results back from embedings
socket.on('sentenceToEmbedResults', function (result) {
  sentencesFromEncodingSeed = result;
  runjsonCheckEmbedding(fablesJson, sentencesFromEncodingSeed);

});

// get results back from prompt embedings
socket.on('promptEmbedResults', function (result) {

  let resultArr = result
  runjsonCheckNewPrompt(fablesJson, resultArr);
});



socket.on('StoryMoral', function (result) {
  // moral of the story
  moralArr = result.morals;
});

function runjsonCheckEmbedding(json, sentenceArr) {

  // get sentece from universal sentence encoder
  const randomSentance = sentenceArr.sentences[1];
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

  // console.log(thisStoryArray);
  socket.emit('sendSeedSentance', { 'randomSentance': randomSentance, 'originalStory': thisStoryArray, 'roomNumber': sessionNumber });
}


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

  // get sentece from universal sentence encoder

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
  // console.log(thisStoryArray);
  socket.emit('sendSeedSentance', { 'animal': checkword, 'randomSentance': randomSentance, 'originalStory': thisStoryArray, 'roomNumber': sessionNumber });

}

async function addSentence(result, source) {

  // if app is not paused
  if (storyCurrentlyRunning) {

    //  if the current sentence is smaller than the entire length of the story
    if (sentanceNumber <= maxSentences) {
      //  increase sentence number
      sentanceNumber++;

      socket.emit('getStoryMoral', { 'currStory': similarSentences, 'roomNumber': sessionNumber });

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
        secondColor = LightenDarkenColor(sketchColor, 90);


        //  run check to see if there is an illustration that fits here
        const thisClassObject = ifInClass(result);
        const thisClass = [];

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
                wordSpan.style.color = colorArray[index];
                // console.log('highlight word ', thisClassObject[index].word);
              }
            }
          }

          // add all spans to paragraph
          paragraph.appendChild(wordSpan);
        }

        const paragraphNumber = document.createElement('div');
        paragraphNumber.classList.add('currnet-paragraph');
        paragraphNumber.id = `paragraphNumber${sentanceNumber}`;
        paragraphNumber.innerHTML = `${sentanceNumber} / ${maxSentences + 1}`


        document.getElementById('story').appendChild(container).appendChild(div).appendChild(paragraphNumber);
        document.getElementById('story').appendChild(container).appendChild(div).appendChild(paragraph);

        // create an object to push to array
        let containerObject = {
          "object": paragraphNumber,
          "isVisible": ''
        };

        // push object to array
        contentContainerArr.push(containerObject);

        setTimeout(() => {
          // scroll into the sentence
          const elm = document.getElementById(`content-container${sentanceNumber}`);
          elm.scrollIntoView({ behavior: 'smooth', block: 'center' });

          // fade the sentence into the page.
          const fadeinElement = document.getElementById(`paragraph${sentanceNumber}`);
          fadein(fadeinElement);

          // calculate Ysize of story element

          if (sentanceNumber > 1) {
            globalCanv = addACanvas(viewportHeight - 100);
          }

        }, 700);

        // run sentence enrichment

        if (sentanceNumber) {

          // add illustration to the page
          if ((thisClass !== undefined) && (thisClass.length >= 1)) {

            if (thisClass[0]) {
              // console.log('first drawing', thisClass[0]);
              await loadASketch(thisClass);
            }

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
      //   if (sentanceNumber % 2 == 0) {
      //     // const startPositionY = checkDivPosition(`paragraph${sentanceNumber}`) + 200;
      //     const startPositionY = 50;
      //     const startPositionX = canvasWidth - canvasHeight / 3;
      //     // const additionalDrawing = sun;

      //     let additionalDrawing;
      //     let randomDrawing = Math.floor((Math.random() * vecIllustrations.length));
      //     let url = `./images/vector_illustrations/${vecIllustrations[randomDrawing]}`;
      //     console.log(url);

      //     fetch(url)
      //       .then(function (response) {
      //         return response.json();
      //       })
      //       .then(function (myJson) {
      //         additionalDrawing = myJson;
      //         // console.log(JSON.stringify(myJson));
      //         globalCanv.startNewDrawing(true, additionalDrawing, startPositionX, startPositionY);
      //       });


      //   } else {
      //     // const startPositionY = checkDivPosition(`paragraph${sentanceNumber}`) + 200;
      //     const startPositionX = 100;
      //     const startPositionY = 0;

      //     let additionalDrawing;
      //     let randomDrawing = Math.floor((Math.random() * vecIllustrations.length));
      //     let url = `./images/vector_illustrations/${vecIllustrations[randomDrawing]}`;

      //     console.log(url);

      //     fetch(url)
      //       .then(function (response) {
      //         return response.json();
      //       })
      //       .then(function (myJson) {
      //         additionalDrawing = myJson;
      //         // console.log();
      //         globalCanv.startNewDrawing(true, additionalDrawing, startPositionX, startPositionY);
      //       });

      //   }

      // }, 10000);

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
      }, 7000);

      // resize Canvss here.

      let newHeight = checkDivHeight('left');
      // resize canves here
      // globalCanv.resizeCanvas(canvasWidth, newHeight);

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

    // see if textbox is empty or full
    const input = document.getElementById('newPromptInput').value;
    console.log('input', input);

    if (input.length > 0) {
      // get the input text as prompt
      sendNewPrompt(input);
      // console.log('got input', input);
    } else {
      // console.log('continue straigt');
      // continue to next line
      addSentenceAfterbutton();
      // interval to 100 here
      clearInterval(buttonTimer);
      let prgsBar = document.getElementById(`one-more-sentence-loader${sentanceNumber}`);
      prgsBar.style.width = '100%';
      addedSentence = true;
      pauseBool = true;
      const playPause = document.getElementById('pause-button');
      fadeoutandDelete(playPause);
    } 
  };

  // create input for next thing:
  const inputDiv = document.createElement('div');
  inputDiv.id = `one-more-prompt${sentanceNumber}`;
  inputDiv.classList.add('wrap-one-more-prompt');

  let inputPrompt = document.createElement('form');
  inputPrompt.autocomplete = "off"
  inputPrompt.classList.add('prompt-input');

  inputPrompt.onsubmit = function () {
    let value = document.getElementById('newPromptInput').value;

    sendNewPrompt(value);
    return false;
  }


  let promptInput = document.createElement("input");
  promptInput.id = `newPromptInput`;
  promptInput.placeholder = 'What happened next? (enter key to submit)';
  promptInput.classList.add('newPromptSpan');

  // on focus clear box
  promptInput.onfocus = function () {
    // console.log('focus');
    document.getElementById('newPromptInput').placeholder = '';
    pauseBool = false;
  }

  // on focus out repopulate with text
  promptInput.onfocusout = function () {
    // console.log('focusOut');
    pauseBool = true;
    document.getElementById('newPromptInput').placeholder = 'What happened next? (enter key to submit)';
  }



  inputPrompt.appendChild(promptInput);
  inputDiv.appendChild(inputPrompt);

  const node = document.createTextNode('continue reading');
  btn.appendChild(node);

  // document.getElementById(`paragraph${sentanceNumber}`).appendChild(div)

  document.getElementById(`paragraph${sentanceNumber}`).appendChild(div).appendChild(inputDiv);
  document.getElementById('one-more-sentence').appendChild(buttonWrapper).appendChild(btn);

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
    if ((width >= 2500) && (!addedSentence)) {

      clearInterval(buttonTimer);
      addSentenceAfterbutton();

    } else {
      if (pauseBool) {
        width++;
        prgsBar.style.width = width / 25 + '%';
      }
    }
  }
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
  storyBegan = false;
  compromiseResult = [];
  moralArr = [];

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
    globalCanv = addACanvas(viewportHeight - 100);
  }, 1400);


  // setTimeout(() => {
  //   // add a random drawing to page
  //   addRandomDrawingToPage();
  // },2400)
  // reset Sentiment Arr
  similarSentences = [];


  // reset story Arr
  sentimentContainer = [];

}



function addACanvas(height) {
  drawingsketch = function (paint) {

    paint.currDrawing;
    paint.drawingOffsetY;
    paint.drawingOffsetX;

    paint.setup = function () {
      paint.createCanvas(viewportWidth, height);
      paint.point = 0;
      paint.frameRate(300);
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
        paint.drawSomthing(paint.point, paint.currDrawing, paint.drawingOffsetY);
        paint.point = paint.point + 1;
        // console.log('*** drawing ***', paint.point);
      }
    }

    paint.startNewDrawing = function (drawBool, json, offsetY, offsetX) {
      paint.currentlyDrawing = drawBool;
      paint.currDrawing = json;
      paint.drawingOffsetY = offsetY;
      paint.drawingOffsetX = offsetX;
    }

    paint.drawSomthing = function (point, jsonDrawing) {
      if (paint.point < jsonDrawing.length) {

        let randomPlay = Math.floor((Math.random() * 20) + 60)

        // if (paint.point % randomPlay == 0) {
        //   generateSounds(paint.drawingOffsetX, jsonDrawing[point].thisY)
        // }

        let randomdist = Math.floor((Math.random() * 2) + 3)
        paint.strokeWeight(1.5);
        paint.stroke(secondColor);

        setTimeout(() => {

          paint.strokeWeight(illustrationStroke - 1);
          paint.stroke(sketchColor);
          paint.line(jsonDrawing[point].thisX + paint.drawingOffsetX,
            jsonDrawing[point].thisY + paint.drawingOffsetY,
            jsonDrawing[point].prevX + paint.drawingOffsetX,
            jsonDrawing[point].prevY + paint.drawingOffsetY);

        }, 200);

        paint.line(jsonDrawing[point].thisX + paint.drawingOffsetX + randomdist,
          jsonDrawing[point].thisY + paint.drawingOffsetY + randomdist,
          jsonDrawing[point].prevX + paint.drawingOffsetX + randomdist,
          jsonDrawing[point].prevY + paint.drawingOffsetY + randomdist);

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
          // console.log('pausebool', pauseBool);
        }
      }, 1000);
    }
  };

  let canvasContainer = document.createElement('div');
  canvasContainer.id = 'canvas-Container';
  document.getElementById('paint-Container').appendChild(canvasContainer);

  return new p5(drawingsketch, window.document.getElementById('canvas-Container'));
};


function initiateStory(subject, sentenceArr) {

  let charactersInStory = [];

  for (let index = 0; index < sentenceArr.length; index++) {
    const element = sentenceArr[index];
    let thisClass = ifInClass(element);
    if (thisClass) {
      for (let index = 0; index < thisClass.length; index++) {
        const element = thisClass[index];
        // console.log(element.word);
        if (charactersInStory.includes(element.word) === false) {
          charactersInStory.push(element.word);
        }
      }
    }
  }

  const currStoryName = charactersInStory.join(', and a ');
  // let heroSearch = heroLower + ' ';

  // fade out buttons and prompt
  // setTimeout(() => {

  //   console.log('dissolve text');
  //   // let fadeoutComponent1 = document.getElementById('characterOne');
  //   const fadeoutComponent2 = document.getElementById('recordedText');
  //   const fadeoutComponent3 = document.getElementById('recordedText-eg');
  //   // fadeout(fadeoutComponent1);
  //   fadeout(fadeoutComponent2);
  //   fadeout(fadeoutComponent3);
  // }, 100);

  // create the story name
  const storyName = document.getElementById('story-name');
  const topics = [compromiseResult[Math.floor(Math.random() * compromiseResult.length)], compromiseResult[Math.floor(Math.random() * compromiseResult.length)], compromiseResult[Math.floor(Math.random() * compromiseResult.length)], compromiseResult[Math.floor(Math.random() * compromiseResult.length)]];

  let vowel = ['a', 'e', 'i', 'o', 'u'];

  for (let j = 0; j < topics.length; j++) {
    for (let index = 0; index < vowel.length; index++) {
      if (topics[j] == vowel[index]) {
        aOrAn.push('an')
      } else {
        aOrAn.push('a')
      }
    }
  }

  storyName.innerHTML = `A story about ${aOrAn[0]} ${topics[0]}, ${topics[1]} and ${aOrAn[2]} ${topics[3]}`;

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
    // runjsonCheck(fablesJson, heroSearch);
  }, 1500);
}

function buttonPressed(subject, sentenceArr) {

  let hero = subject;

  //convert to lowercase
  let heroLower = hero.toLowerCase();

  console.log('subject', subject);


  // let thisclass = ifInClass()
  let heroSearch = heroLower + ' ';

  // fade out buttons and prompt
  setTimeout(() => {

    console.log('dissolve text');
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
    // runjsonCheck(fablesJson, heroSearch);
  }, 1500);
}


function startbuttonPressed(clicked_id) {

  sketch = null;
  startStory = true;
  startButtonPressed = true;

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

  globalCanv = addACanvas(viewportHeight - 100);

  // change writing prompt to somthing
  const textPrompt = document.getElementById('recordedText');
  textPrompt.placeholder = 'What kind of story would you like to read today?';

  const textPromptEg = document.getElementById('recordedText-eg');
  textPromptEg.innerHTML = "For example: a story about a brave lion...";


  setTimeout(() => {

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


  // add a random drawing to page
  // setTimeout(() => {
  //   addTutorial();
  // },7500)
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

    for (let i = 0; i < addClasses.length; i++) {
      // console.log(`add ${addClasses[i].class} to array`);
      sentenceToArray.push({
        class: addClasses[i].class,
        word: addClasses[i].word
      });
    }


    //for all the words in that new sentence
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
        // console.log("run other enrichment");
      }
    }

    //if found words that match
    if (similaritiesArray.length > 0) {

      currIllustration = similaritiesArray[0].class;

      let currIllustrationArr = [];
      colorArray = [];
      secondColorArray = [];

      for (let index = 0; index < similaritiesArray.length; index++) {

        // add colorArray
        let thisColor = getRandomColor();
        colorArray.push(thisColor);

        let secondColor = hexToComplimentary(thisColor);
        let secondColorlighter = LightenDarkenColor(secondColor, 90);
        secondColorArray.push(secondColorlighter);

        currIllustrationObject = {
          class: similaritiesArray[index].class,
          word: similaritiesArray[index].word
        }
        currIllustrationArr.push(currIllustrationObject);
      }
      //add that sketch class to the document
      return currIllustrationArr;
    }
  }
}


