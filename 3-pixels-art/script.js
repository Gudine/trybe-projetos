// Declara largura e altura, respectivamente
let [w, h] = [5, 5];
// Encontra todos os divs da paleta
const colors = document.querySelectorAll('.color');
// Encontra o botão de limpar o quadro
const clear = document.getElementById('clear-board');
// Encontra o input com a largura e altura do quadro
const boardsize = document.getElementById('board-size');
// Encontra o botão de gerar um novo quadro
const generate = document.getElementById('generate-board');
// Encontra o quadro de pixels
const board = document.getElementById('pixel-board');
// Encontra a cor selecionada
let selected = document.querySelector('.selected');

// Passa por todos os divs da paleta
for (let i = 0; i < colors.length; i += 1) {
  // Se for o 1o div, aplica a cor preta
  if (i === 0) {
    colors[i].style.backgroundColor = '#000';
  } else {
    // Caso contrário, aplica uma cor aleatória
    const r = Math.floor(Math.random() * (256));
    const g = Math.floor(Math.random() * (256));
    const b = Math.floor(Math.random() * (256));
    colors[i].style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }
}

// Pinta o pixel alvo do evento dado como parâmetro
function paintPixel(ev) {
  const pixel = ev.target;
  const color = selected.style.backgroundColor;
  pixel.style.backgroundColor = color;
}

// Preenche a quadro com uma grade de pixels,
// usando os valores de largura e altura definidos
function generateBoard() {
  for (let i = 0; i < w * h; i += 1) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.style.backgroundColor = '#fff';
    pixel.addEventListener('click', paintPixel);
    board.appendChild(pixel);

    if (i % w === w - 1) {
      board.appendChild(document.createElement('br'));
    }
  }
}

// Reseta a cor de todos os pixels do quadro
function clearBoard() {
  const pixels = document.querySelectorAll('.pixel');

  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].style.backgroundColor = '#fff';
  }
}

// Apaga o quadro e o refaz, usando
// as dimensões pegas do input
function remakeBoard() {
  if (!boardsize.value) {
    alert('Board inválido!');
    return;
  }
  let input = parseInt(boardsize.value, 10);
  if (input < 5) { input = 5; }
  if (input > 50) { input = 50; }
  w = input;
  h = input;

  const elems = board.children;
  while (elems.length) {
    elems[0].remove();
  }

  generateBoard();
}

// Seleciona uma nova cor da paleta
function selectColor(color) {
  if (selected) { selected.classList.remove('selected'); }
  selected = color;
  selected.classList.add('selected');
}

// Passa por todas as cores e adiciona um evento
// quando clicadas, que adiciona a classe selected.
// (O Lint não gosta de for/of, aparentemente)
colors.forEach(
  (color) => color.addEventListener('click',
    (ev) => selectColor(ev.target)),
);

clear.addEventListener('click', clearBoard);

generate.addEventListener('click', remakeBoard);

generateBoard();

// Se nenhuma cor estiver selecionada,
// seleciona a 1a cor
if (!selected) {
  selectColor(colors[0]);
}
