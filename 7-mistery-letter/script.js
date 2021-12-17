const spaceRegex = /^\s+$/;
const styleList = ['newspaper', 'magazine1', 'magazine2'];
const sizeList = ['medium', 'big', 'reallybig'];
const rotationList = ['rotateleft', 'rotateright'];
const skewList = ['skewleft', 'skewright'];

const letterText = document.getElementById('carta-texto');
const letterCounter = document.getElementById('carta-contador');
const makeLetterBtn = document.getElementById('criar-carta');
const letterP = document.getElementById('carta-gerada');

function getRandomFromArray(array, amount = 1) {
  const arr = [...array];
  const result = [];
  for (let i = 0; i < amount; i += 1) {
    const random = Math.floor(Math.random() * arr.length);
    result.push(arr.splice(random, 1)[0]);
  }
  return result;
}

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

/* function randomizeSpanStyle(span) {
  [...span.classList].forEach((c) => span.classList.remove(c));

  const styles = getRandomFromArray(
    [styleList, sizeList, rotationList, skewList],
    Math.floor(Math.random() * 3) + 2,
  );

  styles.forEach((list) => { span.classList.add(getRandomFromArray(list)); });
} */

function randomizeSpanStyle(span) {
  [...span.classList].forEach((c) => span.classList.remove(c));
  [styleList, sizeList, rotationList, skewList].forEach(
    (list) => span.classList.add(getRandomFromArray(list)),
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
