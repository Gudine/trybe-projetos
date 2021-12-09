// Declara largura e altura, respectivamente
let [w, h] = [5, 5];
// Faz lista de cores da paleta
const colors = document.querySelectorAll('.color');
const clear = document.getElementById('clear-board');
const boardsize = document.getElementById('board-size');
const generate = document.getElementById('generate-board');
// Guarda o quadro de pixels numa var
const board = document.getElementById('pixel-board');
// Guarda a cor selecionada numa var
let selected = document.querySelector('.selected');

// Pinta o pixel alvo do evento dado como parâmetro
function paintPixel(ev) {
  const pixel = ev.target;
  const color = selected.classList[1];

  pixel.className = 'pixel';
  pixel.classList.add(color);
}

// Preenche a pixel-board com uma grade de pixels,
// usando os valores de largura e altura definidos
function generateBoard() {
  for (let i = 0; i < w * h; i += 1) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.classList.add('blank');
    pixel.addEventListener('click', paintPixel);
    board.appendChild(pixel);

    if (i % w === w - 1) {
      board.appendChild(document.createElement('br'));
    }
  }
}

function clearBoard() {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach(
    (pixel) => { pixel.className = 'pixel blank'; },
  );
}

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

generate.addEventListener('click', function() {
  if (!boardsize.value) {
    alert("Board inválido!");
    return;
  }
  let input = parseInt(boardsize.value);
  if (input < 5) {input = 5}
  else if (input > 50) {input = 50};
  w = input;
  h = input;

  const elems = board.children;
  while (elems.length) {
    elems[0].remove();
  }

  generateBoard();
});

generateBoard();

if (!selected) {
  selectColor(colors[0]);
}
