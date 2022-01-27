const data = require('../data/zoo_data');

const getEmployee = (query) => {
  if (query.id !== undefined) {
    return data.employees
      .find((employee) => employee.id === query.id);
  }
  return data.employees
    .find((employee) => [employee.firstName, employee.lastName].includes(query.name));
};

const getSingleEmployeeCoverage = (employee) => {
  if (employee === undefined) throw new Error('Informações inválidas');

  const { id, firstName, lastName, responsibleFor } = employee;

  const speciesList = responsibleFor
    .map((speciesId) => data.species
      .find((spec) => spec.id === speciesId));
  return {
    id,
    fullName: `${firstName} ${lastName}`,
    species: speciesList.map((species) => species.name),
    locations: speciesList.map((species) => species.location),

  };
};

const getEmployeesCoverage = (options) => {
  if (options === undefined || (options.id === undefined && options.name === undefined)) {
    return data.employees
      .reduce((list, employee) => list.concat([getSingleEmployeeCoverage(employee)]), []);
  }
  return getSingleEmployeeCoverage(getEmployee(options));
};

module.exports = getEmployeesCoverage;
