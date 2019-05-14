console.log('🔨 Utilities');

// ------> Utils

// resize canvas
const originalResize = (evt) => {

  canvasWidth = document.getElementById('drawing-container').offsetWidth;
  canvasHeight = document.getElementById('drawing-container').offsetHeight;
};


(() => {
  resizeTaskId = null;

  window.addEventListener('resize', evt => {
    if (resizeTaskId !== null) {
      clearTimeout(resizeTaskId);
    }

    resizeTaskId = setTimeout(() => {
      resizeTaskId = null;
      originalResize(evt);
    }, 100);
  });
})();

function enrichSketchClass(theSentance) {

  let enrichClass;
  // get theSentance to lower case
  let sentance = theSentance.toLowerCase();

  // split sentence to array
  let sentenceToArray = sentance.split(' ');

  // create new array called similarityArray
  let newSimilaritiesArray = [];

  // for all the words in that new sentence
  for (let i = 0; i < sentenceToArray.length; i++) {

    // if a word in the class apears inside the sentence
    if (squirrelArr.indexOf(sentenceToArray[i].toLowerCase()) > -1) {

      let thisWord = sentenceToArray[i].toLowerCase();
      let squirrelObject = {
        class: 'squirrel',
        word: thisWord
      }

      newSimilaritiesArray.push(squirrelObject);
      // console.log("found a squirrel", squirrelObject);

    } else if (turtleArr.indexOf(sentenceToArray[i].toLowerCase()) > -1) {

      let thisWord = sentenceToArray[i].toLowerCase();
      let sea_turtleObject = {
        class: 'sea_turtle',
        word: thisWord
      }

      // console.log("found a turtle", sea_turtleObject);
      newSimilaritiesArray.push(sea_turtleObject);
    } else if (basketArr.indexOf(sentenceToArray[i].toLowerCase()) > -1) {

      let thisWord = sentenceToArray[i].toLowerCase();

      let basketObject = {
        class: '',
        word: thisWord
      }

      // console.log("found a basket", basketObject);
      newSimilaritiesArray.push(basketObject);

    } else if (spiderArr.indexOf(sentenceToArray[i].toLowerCase()) > -1) {

      let thisWord = sentenceToArray[i].toLowerCase();

      let spiderObject = {
        class: '',
        word: thisWord
      }

      // console.log("found a spider", spiderObject);
      newSimilaritiesArray.push(spiderObject);

    } else if (rabitArr.indexOf(sentenceToArray[i].toLowerCase()) > -1) {

      let thisWord = sentenceToArray[i].toLowerCase();

      let rabitObject = {
        class: '',
        word: thisWord
      }

      // console.log("found a spider", spiderObject);
      newSimilaritiesArray.push(rabitObject);

    } else if (sheepArr.indexOf(sentenceToArray[i].toLowerCase()) > -1) {

      let thisWord = sentenceToArray[i].toLowerCase();

      let sheepObject = {
        class: 'sheep',
        word: thisWord
      }

      // console.log("found a sheep", sheepObject);
      newSimilaritiesArray.push(sheepObject);

    } else if (dogArr.indexOf(sentenceToArray[i].toLowerCase()) > -1) {

      let thisWord = sentenceToArray[i].toLowerCase();

      let dogObject = {
        class: 'dog',
        word: thisWord
      }

      // console.log("found a dog", dogObject);
      newSimilaritiesArray.push(dogObject);

    } else if (mosquitoArr.indexOf(sentenceToArray[i].toLowerCase()) > -1) {

      let thisWord = sentenceToArray[i].toLowerCase();

      let mosquitoObject = {
        class: 'mosquito',
        word: thisWord
      }

      // console.log("found a mosquito", mosquitoObject);
      newSimilaritiesArray.push(mosquitoObject);

    } else if (swanArr.indexOf(sentenceToArray[i].toLowerCase()) > -1) {

      const thisWord = sentenceToArray[i].toLowerCase();

      const swanObject = {
        class: 'swan',
        word: thisWord
      }

      // console.log("found a swan", swanObject);
      newSimilaritiesArray.push(swanObject);

    } else if (birdsArr.indexOf(sentenceToArray[i].toLowerCase()) > -1) {

      const thisWord = sentenceToArray[i].toLowerCase();

      const birdObject = {
        class: 'bird',
        word: thisWord
      }

      // console.log("found a bird", birdObject);
      newSimilaritiesArray.push(birdObject);
    }
    else if (lionArr.indexOf(sentenceToArray[i].toLowerCase()) > -1) {

      let thisWord = sentenceToArray[i].toLowerCase();

      let lionObject = {
        class: 'lion',
        word: thisWord
      }

      // console.log("found a lion", lionObject);
      newSimilaritiesArray.push(lionObject);
    }
    else if (owlArr.indexOf(sentenceToArray[i].toLowerCase()) > -1) {

      let thisWord = sentenceToArray[i].toLowerCase();

      let owlObject = {
        class: 'owl',
        word: thisWord
      }

      // console.log("found a owl", owlObject);
      newSimilaritiesArray.push(owlObject);
    }
    else if (catArr.indexOf(sentenceToArray[i].toLowerCase()) > -1) {

      let thisWord = sentenceToArray[i].toLowerCase();

      let catObject = {
        class: 'cat',
        word: thisWord
      }
      // console.log("found a cat", catObject);
      newSimilaritiesArray.push(catObject);
    }
    else if (frogArr.indexOf(sentenceToArray[i].toLowerCase()) > -1) {

      let thisWord = sentenceToArray[i].toLowerCase();

      let frogObject = {
        class: 'frog',
        word: thisWord
      }

      // console.log("found a frog", frogObject);
      newSimilaritiesArray.push(frogObject);
    }

    else if (skullArr.indexOf(sentenceToArray[i].toLowerCase()) > -1) {

      let thisWord = sentenceToArray[i].toLowerCase();

      let skullObject = {
        class: 'skull',
        word: thisWord
      }

      // console.log("found a frog", frogObject);
      newSimilaritiesArray.push(skullObject);
    }

    else if (sandwichArr.indexOf(sentenceToArray[i].toLowerCase()) > -1) {

      let thisWord = sentenceToArray[i].toLowerCase();

      let sandwichObject = {
        class: 'sandwich',
        word: thisWord
      }

      // console.log("found a frog", frogObject);
      newSimilaritiesArray.push(sandwichObject);
    }
    else if (whaleArr.indexOf(sentenceToArray[i].toLowerCase()) > -1) {

      let thisWord = sentenceToArray[i].toLowerCase();

      let whaleObject = {
        class: 'whale',
        word: thisWord
      }

      // console.log("found a frog", frogObject);
      newSimilaritiesArray.push(whaleObject);
    }
    else if (barnArr.indexOf(sentenceToArray[i].toLowerCase()) > -1) {

      let thisWord = sentenceToArray[i].toLowerCase();

      let barnObject = {
        class: 'barn',
        word: thisWord
      }

      // console.log("found a frog", frogObject);
      newSimilaritiesArray.push(barnObject);
    }
    else if (palm_treeArr.indexOf(sentenceToArray[i].toLowerCase()) > -1) {

      let thisWord = sentenceToArray[i].toLowerCase();

      let palmObject = {
        class: 'palm_tree',
        word: thisWord
      }

      // console.log("found a frog", frogObject);
      newSimilaritiesArray.push(palmObject);
    }

    else {


      // didnt find any words do nothing
      // console.log("didnt find anything");
    }
  }
  // console.log('newSimilaritiesArray', newSimilaritiesArray)
  return newSimilaritiesArray;
}



