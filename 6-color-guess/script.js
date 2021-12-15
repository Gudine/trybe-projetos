const colorSect = document.getElementById('colors');
const colors = [];
let answer = null;

function generateColor() {
  const r = Math.floor(Math.random() * (256));
  const g = Math.floor(Math.random() * (256));
  const b = Math.floor(Math.random() * (256));
  return { r, g, b, full: `rgb(${r}, ${g}, ${b})` };
}

function genColorBalls() {
  colors.filter(() => false);
  for (let i = 0; i < 6; i += 1) {
    const div = document.createElement('div');
    const color = generateColor();

    div.classList.add('ball');
    div.style.backgroundColor = color.full;
    colorSect.appendChild(div);
    colors.push(color);
  }
  answer = Math.floor(Math.random() * (6));
}

genColorBalls();
