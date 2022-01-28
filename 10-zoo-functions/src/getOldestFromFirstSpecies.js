const data = require('../data/zoo_data');

const getOldestFromFirstSpecies = (id) => {
  const employee = data.employees.find((emp) => emp.id === id);
  const species = data.species.find((spec) => spec.id === employee.responsibleFor[0]);
  const oldest = species.residents.reduce((old, resid) => (resid.age > old.age ? resid : old));
  return Object.values(oldest);
};

module.exports = getOldestFromFirstSpecies;
