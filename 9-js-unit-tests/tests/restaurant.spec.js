const createMenu = require('../src/restaurant');

describe('10 - Implemente os casos de teste e a função `createMenu`', () => {
  it('Verifica se a função `createMenu` retorna um objeto com a chave fetchMenu, que possui uma função', () => {
    expect(createMenu()).toHaveProperty('fetchMenu');
    expect(typeof createMenu().fetchMenu).toBe('function');
  });
  it('Verifica se a função `fetchMenu` retorna um objeto com as chaves food e drink, dado que a função `createMenu` recebeu como parâmetro um objeto com chaves food e drink', () => {
    expect(Object.keys(createMenu({ food: {}, drink: {} }).fetchMenu()))
      .toEqual(['food', 'drink']);
  });
  it('Verifica se o objeto retornado da função `fetchMenu` é idêntico ao passado à função `createMenu`', () => {
    expect(createMenu({ food: 1851942, drink: 'Sample Text' }).fetchMenu())
      .toEqual({ food: 1851942, drink: 'Sample Text' });
  });
  it('Verifica se a função `createMenu` retorna um objeto que possui uma chave `consumption`, contendo uma array vazia', () => {
    expect(createMenu().consumption).toEqual([]);
  });
  it('Verifica se, após chamar a função da chave `order` com uma string como parâmetro, essa string é adicionada ao array da chave `consumption`', () => {
    const menu = createMenu();
    menu.order('coxinha');
    expect(menu.consumption).toEqual(['coxinha']);
  });
  it('Verifica se, ao adicionar três pedidos através da função `order`, o array da chave `consumption` contém todos os pedidos', () => {
    const menu = createMenu();
    menu.order('coxinha');
    menu.order('agua');
    menu.order('sopa');
    menu.order('sashimi');
    expect(menu.consumption).toEqual(['coxinha', 'agua', 'sopa', 'sashimi']);
  });
  it('Verifica se a função `order` adiciona itens repetidos ao array da chave `consumption`', () => {
    const menu = createMenu();
    menu.order('coxinha');
    menu.order('agua');
    menu.order('coxinha');
    expect(menu.consumption).toEqual(['coxinha', 'agua', 'coxinha']);
  });
  it('Verifica se a função da chave `pay` retorna o preço total de todos os pedidos da chave `consumption`, com 10% de acréscimo', () => {
    const paymentTest = createMenu({
      food: { coxinha: 5, risoto: 15, mousse: 12 },
      drink: { agua: 2 },
    });
    paymentTest.order('coxinha');
    paymentTest.order('agua');
    paymentTest.order('risoto');
    paymentTest.order('mousse');
    expect(paymentTest.pay()).toBeCloseTo(37.4);
  });
});
