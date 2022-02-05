const restaurant = {};

const orderFromMenu = (product) => { restaurant.consumption.push(product); };

const getPayment = () => {
  const priceList = { ...restaurant.fetchMenu().food, ...restaurant.fetchMenu().drink };
  return restaurant.consumption.reduce((a, b) => a + priceList[b], 0) * 1.1;
};

const createMenu = (obj) => {
  Object.assign(restaurant, {
    fetchMenu: (() => obj),
    consumption: [],
    order: orderFromMenu,
    pay: getPayment,
  });
  return restaurant;
};

module.exports = createMenu;
