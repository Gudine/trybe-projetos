const getSpeciesByIds = (...ids) => data.species.filter((spec) => ids.includes(spec.id));

/**********************************************/

const getAnimalsOlderThan = (animal, age) => {
  const currSpec = data.species.find((spec) => animal === spec.name);
  return currSpec.residents.every((currResid) => currResid.age >= age);
};

/**********************************************/

const getEmployeeByName = (employeeName) => {
  const result = data.employees.find((employee) =>
    ([employee.firstName, employee.lastName].includes(employeeName)));
  return (result || {});
};

/**********************************************/

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

/**********************************************/

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

/**********************************************/

const countEntrants = (entrants) => entrants.reduce((list, entrant) => {
  let ageRange;
  if (entrant.age < 18) ageRange = 'child';
  else if (entrant.age < 50) ageRange = 'adult';
  else ageRange = 'senior';

  return {
    ...list,
    [ageRange]: list[ageRange] + 1,
  };
}, { child: 0, adult: 0, senior: 0 });

const calculateEntry = (entrants) => {
  if (!entrants || !Object.keys(entrants).length) return 0;
  const { prices } = data;
  const ageList = countEntrants(entrants);

  return Object.entries(ageList).reduce((total, [key, value]) => total + prices[key] * value, 0);
};

/**********************************************/

const getSingleElem = (animal, { includeNames, sex, sorted }) => {
  if (!includeNames) return animal.name;

  const elem = { [animal.name]: animal.residents };

  if (sex) {
    elem[animal.name] = elem[animal.name]
      .filter((indiv) => indiv.sex === sex);
  }

  elem[animal.name] = elem[animal.name].map((indiv) => indiv.name);

  if (sorted) elem[animal.name].sort();

  return elem;
};

const getAnimalMap = (options = {}) => data.species.reduce((acc, animal) => {
  const result = { ...acc };
  result[animal.location].push(getSingleElem(animal, options));

  return result;
}, data.species.reduce((list, spec) => ({ ...list, [spec.location]: [] }), {}));

/**********************************************/

const getFullSchedule = () => Object.entries(data.hours)
  .reduce((list, [weekday, { open, close }]) => {
    const output = list;
    output[weekday] = {
      officeHour: `Open from ${open}am until ${close}pm`,
      exhibition: data.species
        .filter((animal) => animal.availability.includes(weekday))
        .map((animal) => animal.name),
    };
    if (weekday === 'Monday') {
      output[weekday] = {
        officeHour: 'CLOSED',
        exhibition: 'The zoo will be closed!',
      };
    }
    return output;
  }, {});

const getSchedule = (scheduleTarget) => {
  if (data.species.some((animal) => animal.name === scheduleTarget)) {
    return data.species.find((animal) => animal.name === scheduleTarget).availability;
  }

  const schedule = getFullSchedule();
  if (Object.keys(schedule).includes(scheduleTarget)) {
    return { [scheduleTarget]: schedule[scheduleTarget] };
  }

  return schedule;
};

/**********************************************/

const getOldestFromFirstSpecies = (id) => {
  const employee = data.employees.find((emp) => emp.id === id);
  const species = data.species.find((spec) => spec.id === employee.responsibleFor[0]);
  const oldest = species.residents.reduce((old, resid) => (resid.age > old.age ? resid : old));
  return Object.values(oldest);
};

/**********************************************/

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
