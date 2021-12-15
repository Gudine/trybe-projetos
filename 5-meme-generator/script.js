const textInput = document.getElementById('text-input');
const textDisplay = document.getElementById('meme-text');

function printMemeText() {
  textDisplay.innerText = textInput.value;
}

textInput.addEventListener('keyup', printMemeText);