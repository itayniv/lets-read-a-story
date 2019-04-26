
const SpeechRecognition = webkitSpeechRecognition;
const giphyAPIKey = 'YOUR KEY';

const getSpeech = () => {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.start();
  // recognition.continuous = false;
  recognition.interimResults = true;
  console.log('started rec');

  recognition.onresult = event => {
    const speechResult = event.results[0][0].transcript;
    console.log('result: ' + speechResult);
    console.log('confidence: ' + event.results[0][0].confidence);
    document.querySelector('#speech-div').textContent = speechResult;
    getGif(speechResult);
  };

  recognition.onend = () => {
    console.log('it is over');
    
    // for "endless" mode, comment out the next line and uncomment getSpeech()
    recognition.stop(); 
    // getSpeech(); 
    
  };

  recognition.onerror = event => {
    console.log('something went wrong: ' + event.error);
  };
};
