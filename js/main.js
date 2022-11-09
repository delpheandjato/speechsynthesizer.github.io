// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textForm2 = document.querySelector('#form');

const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

const textInput2 = document.querySelector('#text-input2');
const voiceSelect2 = document.querySelector('#voice-select2');
const rate2 = document.querySelector('#rate2');
const rateValue2 = document.querySelector('#rate-value2');
const pitch2 = document.querySelector('#pitch2');
const pitchValue2 = document.querySelector('#pitch-value2');

const body = document.querySelector('body');
const stopButton = document.querySelector('.stop-button');
const stopButton2 = document.querySelector('.stop-button2');


//Browser identifier
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Init voices array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  // Loop through voices and create an option for each one
  voices.forEach(voice => {
    // Create option element
    const option = document.createElement('option');
    // Fill option with voice and language
    option.textContent = voice.name + '(' + voice.lang + ')';

    // Set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};

//Line 35, 36 causes voice list duplication
/*getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}*/

//Fix for duplication, run code depending on the browser
if (isFirefox) {
    getVoices();
}

if(speechSynthesis != undefined) {
    speechSynthesis.onvoiceschanged = getVoices;
}

// Speak
const speak = () => {
  // Check if speaking
  if (synth.speaking) {
    console.error('Already speaking...');
    return;
  }

  if (textInput.innerHTML !== '') {
    // Add background animation
    // body.style.background = '#141414 url(img/wave.gif)';
    // body.style.backgroundRepeat = 'repeat-x';
    // body.style.backgroundSize = '100% 100%';

    // Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.innerHTML);

    // Speak end
    speakText.onend = e => {
      console.log('Done speaking...');
      // body.style.background = '#141414';
    };

    // Speak error
    speakText.onerror = e => {
      console.error('Something went wrong');
    };

    // Selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      'data-name'
    );

    // Loop through voices
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // Set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    // Speak
    synth.speak(speakText);
  }
};

const speak2 = () => {
  // Check if speaking
  if (synth.speaking) {
    console.error('Already speaking...');
    return;
  }

  if (textInput2.innerHTML !== '') {
    // Add background animation
    // body.style.background = '#141414 url(img/wave.gif)';
    // body.style.backgroundRepeat = 'repeat-x';
    // body.style.backgroundSize = '100% 100%';

    // Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput2.innerHTML);

    // Speak end
    speakText.onend = e => {
      console.log('Done speaking...');
      // body.style.background = '#141414';
    };

    // Speak error
    speakText.onerror = e => {
      console.error('Something went wrong');
    };

    // Selected voice
    const selectedVoice = voiceSelect2.selectedOptions[0].getAttribute(
      'data-name'
    );

    // Loop through voices
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // Set pitch and rate
    speakText.rate = rate2.value;
    speakText.pitch = pitch2.value;
    // Speak
    synth.speak(speakText);
  }
};

// EVENT LISTENERS

// Text form submit
textForm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

textForm2.addEventListener('submit', e => {
  e.preventDefault();
  speak2();
  textInput2.blur();
});

// Rate value change
rate.addEventListener('change', e => (rateValue.textContent = rate.value));
rate2.addEventListener('change', e => (rateValue2.textContent = rate2.value));

// Pitch value change
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));
pitch.addEventListener('change', e => (pitchValue2.textContent = pitch2.value));

// Voice select change
voiceSelect.addEventListener('change', e => speak());
voiceSelect2.addEventListener('change', e => speak2());

const stop = () => {
  if (synth.speaking) {      
      synth.cancel()
  }  
}

stopButton.addEventListener('click', e => stop());
stopButton2.addEventListener('click', e => stop());

