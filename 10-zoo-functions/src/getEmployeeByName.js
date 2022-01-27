const data = require('../data/zoo_data');

const getEmployeeByName = (employeeName) => {
  const result = data.employees.find((employee) =>
    ([employee.firstName, employee.lastName].includes(employeeName)));
  return (result || {});
};

module.exports = getEmployeeByName;
