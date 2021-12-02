// Desafio 10
function techList(array, name) {
  if (array.length === 0) { return 'Vazio!'; }
  let outArray = [];

  let newArray = array.slice().sort();
  for (let tech of newArray) {
    outArray.push({ tech, name });
  }

  return outArray;
}

// Desafio 11
function incrementObject(value) {
  if (value !== undefined) {
    return value + 1;
  }
  return 1;
}

function maxRepeat(numbers, max) {
  let repetidos = {};
  for (let x of numbers) {
    repetidos[x] = incrementObject(repetidos[x]);
    if (repetidos[x] >= max) {
      return true;
    }
    if (x < 0 || x > 9) {
      return true;
    }
  }

  return false;
}

function generatePhoneNumber(numbers) {
  if (numbers.length !== 11) {
    return 'Array com tamanho incorreto.';
  }
  if (maxRepeat(numbers, 3)) {
    return 'não é possível gerar um número de telefone com esses valores';
  }

  let ddd = numbers.slice(0, 2).join('');
  let first = numbers.slice(2, 7).join('');
  let last = numbers.slice(7).join('');

  return `(${ddd}) ${first}-${last}`;
}

console.log(generatePhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1]));

// Desafio 12
function triangleCheck() {
  // seu código aqui
}

// Desafio 13
function hydrate() {
  // seu código aqui
}

module.exports = {
  generatePhoneNumber,
  techList,
  hydrate,
  triangleCheck,
};
