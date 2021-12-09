// Declara largura e altura, respectivamente
const [w, h] = [5, 5];
// Faz lista de cores da paleta
const colors = document.querySelectorAll('.color');
// Guarda o quadro de pixels numa var
const board = document.getElementById('pixel-board');
// Guarda a cor selecionada numa var
let selected = document.querySelector('.selected');

function fillBoard() {
  for (let i = 0; i < w * h; i += 1) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.classList.add('blank');
    board.appendChild(pixel);

    if (i % w === w - 1) {
      board.appendChild(document.createElement('br'));
    }
  }
}

function selectColor(color) {
  if (selected) { selected.classList.remove("selected"); }
  selected = color;
  selected.classList.add("selected");
}

fillBoard();

if (!selected) {
  selectColor(colors[0]);
}
