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
  // Encurtamento do código feito por
  // sugestão de Raphael Martins (19-A)
  if (value) { return value + 1; }
  return 1;
}
function verifyNumber(number, repeat, max) {
  if (repeat >= max) {
    return true;
  }
  if (number < 0 || number > 9) {
    return true;
  }
}
function maxRepeat(numbers, max) {
  let repetidos = {};
  for (let x of numbers) {
    repetidos[x] = incrementObject(repetidos[x]);
    if (verifyNumber(x, repetidos[x], max)) {
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

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  let check = [[lineA, lineB, lineC], [lineB, lineA, lineC], [lineC, lineA, lineB]];

  for (let group of check) {
    if (group[0] >= (group[1] + group[2])) {
      return false;
    }
    if (group[0] <= Math.abs(group[1] - group[2])) {
      return false;
    }
  }

  return true;
}

// Desafio 13
function hydrate(drinks) {
  let matches = drinks.matchAll(/\d+/g);
  let amount = 0;

  for (let x of matches) {
    amount += Number(x[0]);
  }

  if (amount <= 1) {
    return `${amount} copo de água`;
  }
  return `${amount} copos de água`;
}
