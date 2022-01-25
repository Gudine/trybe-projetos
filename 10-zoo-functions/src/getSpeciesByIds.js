const data = require('../data/zoo_data');

const getSpeciesByIds = (...ids) => data.species.filter((spec) => ids.includes(spec.id));

module.exports = getSpeciesByIds;
