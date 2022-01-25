const data = require('../data/zoo_data');

const getEmployeeByName = (employeeName) => {
  const result = data.employees.find((employee) =>
    (employee.firstName === employeeName || employee.lastName === employeeName));
  return result !== undefined ? result : {};
};

module.exports = getEmployeeByName;
