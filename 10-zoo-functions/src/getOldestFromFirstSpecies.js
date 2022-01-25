const data = require('../data/zoo_data');

const getOldestFromFirstSpecies = (id) => {
  const employee = data.employees.find((emp) => emp.id === id);
  const speciesId = employee.responsibleFor
    .find((specId) => data.species
      .some((spec) => spec.id === specId));
  const species = data.species.find((spec) => spec.id === speciesId);
  const oldest = species.residents.reduce((old, resid) => (resid.age > old.age ? resid : old));
  return Object.values(oldest);
};

module.exports = getOldestFromFirstSpecies;
