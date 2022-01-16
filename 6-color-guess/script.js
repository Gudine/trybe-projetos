const colorPrompt = document.getElementById('rgb-color');
const colorSect = document.getElementById('colors');
const answerSpan = document.getElementById('answer');
const resetButton = document.getElementById('reset-game');
const score = document.getElementById('score');

const colors = [];
let answer = null;

function generateColor() {
  const r = Math.floor(Math.random() * (256));
  const g = Math.floor(Math.random() * (256));
  const b = Math.floor(Math.random() * (256));
  return { r, g, b, full: `rgb(${r}, ${g}, ${b})` };
}

function changeScore(diff) {
  let scoreNum = parseInt(score.innerText, 10);
  scoreNum += diff;
  if (scoreNum < 0) { scoreNum = 0; }
  score.innerText = scoreNum;
}

function selectColor(ev) {
  ev.target.classList.add('selected');
  const currColor = ev.target.style.backgroundColor;
  if (currColor === colors[answer].full) {
    answerSpan.innerText = 'Acertou!';
    changeScore(3);
  } else {
    answerSpan.innerText = 'Errou! Tente novamente!';
    changeScore(-1);
  }

  [...document.getElementsByClassName('ball')].forEach(
    (elem) => elem.removeEventListener('click', selectColor),
  );
}

function genColorBalls() {
  for (let i = 0; i < 6; i += 1) {
    const div = document.createElement('div');
    const color = generateColor();

    div.classList.add('ball');
    div.style.backgroundColor = color.full;
    div.addEventListener('click', selectColor);

    colorSect.appendChild(div);
    colors.push(color);
  }
  answer = Math.floor(Math.random() * (6));
  colorPrompt.innerText = colors[answer].full.slice(3);
}

function resetGame() {
  answerSpan.innerText = 'Escolha uma cor';
  // Apaga todos os itens do array colors
  colors.splice(0, colors.length);
  // Apaga todos os elementos de cores
  [...document.getElementsByClassName('ball')].forEach(
    (elem) => elem.remove(),
  );
  genColorBalls();
}
resetButton.addEventListener('click', resetGame);

resetGame();
