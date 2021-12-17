const spaceRegex = /^\s+$/;
const styleList = ['newspaper', 'magazine1', 'magazine2'];
const sizeList = ['medium', 'big', 'reallybig'];
const rotationList = ['rotateleft', 'rotateright'];
const skewList = ['skewleft', 'skewright'];

const letterText = document.getElementById('carta-texto');
const letterCounter = document.getElementById('carta-contador');
const makeLetterBtn = document.getElementById('criar-carta');
const letterP = document.getElementById('carta-gerada');

function removeWords() {
  const elems = [...document.querySelectorAll('#carta-gerada > *')];
  elems.forEach((elem) => elem.remove());
}

function generateWarning() {
  const warning = document.createElement('span');
  warning.classList.add('warning');
  warning.innerText = 'Por favor, digite o conteúdo da carta.';
  letterP.appendChild(warning);
}

function getRandomFromArray(array) {
  const random = Math.floor(Math.random() * (array.length));
  return array[random];
}

function randomizeSpanStyle(span) {
  [...span.classList].forEach((c) => span.classList.remove(c));
  span.classList.forEach(() => span.classList.remove());
  [styleList, sizeList, rotationList, skewList].forEach(
    (list) => {
      const c = getRandomFromArray(list);
      if (c !== undefined) { span.classList.add(c); }
    },
  );
}

function generateSpan(word) {
  const span = document.createElement('span');
  span.innerText = word;
  randomizeSpanStyle(span);
  span.addEventListener('click', (ev) => randomizeSpanStyle(ev.target));
  letterP.appendChild(span);
}

function generateLetter() {
  removeWords();
  if (letterText.value.match(spaceRegex)) {
    generateWarning();
    return;
  }
  const words = letterText.value.split(' ');
  letterCounter.innerText = words.length;
  words.forEach(generateSpan);
}

makeLetterBtn.addEventListener('click', generateLetter);
