const productDetails = require('../src/productDetails');

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  it('Verifica se a variável `productDetails` é uma função', () => {
    expect(typeof productDetails).toBe('function');
  });
  it('Verifica se a função `productDetails` retorna um array', () => {
    expect(Array.isArray(productDetails())).toBe(true);
  });
  it('Verifica se a função `productDetails` retorna um array com dois itens', () => {
    expect(productDetails()).toHaveLength(2);
  });
  it('Verifica se os itens retornados pela função `productDetails` são objetos', () => {
    for (let item of productDetails()) {
      expect(typeof item).toBe('object');
    }
  });
  it('Verifica se os itens retornados pela função `productDetails` são diferentes entre si', () => {
    const obj = productDetails('Desodorante', 'Escova de Dentes');
    expect(obj[0]).not.toEqual(obj[1]);
  });
  it('Verifica se os objetos retornados pela função `productDetails` têm os parâmetros details.productId adequados', () => {
    for (let item of productDetails()) {
      expect(item.details.productId).toMatch(/123$/);
    }
  });
});