///convert daim to note
function convertDiamToNoteMajor(locationY) {

  let newlocationY = clamp(locationY, -60, 60)

  let sketchNotationArray = [];
  let note;
  switch (Math.floor(convertRange(newlocationY, [-60, 60], [-1, 15]))) {
    case -1:
      note = 0;
      break;
    case 0:
      note = 0;
      break;
    case 1:
      note = 246.94;
      break;
    case 2:
      note = 277.183;
      break;
    case 3:
      note = 311.127;
      break;
    case 4:
      note = 329.63;
      break;
    case 5:
      note = 369.99;
      break;
    case 6:
      note = 415.305;
      break;
    case 7:
      note = 466.1638;
      break;
    case 8:
      note = 493.8833;
      break;
    case 9:
      note = 554.3653;
      break;
    case 10:
      note = 622.254;
      break;
    case 11:
      note = 659.2551;
      break;
    case 12:
      note = 739.9888;
      break;
    case 13:
      note = 830.6094;
      break;
    case 14:
      note = 932.3275;
      break;
    case 15:
      note = 987.7666;
  }
  return note;
}


function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

function convertDiamToNoteMinor(locationY) {

  let newlocationY = clamp(locationY, -60, 60)

  let sketchNotationArray = [];
  let note;
  switch (Math.floor(convertRange(newlocationY, [-60, 60], [-1, 15]))) {
    case -1:
      note = 0;
      break;
    case 0:
      note = 0;
      break;
    case 1:
      note = 246.94;
      break;
    case 2:
      note = 277.183;
      break;
    case 3:
      note = 293.665;
      break;
    case 4:
      note = 329.63;
      break;
    case 5:
      note = 369.99;
      break;
    case 6:
      note = 391.995;
      break;
    case 7:
      note = 440.0000;
      break;
    case 8:
      note = 493.8833;
      break;
    case 9:
      note = 554.3653;
      break;
    case 10:
      note = 587.3295;
      break;
    case 11:
      note = 659.2551;
      break;
    case 12:
      note = 739.9888;
      break;
    case 13:
      note = 783.9909;
      break;
    case 14:
      note = 880.0000;
      break;
    case 15:
      note = 987.7666;
  }
  return note;
}



