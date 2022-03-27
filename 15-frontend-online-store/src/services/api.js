export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  let url = '';
  if (categoryId && query) {
    url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  } else if (!categoryId) {
    url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  } else {
    url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  }
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getProduct(id) {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
