const board = document.getElementById("pixel-board");

//Declara largura e altura, respectivamente
const [w, h] = [5, 5];

function fillBoard() {
  for (let i = 0; i < w * h; i += 1) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.classList.add("blank");
    board.appendChild(pixel);

    if (i % w === w - 1) {
      board.appendChild(document.createElement("br"));
    }
  }
}

fillBoard();
