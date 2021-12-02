// Desafio 1
function compareTrue(a, b) {
  return (a && b);
}

// Desafio 2
function calcArea(base, height) {
  return (base * height) / 2;
}

// Desafio 3
function splitSentence(sentence) {
  return sentence.split(' ');
}

// Desafio 4
function concatName(array) {
  return `${array.slice(-1)[0]}, ${array[0]}`;
}

// Desafio 5
function footballPoints(wins, ties) {
  return wins * 3 + ties;
}

// Desafio 6
function highestCount(array) {
  // Código adaptado de código já feito anteriormente
  // https://github.com/Gudine/trybe-exercicios/blob/main/modulo-01/bloco-04/dia-02/script.js#L35

  let maior = { value: array[0], repetitions: 0 };
  for (let x of array) {
    if (x === maior.value) {
      maior.repetitions += 1;
    } else if (x > maior.value) {
      maior.value = x;
      maior.repetitions = 1;
    }
  }
  return maior.repetitions;
}

console.log(highestCount([-2, -2, -1]));

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  let cat1Dist = Math.abs(mouse - cat1);
  let cat2Dist = Math.abs(mouse - cat2);

  if (cat1Dist < cat2Dist) { return 'cat1'; }
  if (cat2Dist < cat1Dist) { return 'cat2'; }
  return 'os gatos trombam e o rato foge';
}

// Desafio 8
function fizzBuzz(array) {
  let outArray = [];

  for (let x of array) {
    if (x % 3 === 0 && x % 5 === 0) {
      outArray.push('fizzBuzz');
    } else if (x % 3 === 0) {
      outArray.push('fizz');
    } else if (x % 5 === 0) {
      outArray.push('buzz');
    } else {
      outArray.push('bug!')
    }
  }

  return outArray;
}

// Desafio 9
function encode() {
  // seu código aqui
}
function decode() {
  // seu código aqui
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
};
