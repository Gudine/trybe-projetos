const colorPrompt = document.getElementById('rgb-color');
const colorSect = document.getElementById('colors');
const answerSpan = document.getElementById('answer');

const colors = [];
let answer = null;

function generateColor() {
  const r = Math.floor(Math.random() * (256));
  const g = Math.floor(Math.random() * (256));
  const b = Math.floor(Math.random() * (256));
  return { r, g, b, full: `rgb(${r}, ${g}, ${b})` };
}

function rightAnswer() {
  answerSpan.innerText = 'Acertou!';
}

function wrongAnswer() {
  answerSpan.innerText = 'Errou! Tente novamente!';
}

function findAnswer(ev) {
  const currColor = ev.target.style.backgroundColor;
  if (currColor === colors[answer].full) {
    rightAnswer();
  } else {
    wrongAnswer();
  }
}

function genColorBalls() {
  colors.filter(() => false);
  for (let i = 0; i < 6; i += 1) {
    const div = document.createElement('div');
    const color = generateColor();

    div.classList.add('ball');
    div.style.backgroundColor = color.full;
    div.addEventListener('click', findAnswer);

    colorSect.appendChild(div);
    colors.push(color);
  }
  answer = Math.floor(Math.random() * (6));
  colorPrompt.innerText = colors[answer].full.slice(3);
}

genColorBalls();
