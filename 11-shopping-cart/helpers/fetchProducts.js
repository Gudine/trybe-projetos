const fetchProducts = async (keyword) => {
  if (!keyword) return new Error('You must provide an url');
  
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
