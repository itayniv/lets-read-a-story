let isListening = false;

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
    // console.log(event);
    gotSpeech(speechResult);
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
  } else {
    isListening = false;
    elm.style.backgroundImage = "url('/images/recording-off.svg')";
  }
}

