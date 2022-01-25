const data = require('../data/zoo_data');

const getAnimalsOlderThan = (animal, age) => {
  const currSpec = data.species.find((spec) => animal === spec.name);
  return currSpec.residents.every((currResid) => currResid.age >= age);
};

module.exports = getAnimalsOlderThan;
