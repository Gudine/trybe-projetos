const data = require('../data/zoo_data');

const countAnimals = (animal) => {
  if (animal === undefined) {
    return data.species.reduce((list, spec) => ({
      ...list,
      [spec.name]: spec.residents.length,
    }), {});
  }
  const { specie, sex } = animal;
  const resids = data.species.find((spec) => spec.name === specie).residents;
  if (Object.keys(animal).length <= 1) return resids.length;
  return resids.filter((resid) => resid.sex === sex).length;
};

module.exports = countAnimals;
