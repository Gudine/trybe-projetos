const fetchProducts = async (keyword) => {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${keyword}`;
  const query = await fetch(endpoint)
    .then((response) => response.json())
    .then((response) => response);

  return query;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
