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
function generatePhoneNumber() {
  // seu código aqui
}

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
