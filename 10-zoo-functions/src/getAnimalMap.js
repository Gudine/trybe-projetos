const data = require('../data/zoo_data');

const getSingleElem = (animal, { includeNames, sex, sorted }) => {
  if (!includeNames) {
    return animal.name;
  }

  const elem = { [animal.name]: animal.residents };

  if (sex !== undefined) {
    elem[animal.name] = elem[animal.name]
      .filter((indiv) => indiv.sex === sex);
  }

  elem[animal.name] = elem[animal.name].map((indiv) => indiv.name);

  if (sorted) {
    elem[animal.name].sort();
  }

  return elem;
};

const getAnimalMap = (options) => data.species.reduce((acc, animal) => {
  const result = { ...acc };
  if (options !== undefined) {
    result[animal.location].push(getSingleElem(animal, options));
  } else {
    result[animal.location].push(animal.name);
  }

  return result;
}, { NE: [], NW: [], SE: [], SW: [] });

module.exports = getAnimalMap;
