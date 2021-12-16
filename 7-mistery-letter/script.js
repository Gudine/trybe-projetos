const spaceRegex = /^\s+$/;
const letterText = document.getElementById('carta-texto');
const makeLetterBtn = document.getElementById('criar-carta');
const letterP = document.getElementById('carta-gerada');

function removeWords() {
  const elems = [...document.querySelectorAll('#carta-gerada > *')];
  elems.forEach((elem) => elem.remove());
}

function generateLetter() {
  removeWords();
  if (letterText.value.match(spaceRegex)) {
    const warning = document.createElement('span');
    warning.classList.add('warning');
    warning.innerText = 'Por favor, digite o conteúdo da carta.';
    letterP.appendChild(warning);
    return;
  }
  const words = letterText.value.split(' ');
  words.forEach(
    (word) => {
      const span = document.createElement('span');
      span.innerText = word;
      letterP.appendChild(span);
    },
  );
}

makeLetterBtn.addEventListener('click', generateLetter);
