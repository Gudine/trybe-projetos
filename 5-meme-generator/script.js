const textInput = document.getElementById('text-input');
const imgInput = document.getElementById('meme-insert');

const textDisplay = document.getElementById('meme-text');
const imgDisplay = document.getElementById('meme-image');


function printMemeText() {
  textDisplay.innerText = textInput.value;
}

function fileUpload(ev) {
  const file = ev.target.files[0];
  const reader = new FileReader();

  reader.addEventListener('load',
    (e) => {
      imgDisplay.src = e.target.result;
    });
  reader.readAsDataURL(file);
}

textInput.addEventListener('keyup', printMemeText);
imgInput.addEventListener('change', fileUpload);
