const fetchItem = async (itemId) => {
  const endpoint = `https://api.mercadolibre.com/items/${itemId}`;
  const query = await fetch(endpoint)
    .then((response) => response.json())
    .then((response) => response);

  return query;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
