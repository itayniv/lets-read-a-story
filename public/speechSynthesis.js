console.log('🗣️ Speech synthesis');


const synth = window.speechSynthesis;
let voices;
let narration = false;


// wait on voices to be loaded before fetching list
window.speechSynthesis.onvoiceschanged = function () {
  window.speechSynthesis.getVoices();
  voices = synth.getVoices();
};

const speak = (text) => {
  if (synth.speaking) {
    console.error('speechSynthesis.speaking');
    return;
  }
  const utterThis = new SpeechSynthesisUtterance(text);
  utterThis.voice = voices[32];
  utterThis.rate = 0.84;
  synth.speak(utterThis);
};




document.onkeydown = function(evt) {
  evt = evt || window.event;
  // console.log(evt.key);

  if (evt.key === '9' ) {
    if (narration === true) {
      narration = false;
      console.log(narration)
    } else {
      narration = true;
      console.log(narration)
    }
    
  }
  
};






function startSpeechSynth(clicked_id) {
  console.log('pressed', clicked_id);
  const elm = document.getElementById('start-speaking');

  if (!narration) {
    elm.style.backgroundImage = "url('/images/voice-on.svg')";
    elm.classList.remove('voice-button');
    elm.classList.add('voice-button-active');
    narration = true;
    // setTimeout(() => {
    //   isListening = false;
    //   elm.style.backgroundImage = "url('/images/voice-off.svg')";
    //   elm.classList.remove('voice-button-active');
    //   elm.classList.add('voice-button');
    // }, 6000);
  } else {
    narration = false;
    elm.style.backgroundImage = "url('/images/voice-off.svg')";
    elm.classList.remove('voice-button-active');
    elm.classList.add('voice-button');
  }
}