function noteLength(locationX) {

  let noteLength;
  let note;
  let newlocationX = clamp(locationX, -60, 60)

  switch (Math.floor(convertRange(newlocationX, [-60, 60], [-1, 22]))) {
    case 0:
      noteLength = "4n";
      break;
    case 1:
      noteLength = "4n";
      break;
    case 2:
      noteLength = "5n";
      break;
    case 3:
      noteLength = "5n";
      break;
    case 4:
      noteLength = "6n";
      break;
    case 5:
      noteLength = "6n";
      break;
    case 6:
      noteLength = "8n";
      break;
    case 7:
      noteLength = "8n";
      break;
    case 8:
      noteLength = "8n";
      break;
    case 9:
      noteLength = "8n";
      break;
    case 10:
      noteLength = "10n";
      break;
    case 11:
      noteLength = "10n";
      break;
    case 12:
      noteLength = "10n";
      break;
    case 13:
      noteLength = "12n";
      break;
    case 14:
      noteLength = '12n';
      break;
    case 15:
      noteLength = "12n";
      break;
    case 16:
      noteLength = "12n";
      break;
    case 17:
      noteLength = "14n";
      break;
    case 18:
      noteLength = "14n";
      break;
    case 19:
      noteLength = "14n";
      break;
    case 20:
      noteLength = "16n";
      break;
    case 21:
      noteLength = "16n";
      break;
    case 22:
      noteLength = "18n";

  }
  // console.log("here",noteLength, locationX);
  return noteLength;
}




function fadeout(element) {
  var op = 1;  // initial opacity
  var timer = setInterval(function () {
    if (op <= 0.001) {
      clearInterval(timer);
      element.style.display = 'none';
    }
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    op -= op * 0.4;
  }, 20);
}



function slowFadeOut(element) {
  var op = 1;  // initial opacity
  var timer = setInterval(function () {
    if (op <= 0.001) {
      clearInterval(timer);
      element.style.display = 'none';
    }
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    op -= op * 0.25;
  }, 20);
}

