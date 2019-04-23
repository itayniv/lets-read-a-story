console.log('🗣️ Voice Recognition');


let isListening = false;

const animalsArray = ['woman', 'fish', 'boy', 'horse', 'jackdaw', 'eagle', 'crow', 'crows', 'swallow', 'raven', 'kite', 'lark',
  'birds', 'chicken', 'chickens', 'crane', 'cranes', 'goose', 'ducks', 'peacock',
  'peacocks', 'heron', 'herons', 'gnat', 'grasshopper', 'grasshoppers', 'flies',
  'wasps', 'hornet', 'goat', 'goats', 'wolf', 'fox', 'dogs', 'boar', 'weasels',
  'weasel', 'lamb', 'beetle', 'tortoise', 'tortoises', "lion's", 'tiger', "tiger's",
  'tigers', 'cats', 'frogs', "frog's", 'ant', 'bear', 'bee', 'bird', 'butterfly',
  'cat', 'crab', 'dog', 'dolphin', 'duck', 'elephant', 'frog', 'hedgehog', 'kangaroo', 'lion', 'lobster',
  'monkey', 'mosquito', 'octopus', 'owl', 'parrot', 'penguin', 'pig', 'rabbit', 'rhinoceros',
  'roller_coaster', 'scorpion', 'sea_turtle', 'sheep', 'snail', 'spider', 'squirrel', 'swan', 'whale',
];

// eslint-disable-next-line no-undef
const SpeechRecognition = webkitSpeechRecognition;

const getSpeech = () => {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.start();
  //   recognition.continuous = false;
  recognition.interimResults = true;

  // console.log('started rec');

  recognition.onresult = (event) => {
    let speechResult = event.results[0][0].transcript;
    // console.log(`result: ${speechResult}`, `confidence: ${event.results[0][0].confidence}`);
    console.log(speechResult);

    // start listening 
    if (speechResult === 'listen') {
      setTimeout(() => {
        startSpeech();
        speechResult = ' ';
      }, 400);
    }

    if (isListening) {
      speechToPrompt(speechResult);

      // generate actions
      gotAction(speechResult);
    }
  };

  recognition.onend = () => {
    // console.log('it is over');
    // for "endless" mode, comment out the next line and uncomment getSpeech()
    // recognition.stop();
    getSpeech();
  };

  recognition.onerror = (event) => {
    // console.log(`something went wrong: ${event.error}`);
  };
};


function speechToPrompt(text) {

  const promptPlaceholder = document.getElementById('recordedText');
  promptPlaceholder.value = text;
  // get try making it work
  addLoadingAnimation ()
  setTimeout(() => {
    sendtoSentenceEncoder(text);
  }, 3200);
  
}


function gotAction(actionSpeech) {

  let speechArr = actionSpeech.split(' ');

  for (let index = 0; index < speechArr.length; index++) {
    switch (speechArr[index]) {
      default:
        // do nothing
        break;
      case 'clear':
        console.log('clear story');
        resetStory();
        break;
      case 'reset':
        console.log('reset story');
        resetStory();
        break;
      case 'pause':
        console.log('pause');
        break;
      case 'play':
        console.log('resume');
        break;
      case 'back':
        console.log('back');
        break;
      case 'next':
        console.log('next');
        break;
      case 'draw':
        console.log('draw');
        break;
    }
  }
}


function gotSpeech(speech, arr) {
  // console.log('gotSpeech', speech, arr);
  switch (speech) {
    default:
    // do nothing
    case 'what happend next':
      // console.log('switch', 'next');
      addSentenceAfterbutton();
      break;
    case 'happend next':
      // console.log('switch', 'next');
      addSentenceAfterbutton();
      break;
    case 'next':
      // console.log('switch', 'next');
      addSentenceAfterbutton();
      break;
    case 'lion':
      buttonPressed(speech, arr);
      // console.log('switch', 'lion');
      break;
    case 'sheep':
      buttonPressed(speech, arr);
      // console.log('switch', 'sheep');
      break;
    case 'cat':
      buttonPressed(speech, arr);
      // console.log('switch', 'cat');
      break;
    case 'bird':
      buttonPressed(speech, arr);
      // console.log('switch', 'bird');
      break;
    case 'fish':
      buttonPressed(speech, arr);
      // console.log('switch', 'bird');
      break;
    case 'owl':
      buttonPressed(speech, arr);
      // console.log('switch', 'owl');
      break;
    case 'fox':
      buttonPressed(speech, arr);
      // console.log('switch', 'fox');
      break;
    case 'bear':
      buttonPressed(speech, arr);
      // console.log('switch', 'bear');
      break;
    case 'dog':
      buttonPressed(speech, arr);
      // console.log('switch', 'dog');
      break;
    case 'crow':
      buttonPressed(speech, arr);
      // console.log('switch', 'crow');
      break;
    case 'chicken':
      buttonPressed(speech, arr);
      // console.log('switch', 'chicken');
      break;
    case 'goat':
      buttonPressed(speech, arr);
      // console.log('switch', 'chicken');
      break;
    case 'hare':
      buttonPressed(speech, arr);
      // console.log('switch', 'hare');
      break;
    case 'boy':
      buttonPressed(speech, arr);
      // console.log('switch', 'boy');
      break;
    case 'mouse':
      buttonPressed(speech, arr);
      // console.log('switch', 'mouse');
      break;
    case 'wolf':
      buttonPressed(speech, arr);
      // console.log('switch', 'wolf');
      break;
    case 'tortoise':
      buttonPressed(speech, arr);
      // console.log('switch', 'tortoise');
      break;
    case 'horse':
      buttonPressed(speech, arr);
      // console.log('switch', 'horse');
      break;
    case 'woman':
      buttonPressed(speech, arr);
      // console.log('switch', 'woman');
      break;
  }
}


function startSpeech(clicked_id) {
  console.log('pressed', clicked_id);
  const elm = document.getElementById('start-listening');

  if (!isListening) {
    elm.style.backgroundImage = "url('/images/recording-on.svg')";
    elm.classList.remove('recording-button');
    elm.classList.add('recording-button-active');
    isListening = true;

    setTimeout(() => {
      isListening = false;
      elm.style.backgroundImage = "url('/images/recording-off.svg')";
      elm.classList.remove('recording-button-active');
      elm.classList.add('recording-button');
    }, 6000);
  } else {
    isListening = false;
    elm.style.backgroundImage = "url('/images/recording-off.svg')";
    elm.classList.remove('recording-button-active');
    elm.classList.add('recording-button');
  }
}


function checkForAnimal(arr) {

  // console.log('sentence Arr', arr);

  for (let i = 0; i < arr.length; i++) {
    if (animalsArray.indexOf(arr[i].toLowerCase()) > -1) {
      const animalIntent = arr[i].toLowerCase();
      setTimeout(() => {
        gotSpeech(animalIntent, arr);
      }, 800);

      // let thisWord = sentenceToArray[i].toLowerCase();
      // let squirrelObject = {
      //   class: 'squirrel',
      //   word: thisWord
      // }

      // newSimilaritiesArray.push(squirrelObject);
      // // console.log("found a squirrel", squirrelObject);
    }
  }
}
