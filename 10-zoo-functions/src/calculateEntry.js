const data = require('../data/zoo_data');

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

module.exports = { calculateEntry, countEntrants };
