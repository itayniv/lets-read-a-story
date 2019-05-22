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
  recognition.continuous = false;
  // recognition.interimResults = true;
  console.log('started rec');

  recognition.onresult = (event) => {
    let speechResult = event.results[0][0].transcript;
    // console.log(`result: ${speechResult}`, `confidence: ${event.results[0][0].confidence}`);
    console.log(speechResult);

    // // start listening 
    // if (speechResult === 'listen') {
    //   setTimeout(() => {
    //     startSpeech();
    //     speechResult = ' ';
    //   }, 400);
    // }

    if (isListening) {

      if (!storyBegan) {
        speechToPrompt(speechResult);
      } else {
        speechToNextPrompt(speechResult);
      }

      // generate actions
      gotAction(speechResult);
    }
  };

  recognition.onend = () => {
    // console.log('it is over');
    // for "endless" mode, comment out the next line and uncomment getSpeech()
    recordingOff();
    recognition.stop();
    // getSpeech();
  };

  recognition.onerror = (event) => {
    console.log(`something went wrong: ${event.error}`);
  };
};


function speechToPrompt(text) {

  const promptPlaceholder = document.getElementById('recordedText');
  promptPlaceholder.value = text;


  // gremove prompt
  setTimeout(() => {
    // let fadeoutComponent1 = document.getElementById('characterOne');
    const fadeoutComponent2 = document.getElementById('recordedText');
    const fadeoutComponent3 = document.getElementById('recordedText-eg');
    // fadeout(fadeoutComponent1);
    fadeout(fadeoutComponent2);
    fadeout(fadeoutComponent3);
  }, 1000);

  // add loading animation
  setTimeout(() => {
    addLoadingAnimation('left');
  }, 1300);

  // send information to sentence encoder 
  setTimeout(() => {
    sendtoSentenceEncoder(text);
  }, 2000);

}



function speechToNextPrompt(text) {
  // change prompt text
  const promptPlaceholder = document.getElementById('newPromptInput');
  promptPlaceholder.value = text;
  // get try making it work
  // addLoadingAnimation('left');

  // start new prompt
  setTimeout(() => {
    sendNewPrompt(text);
  }, 2000);

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


function startSpeech(clicked_id) {
  console.log('pressed', clicked_id);
  const elm = document.getElementById('start-listening');


  if (!isListening) {
    getSpeech();
    audioStartSound.play();
    elm.style.backgroundImage = "url('/images/recording-on.svg')";
    elm.classList.remove('recording-button');
    elm.classList.add('recording-button-active');
    isListening = true;

  } else {
    isListening = false;
    audioEndSound.play();
    elm.style.backgroundImage = "url('/images/recording-off.svg')";
    elm.classList.remove('recording-button-active');
    elm.classList.add('recording-button');
  }
}

function recordingOff() {

  if (startButtonPressed) {
    audioEndSound.play();
  }
  const elm = document.getElementById('start-listening');
  isListening = false;
  elm.style.backgroundImage = "url('/images/recording-off.svg')";
  elm.classList.remove('recording-button-active');
  elm.classList.add('recording-button');
}