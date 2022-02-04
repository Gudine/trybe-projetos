const saveCartItems = (elems) => {
  localStorage.setItem('cartItems', JSON.stringify(
    elems.map((elem) => {
      const { dataset: { sku, image, name, price }} = elem;
      return { sku, image, name, price };
    })
  ));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
