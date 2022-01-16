const textInput = document.getElementById('text-input');
const imgInput = document.getElementById('meme-insert');

const container = document.getElementById('meme-image-container');
const textDisplay = document.getElementById('meme-text');
const imgDisplay = document.getElementById('meme-image');

const buttons = document.querySelectorAll('#meme-borders button');
const defaultImgs = document.querySelectorAll('#meme-defaults img');

function printMemeText() {
  if (textInput.value.length >= 60) {
    textInput.value = textInput.value.slice(0, 60);
  }
  textDisplay.innerText = textInput.value;
}

function uploadImage(ev) {
  const file = ev.target.files[0];
  const reader = new FileReader();

  reader.addEventListener('load',
    (e) => {
      imgDisplay.src = e.target.result;
    });
  reader.readAsDataURL(file);
}

function changeBorder(ev) {
  container.className = ev.target.id;
}

function useDefaultImage(ev) {
  imgDisplay.src = ev.target.src;
}

textInput.addEventListener('keyup', printMemeText);
imgInput.addEventListener('change', uploadImage);

buttons.forEach((btn) => btn.addEventListener('click', changeBorder));
defaultImgs.forEach((img) => img.addEventListener('click', useDefaultImage));
