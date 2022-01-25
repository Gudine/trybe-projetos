const data = require('../data/zoo_data');

const isManager = (id) => {
  const managerList = data.employees.reduce((list, emp) => list.concat(emp.managers), []);
  return managerList.includes(id);
};

const getRelatedEmployees = (managerId) => {
  if (!isManager(managerId)) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  } else {
    return data.employees
      .filter((emp) => emp.managers.includes(managerId))
      .map((emp) => `${emp.firstName} ${emp.lastName}`);
  }
};

module.exports = { isManager, getRelatedEmployees };
