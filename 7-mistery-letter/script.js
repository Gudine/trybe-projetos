const letterText = document.getElementById('carta-texto');
const makeLetterBtn = document.getElementById('criar-carta');
const letterP = document.getElementById('carta-gerada');

function removeWords() {
  const spans = [...document.querySelectorAll('#carta-gerada span')];
  spans.forEach((span) => span.remove());
}

function generateLetter() {
  removeWords();
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
