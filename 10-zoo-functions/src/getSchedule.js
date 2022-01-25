const data = require('../data/zoo_data');

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

module.exports = getSchedule;
