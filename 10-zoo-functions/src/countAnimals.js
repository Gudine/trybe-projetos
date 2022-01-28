const data = require('../data/zoo_data');

const countAnimals = ({ specie, sex } = {}) => {
  if (!specie) {
    return data.species.reduce((list, spec) => ({
      ...list,
      [spec.name]: spec.residents.length,
    }), {});
  }
  const resids = data.species.find((spec) => spec.name === specie).residents;
  if (!sex) return resids.length;
  return resids.filter((resid) => resid.sex === sex).length;
};

module.exports = countAnimals;
