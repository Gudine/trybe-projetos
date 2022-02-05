const average = (arr) => {
  if (!arr.length) { return undefined; }
  for (let item of arr) {
    if (typeof item !== 'number') { return undefined; }
  }
  return Math.round(arr.reduce((a, b) => a + b) / arr.length);
};

module.exports = average;
