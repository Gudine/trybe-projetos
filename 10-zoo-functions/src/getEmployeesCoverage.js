const data = require('../data/zoo_data');

const getEmployee = (targetId, targetName) => {
  if (targetId !== undefined) {
    return data.employees
      .find((employee) => employee.id === targetId);
  }
  return data.employees
    .find((employee) => [employee.firstName, employee.lastName].includes(targetName));
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

const getEmployeesCoverage = ({ id, name } = {}) => {
  if (id === undefined && name === undefined) {
    return data.employees
      .reduce((list, employee) => list.concat([getSingleEmployeeCoverage(employee)]), []);
  }
  return getSingleEmployeeCoverage(getEmployee(id, name));
};

module.exports = getEmployeesCoverage;