function fadeoutandDelete(element) {
  let op = 1;  // initial opacity
  let timer = setInterval(function () {
    if (op <= 0.001) {
      clearInterval(timer);
      element.style.display = 'none';
      element.remove();
    }
    if (element != null) {
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op -= op * 0.4;
    }

  }, 20);
}

function fadeoutandDeletecurrOpacity(element, objectID) {

  let op = document.getElementById(objectID).style.opacity;
  let timer = setInterval(function () {
    if (op <= 0.001) {
      clearInterval(timer);
      element.style.display = 'none';
      element.remove();
    }
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    op -= op * 0.1;
  }, 20);
}


function dimElement(element) {
  var op = 1;  // initial opacity
  var timer = setInterval(function () {
    if (op <= 0.2) {
      clearInterval(timer);
      // element.style.display = 'none';
    }
    // element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    op -= op * 0.4;
  }, 20);
}


function fadein(element) {
  let op = 0.1;  // initial opacity
  element.style.display = 'block';
  let timer = setInterval(function () {
    if (op >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    op += op * 0.1;
  }, 10);
}



function fastFadein(element) {
  let op = 0.1;  // initial opacity
  element.style.display = 'block';
  let timer = setInterval(function () {
    if (op >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    op += op * 0.5;
  }, 10);
}

function fadeinButton(element) {
  var op = 0.01;  // initial opacity
  element.style.display = 'inline-block';
  var timer = setInterval(function () {
    if (op >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    op += op * 0.08;
  }, 10);
}



function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function playNote1(time, note) {
  if (note != undefined) {
    synthOne.triggerAttackRelease(note, time);
  }
}


function playNote2(time, note) {
  if (note != undefined) {
    synthTwo.triggerAttackRelease(note, time);
  }
}


function playNoteStart(time, note) {
  if (note != undefined) {
    synthStart.triggerAttackRelease(note, time);
  }
}



let synthOne = createSyntOnehWithEffects();
let synthTwo = createSyntTwohWithEffects();
let synthStart = createSyntStarthWithEffects();



function createSyntOnehWithEffects() {
  let vol = new Tone.Volume(-20).toMaster();

  let reverb = new Tone.Freeverb(0.02).connect(vol);
  reverb.wet.value = 0.02;

  let delay = new Tone.FeedbackDelay(0.304, 0.05).connect(reverb);
  delay.wet.value = 0.02;

  let vibrato = new Tone.Vibrato(5, 0.01).connect(delay);

  let polySynth = new Tone.PolySynth(3, Tone.Synth, {
    "oscillator": {
      "type": "sine"
    },
    "envelope": {
      "attack": 0.03,
      "decay": 0.1,
      "sustain": 0.6,
      "release": 4.7,
    }
  });
  return polySynth.connect(vibrato);
}



function createSyntTwohWithEffects() {
  let vol = new Tone.Volume(-20).toMaster();

  let reverb = new Tone.Freeverb(0.02).connect(vol);
  reverb.wet.value = 0.02;

  let delay = new Tone.FeedbackDelay(0.304, 0.05).connect(reverb);
  delay.wet.value = 0.02;

  let vibrato = new Tone.Vibrato(5, 0.01).connect(delay);

  let polySynth = new Tone.PolySynth(3, Tone.Synth, {
    "oscillator": {
      "type": "sawtooth6"
    },
    "envelope": {
      "attack": 0.08,
      "decay": 0.9,
      "sustain": 0.6,
      "release": 9.7,
    }
  });
  return polySynth.connect(vibrato);
}



function createSyntStarthWithEffects() {
  let vol = new Tone.Volume(-30).toMaster();

  let reverb = new Tone.Freeverb(0.2).connect(vol);
  reverb.wet.value = 0.02;

  let delay = new Tone.FeedbackDelay(0.304, 0.05).connect(reverb);
  delay.wet.value = 0.1;

  let vibrato = new Tone.Vibrato(5, 0.04).connect(delay);

  let polySynth = new Tone.PolySynth(3, Tone.Synth, {
    "oscillator": {
      "type": "sine"
    },
    "envelope": {
      "attack": 0.01,
      "decay": 0.2,
      "sustain": 0.8,
      "release": 4.7,
    }
  });
  return polySynth.connect(vibrato);
}


function addSentenceAfterbutton() {
  // delete pause play temporarry
  const playPause = document.getElementById('pause-button');
  if (playPause != undefined) {
    fadeoutandDeletecurrOpacity(playPause, 'pause-button');
  }

  // add Sentence
  // fade out current ullustration

  setTimeout(() => {
    addSentence(similarSentences[sentanceNumber], 'sentence2Vec');

  }, 400);

  //delete this button
  setTimeout(() => {
    const elm = document.getElementById('one-more-sentence');
    const fadeOutIllustration = document.getElementById(`drawing${sentanceNumber}`);
    if (elm != undefined) {
      fadeoutandDelete(elm);
    }

    if (fadeOutIllustration != undefined) {
      slowFadeOut(fadeOutIllustration);
    }
  }, 100);
}


function convertRange(value, r1, r2) {
  return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
}


function endStory() {

  const moralDiv = document.createElement("div");
  moralDiv.id = `paragraph${sentanceNumber + 1}`;
  moralDiv.style.background = "white";
  moralDiv.style.opacity = 0;
  moralDiv.style.filter = 'alpha(opacity=' + 0 * 0 + ")";
  moralDiv.style.paddingBottom = "0px";


  const moralpara = document.createElement("p");
  moralpara.classList.add("moral");
  const moralnode = document.createTextNode('--' + moralArr[0]);
  moralpara.appendChild(moralnode);
  document.getElementById(`paragraph${sentanceNumber}`).appendChild(moralDiv).appendChild(moralpara);

  const fadeinElementmoral = document.getElementById(`paragraph${sentanceNumber + 1}`);

  //fade the sentence into the page.
  setTimeout(() => {
    fadein(fadeinElementmoral);
  }, 1200);




  const div = document.createElement("div");
  div.id = `paragraph${sentanceNumber + 2}`;
  div.style.background = "white";
  div.style.opacity = 0;
  div.style.filter = 'alpha(opacity=' + 0 * 0 + ")";
  div.style.paddingBottom = "0px";

  const para = document.createElement("p");
  para.classList.add("voice");
  const node = document.createTextNode("The End.");
  para.appendChild(node);
  document.getElementById(`paragraph${sentanceNumber}`).appendChild(div).appendChild(para);



  const fadeinElement = document.getElementById(`paragraph${sentanceNumber + 2}`);

  //fade the sentence into the page.
  setTimeout(() => {
    fadein(fadeinElement);
  }, 2200);

  setTimeout(() => {
    addOneMoreButton();
  }, 4000);
}


function identifyAnimalsIntent(theSentance) {

  //get theSentance to lower case
  const sentance = theSentance.toLowerCase();

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

  // for all the words in that new sentence
  for (let i = 0; i < sentenceToArray.length; i++) {

    // if a word in the class apears inside the sentence
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

// get input of textbox

function getInputText() {

  // clear the canvas
  globalCanv.clear();

  const promptText = document.getElementById('recordedText').value;
  // console.log('promptText',promptText);
  currPrompt = promptText;
  // speechToPrompt(promptText);
  // send seed to universal sentence encoder

  let startStory = new Promise(function (resolve, reject) {
    const div = document.createElement('div');
    div.id = 'loadingAnimation';
    div.style.opacity = '0.0'
    div.classList.add("loading-animation");
    let loadingImage = new Image(180, 130);
    loadingImage.src = './images/turn_page.gif';

    const paragraph = document.createElement('p');
    paragraph.classList.add('loading-text');
    paragraph.innerHTML = 'Turning some pages...'

    document.getElementById('left').appendChild(div).appendChild(loadingImage);
    document.getElementById('loadingAnimation').appendChild(paragraph);

    let element = document.getElementById('loadingAnimation');
    fadein(element);

    setTimeout(() => {
      let element = document.getElementById('loadingAnimation');
      fadeoutandDelete(element);
      resolve(promptText);
    }, 4000);

    setTimeout(() => {
      // console.log('dissolve text');
      // let fadeoutComponent1 = document.getElementById('characterOne');
      const fadeoutComponent2 = document.getElementById('recordedText');
      const fadeoutComponent3 = document.getElementById('recordedText-eg');
      // fadeout(fadeoutComponent1);
      fadeout(fadeoutComponent2);
      fadeout(fadeoutComponent3);
    }, 300);

  });

  startStory.then(function (value) {
    // console.log('resolve', value);
    sendtoSentenceEncoder(promptText);
  });
}

function sendtoSentenceEncoder(text) {
  let textToEmbed = [];
  textToEmbed.push(text)
  console.log(textToEmbed);
  socket.emit('sentenceToEmbed', { 'setenceToEmbed': textToEmbed, 'roomNumber': sessionNumber });

}

function addLoadingAnimation(elementId) {

  storyCurrentlyRunning = false;

  const div = document.createElement('div');
  div.id = 'loadingAnimation';
  div.style.opacity = '0.0';
  if (sentanceNumber > 1) {
    div.classList.add("loading-animation-prompt");
  } else {
    div.classList.add("loading-animation");
  }
  let loadingImage = new Image(180, 130);
  loadingImage.src = './images/turn_page.gif';

  const paragraph = document.createElement('p');
  paragraph.classList.add('loading-text');
  paragraph.innerHTML = 'turning some pages...'

  document.getElementById(elementId).appendChild(div).appendChild(loadingImage);
  document.getElementById('loadingAnimation').appendChild(paragraph);

  const fadeInElement = document.getElementById('loadingAnimation');
  fadein(fadeInElement);
}

let last_known_scroll_position = 0;
let ticking = false;

function checkVisibillity(scroll_pos) {
  for (let i = 0; i < contentContainerArr.length; i++) {
    const isvisableCurrently = elementInViewport2(contentContainerArr[i].object);
    contentContainerArr[i].isVisible = isvisableCurrently;
  }
  currentIllustrationState(contentContainerArr);
}

window.addEventListener('scroll', function (e) {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function () {
      // checkVisibillity(last_known_scroll_position);
      ticking = false;
    });

    ticking = true;
  }
});

function elementInViewport2(el) {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  let width = el.offsetWidth;
  let height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}

function currentIllustrationState(objectArr) {
  // console.log(objectArr);
  for (let index = 0; index < objectArr.length; index++) {
    const element = objectArr[index];
    // console.log(element.isVisible);

    if (element.isVisible) {
      for (let index = 0; index < objectArr.length; index++) {
        const canvasElement = document.getElementById(`drawing${index}`);
        if (canvasElement) {
          if (canvasElement.style.display !== 'none') {
            // canvasElement.style.display = 'none';
            slowFadeOut(canvasElement);
            // console.log(`turn off ${index}`);
          }
        }
      }
      let currVisIndex = index + 1;
      const visableElement = document.getElementById(`drawing${currVisIndex}`);
      if (visableElement) {
        if (visableElement.style.display !== 'block') {
          setTimeout(() => {
            fadein(visableElement);
            // console.log(`fadein ${currVisIndex}`);
          }, 400);
        }
      }
    }
  }
}


// Setup isScrolling variable
let isScrolling;

// Listen for scroll events
window.addEventListener('scroll', function (event) {

  // Clear our timeout throughout the scroll
  window.clearTimeout(isScrolling);

  // Set a timeout to run after scrolling ends
  isScrolling = setTimeout(function () {

    // Run the callback
    // console.log( 'Scrolling has stopped.' );
    checkVisibillity(last_known_scroll_position);

  }, 400);

}, false);


function recieveLineSendStory(line) {

  // console.log('line', line);

  const storyLine = line[0];
  let vectoredStory = [];
  let lineIndex;

  // run through all the sentences in the json file.
  for (let key in fablesJson.stories) {

    for (let i = 0; i < fablesJson.stories[key].story.length; i++) {
      if (storyLine === fablesJson.stories[key].story[i]) {
        lineIndex = i;
        vectoredStory = fablesJson.stories[key].story;
      }
    }
  }


  let sendNextLine = vectoredStory[lineIndex + 1];
  // console.log('👌 Send next vectored line -->', sendNextLine);

  if (sendNextLine != undefined) {
    setTimeout(() => {
      socket.emit('sendNextSentance', { 'randomSentance': sendNextLine, 'originalStory': vectoredStory, 'roomNumber': sessionNumber });
    }, 1000);

  } else {
    // console.log('🖐 end -->' , line);
    socket.emit('getSimilarSentence', { 'randomSentance': line, 'originalStory': vectoredStory, 'roomNumber': sessionNumber });

  }
  // send the next line for nearest neighbour
}



function footerInsert() {

  const timelineItem = document.createElement('div');
  timelineItem.classList.add('timeline__item');
  timelineItem.id = `timelineItem__${sentanceNumber}`
  timelineItem.style.width = `${100 / maxSentences}%`;


  const timelineCard = document.createElement('div');
  timelineCard.classList.add('timeline__card');

  const timelineProgressBar = document.createElement('div');
  timelineProgressBar.id = `footer-progress2${sentanceNumber}`;


  // //create loder element
  const progressDiv = document.createElement('div');
  progressDiv.id = `one-more-sentence-loader${sentanceNumber}`;
  progressDiv.classList.add('progress-moved');

  // 
  const progress = document.createElement('div');
  progress.id = 'progress';
  progress.classList.add('progress-bar2');


  document.getElementById('timeline-container').appendChild(timelineItem)
    .appendChild(timelineCard).appendChild(timelineProgressBar).appendChild(progressDiv).appendChild(progress);
  // document.getElementById(`footer-progress${sentanceNumber}`).appendChild(progressDiv).appendChild(progress);
}




// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }


function checkDivHeight(divId) {
  const divHeight = document.getElementById(divId).offsetHeight;
  return divHeight;
}

function checkDivPosition(divId) {
  const divHeight = document.getElementById(divId).offsetTop;;
  return divHeight;
}



function mouseMove(e) {
  var x = e.clientX;
  var y = e.clientY;
  var coor = "Coordinates: (" + x + "," + y + ")";
  console.log(coor);
}




let point = 0;

function drawIng(jsonDrawing) {
  setTimeout(() => {

    if (point < drawing.length) {

      line(jsonDrawing[point].tX, jsonDrawing[point].tY, jsonDrawing[point].pX, jsonDrawing[point].pY);
      point++;
      console.log(point)
      drawIng();
    }
  }, 120);
}


function invertColor(hexTripletColor) {
  let color = hexTripletColor;
  color = color.substring(1); // remove #
  color = parseInt(color, 16); // convert to integer
  color = 0xFFFFFF ^ color; // invert three bytes
  color = color.toString(16); // convert to hex
  color = ("000000" + color).slice(-6); // pad with leading zeros
  color = "#" + color; // prepend #
  return color;
}


function LightenDarkenColor(col, amt) {

  let usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  let num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);

}


function hexToComplimentary(hex) {

  // Convert hex to rgb
  // Credit to Denis http://stackoverflow.com/a/36253499/4939630
  var rgb = 'rgb(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length / 3 + '})', 'g')).map(function (l) { return parseInt(hex.length % 2 ? l + l : l, 16); }).join(',') + ')';

  // Get array of RGB values
  rgb = rgb.replace(/[^\d,]/g, '').split(',');

  var r = rgb[0], g = rgb[1], b = rgb[2];

  // Convert RGB to HSL
  // Adapted from answer by 0x000f http://stackoverflow.com/a/34946092/4939630
  r /= 255.0;
  g /= 255.0;
  b /= 255.0;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2.0;

  if (max == min) {
    h = s = 0;  //achromatic
  } else {
    var d = max - min;
    s = (l > 0.5 ? d / (2.0 - max - min) : d / (max + min));

    if (max == r && g >= b) {
      h = 1.0472 * (g - b) / d;
    } else if (max == r && g < b) {
      h = 1.0472 * (g - b) / d + 6.2832;
    } else if (max == g) {
      h = 1.0472 * (b - r) / d + 2.0944;
    } else if (max == b) {
      h = 1.0472 * (r - g) / d + 4.1888;
    }
  }

  h = h / 6.2832 * 360.0 + 0;

  // Shift hue to opposite side of wheel and convert to [0-1] value
  h += 180;
  if (h > 360) { h -= 360; }
  h /= 360;

  // Convert h s and l values into r g and b values
  // Adapted from answer by Mohsen http://stackoverflow.com/a/9493060/4939630
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);

  // Convert r b and g values to hex
  rgb = b | (g << 8) | (r << 16);
  return "#" + (0x1000000 | rgb).toString(16).substring(1);
}



