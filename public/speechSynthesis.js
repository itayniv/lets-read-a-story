let isListening = false;

let animalsArray = ["jackdaw", "eagle", "crow", "crows", "swallow", "raven", "kite", "lark",
  "birds", "chicken", "chickens", "crane", "cranes", "goose", "ducks", "peacock",
  "peacocks", "heron", "herons", "gnat", "grasshopper", "grasshoppers", "flies",
  "wasps", "hornet", "goat", "goats", "wolf", "fox", "dogs", "boar", "weasels",
  "weasel", "lamb", "beetle", "tortoise", "tortoises", "lion's", "tiger", "tiger's",
  "tigers", "cats", 'frogs', "frog's", "ant", "bear", "bee", "bird", "butterfly",
  "cat", "crab", "dog", "dolphin", "duck", "elephant", "frog", "hedgehog", "kangaroo", "lion", "lobster",
  "monkey", "mosquito", "octopus", "owl", "parrot", "penguin", "pig", "rabbit", "rhinoceros",
  "roller_coaster", "scorpion", "sea_turtle", "sheep", "snail", "spider", "squirrel", "swan", "whale"
];

// eslint-disable-next-line no-undef
const SpeechRecognition = webkitSpeechRecognition;

const getSpeech = () => {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.start();
  //   recognition.continuous = false;
  recognition.interimResults = true;

  console.log('started rec');

  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript;
    // console.log(`result: ${speechResult}`, `confidence: ${event.results[0][0].confidence}`);
    console.log(speechResult);

    if (isListening) {
      speechToPrompt(speechResult);
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

  var speechArr = text.split(' ');
  checkForAnimal(speechArr);
}


function gotSpeech(speech) {
  // console.log('gotSpeech', speech);
  switch (speech) {
    case 'what happend next':
      console.log('switch', 'next');
      addSentenceAfterbutton();
      break;
    case 'lion':
      buttonPressed(speech);
      console.log('switch', 'lion');
      break;
    case 'sheep':
      buttonPressed(speech);
      console.log('switch', 'sheep');
      break;
    case 'cat':
      buttonPressed(speech);
      console.log('switch', 'cat');
      break;
    case 'bird':
      buttonPressed(speech);
      console.log('switch', 'bird');
      break;
    case 'owl':
      buttonPressed(speech);
      console.log('switch', 'owl');
      break;
    case 'fox':
      buttonPressed(speech);
      console.log('switch', 'fox');
      break;
    case 'bear':
      buttonPressed(speech);
      console.log('switch', 'bear');
      break;
    case 'crow':
      buttonPressed(speech);
      console.log('switch', 'crow');
      break;
    case 'chicken':
      buttonPressed(speech);
      console.log('switch', 'chicken');
      break;

  }
}


function startSpeech(clicked_id) {
  console.log('pressed', clicked_id);
  const elm = document.getElementById('start-listening');
  if (!isListening) {
    elm.style.backgroundImage = "url('/images/recording-on.svg')";
    isListening = true;

    setTimeout(() => {
      isListening = false;
      elm.style.backgroundImage = "url('/images/recording-off.svg')";
    }, 6000);
  } else {
    isListening = false;
    elm.style.backgroundImage = "url('/images/recording-off.svg')";
  }
}


function checkForAnimal(arr) {
  console.log('sentence Arr', arr);
  for (let i = 0; i < arr.length; i++) {
    if (animalsArray.indexOf(arr[i].toLowerCase()) > -1) {
      const animalIntent = arr[i].toLowerCase();
      setTimeout(() => {
        gotSpeech(animalIntent);
      }, 1500);

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
