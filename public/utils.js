

///------> Utils

function enrichSketchClass(theSentance){

  let enrichClass;
  //get theSentance to lower case
  let sentance = theSentance.toLowerCase();

  //split sentence to array
  let sentenceToArray = sentance.split(" ");

  //create new array called similarityArray
  let newSimilaritiesArray = [];

  //fo all the words in that new sentence
  for (var i = 0; i < sentenceToArray.length; i++) {

    //if a word in the class apears inside the sentence
    if (squirrelArr.indexOf(sentenceToArray[i].toLowerCase()) > -1) {
      newSimilaritiesArray.push('squirrel');
      // console.log("found a squirrel");
    } else if(turtleArr.indexOf(sentenceToArray[i].toLowerCase()) > -1){
      // console.log("found a turtle");
      newSimilaritiesArray.push('sea_turtle');
    }else if(basketArr.indexOf(sentenceToArray[i].toLowerCase()) > -1){
      // console.log("found a basket");
      newSimilaritiesArray.push('basket');

    }else if(spiderArr.indexOf(sentenceToArray[i].toLowerCase()) > -1){
      // console.log("found a spider");
      newSimilaritiesArray.push('spider');

    }else if(sheepArr.indexOf(sentenceToArray[i].toLowerCase()) > -1){
      // console.log("found a sheep");
      newSimilaritiesArray.push('sheep');

    }else if(dogArr.indexOf(sentenceToArray[i].toLowerCase()) > -1){
      // console.log("found a dog");
      newSimilaritiesArray.push('dog');

    }else if(mosquitoArr.indexOf(sentenceToArray[i].toLowerCase()) > -1){
      // console.log("found a mosquito");
      newSimilaritiesArray.push('mosquito');

    }else if(swanArr.indexOf(sentenceToArray[i].toLowerCase()) > -1){
      // console.log("found a swan");
      newSimilaritiesArray.push('swan');

    }else if(birdsArr.indexOf(sentenceToArray[i].toLowerCase()) > -1){
      // console.log("found a bird");
      newSimilaritiesArray.push('bird');
    }
    else if(lionArr.indexOf(sentenceToArray[i].toLowerCase()) > -1){
      // console.log("found a lion");
      newSimilaritiesArray.push('lion');
    }
    else if(owlArr.indexOf(sentenceToArray[i].toLowerCase()) > -1){
      // console.log("found a owl");
      newSimilaritiesArray.push('owl');
    }
    else if(catArr.indexOf(sentenceToArray[i].toLowerCase()) > -1){
      // console.log("found a cat");
      newSimilaritiesArray.push('cat');
    }
    else if(frogArr.indexOf(sentenceToArray[i].toLowerCase()) > -1){
      // console.log("found a frog");
      newSimilaritiesArray.push('frog');
    }
    else {
      // console.log("didnt find anything");
      // didnt find any words do nothing
    }
  }
  return newSimilaritiesArray;
}



///convert daim to note
function convertDiamToNoteMajor(locationY){

  let newlocationY = clamp(locationY, -60, 60)

  let sketchNotationArray = [];
  let note;
  switch (Math.floor(convertRange( newlocationY, [ -60, 60 ], [ -1, 15 ] ))) {
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
    note =  493.8833;
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

function convertDiamToNoteMinor(locationY){

  let newlocationY = clamp(locationY, -60, 60)

  let sketchNotationArray = [];
  let note;
  switch (Math.floor(convertRange( newlocationY, [ -60, 60 ], [ -1, 15 ] ))) {
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
    note =  493.8833;
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



function noteLength(locationX){

  let noteLength;
  let note;
  let newlocationX = clamp(locationX, -60, 60)

  switch (Math.floor(convertRange( newlocationX, [ -60, 60 ], [ -1, 22 ] ))) {
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


function convertRange( value, r1, r2 ) {
  return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}



function fadeout(element) {
  var op = 1;  // initial opacity
  var timer = setInterval(function () {
    if (op <= 0.001){
      clearInterval(timer);
      element.style.display = 'none';
    }
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    op -= op * 0.4;
  }, 20);
}

function fadeoutandDelete(element) {
  var op = 1;  // initial opacity
  var timer = setInterval(function () {
    if (op <= 0.001){
      clearInterval(timer);
      element.style.display = 'none';
      element.remove();
    }
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    op -= op * 0.4;
  }, 20);
}


function dimElement(element) {
  var op = 1;  // initial opacity
  var timer = setInterval(function () {
    if (op <= 0.2){
      clearInterval(timer);
      // element.style.display = 'none';
    }
    // element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    op -= op * 0.4;
  }, 20);
}


function fadein(element) {
  var op = 0.1;  // initial opacity
  element.style.display = 'block';
  var timer = setInterval(function () {
    if (op >= 1){
      clearInterval(timer);
    }
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    op += op * 0.1;
  }, 10);
}

function fadeinButton(element) {
  var op = 0.01;  // initial opacity
  element.style.display = 'inline-block';
  var timer = setInterval(function () {
    if (op >= 1){
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



function createSyntOnehWithEffects()  {
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



function createSyntTwohWithEffects()  {
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



function createSyntStarthWithEffects()  {
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


function addSentenceAfterbutton(){
  //add Sentence

  setTimeout(() => {
    addSentence(similarSentences[sentanceNumber], 'sentence2Vec');

  }, 500);

  //delete this button
  setTimeout(() => {
    let elm  = document.getElementById('one-more-sentence');
    fadeoutandDelete(elm);
  }, 100);


}