function sendNewPrompt(Prompt) {

  // pause the story

  // add line to story


  // clear continue reading

  const promptToRemove = document.getElementById(`one-more-prompt${sentanceNumber}`);
  const buttonToRemove = document.getElementById('one-more-sentence-div');
  fadeoutandDelete(buttonToRemove);

  setTimeout(() => {
    fadeoutandDelete(promptToRemove);
  }, 200);

  // add loading animation
  setTimeout(() => {
    addReaderPromptToPage(Prompt);
  }, 700);


  setTimeout(() => {
    const element = `paragraph${sentanceNumber}`;
    addLoadingAnimation(element);

  }, 800);

  setTimeout(() => {
    const elm = document.getElementById('loadingAnimation');
    elm.scrollIntoView({ behavior: 'smooth', block: 'start' });

  }, 1000);



  // wait for data to come in
  let CurrSentance = sentanceNumber;
  let storyArr = similarSentences;

  socket.emit('sendNewPrompt', { 'currSentence': CurrSentance, 'currStory': storyArr, 'newPrompt': Prompt, 'roomNumber': sessionNumber });

}


function addReaderPromptToPage(text) {

  // add prompt here

  const readerDiv = document.createElement('div');
  readerDiv.classList.add('readerPrompts-container');


  const span = document.createElement('span');
  span.classList.add('readerPrompts');
  span.style.opacity = '0.0';
  span.innerHTML = '"' + text + '"';
  readerDiv.appendChild(span);

  const container = document.getElementById(`paragraph${sentanceNumber}`);

  container.insertBefore(readerDiv, container.childNodes[2]);

  fadein(span);
}



function runjsonCheckNewPrompt(json, sentenceArr) {

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

  // // story Start Bool
  // storyCurrentlyRunning = true;

  // maxSentences = thisStoryArray.length - 1;

  // console.log(thisStoryArray);
  socket.emit('sendNewStoryFromPrompt', { 'randomSentance': randomSentance, 'originalStory': thisStoryArray, 'roomNumber': sessionNumber });

  // add the sentance to the page
  // addSentence(thisStoryArray[0], 'notnet');
}




function addNewContentAfterPressed() {

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



function addTutorial() {
  // draw a thing to the canvas
  const startPositionY = 30;
  const startPositionX = canvasWidth / 6;

  let additionalDrawing;
  let randomDrawing = Math.floor((Math.random() * beginStoryArr.length));
  let url = `./images/vector_illustrations/begin_story/${beginStoryArr[randomDrawing]}`;
  // console.log(url);

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      additionalDrawing = myJson;
      // console.log(JSON.stringify(myJson));
      globalCanv.startNewDrawing(true, additionalDrawing, startPositionY, startPositionX);
    });
}