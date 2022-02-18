const circle = require('../src/circle');

describe('4 - Implemente os casos de teste para a função `circle`', () => {
  it('Verifica se ao receber um parâmetro que não seja um número, a função `circle` retorna undefined', () => {
    expect(circle('52')).toBeUndefined();
  });
  it('Verifica se ao receber um raio, a função `circle` retorna um objeto', () => {
    expect(typeof circle(25)).toBe('object');
  });
  it('Verifica se ao receber um raio, a função `circle` retorna um objeto contedos três propriedades', () => {
    expect(Object.keys(circle(8)).length).toBe(3);
  });
  it('Verifica se ao não receber nenhum parâmetro, a função `circle` retorna undefined', () => {
    expect(circle()).toBeUndefined();
  });
  it('Verifica se ao receber um raio, a função `circle` retorna um parâmetro com a circunferência correta', () => {
    expect(circle(2).circumference).toBeCloseTo(12.56);
  });
  it('Verifica se ao receber um raio, a função `circle` retorna um objeto contedos os valores esperados', () => {
    const targetCircle = {
      radius: 3,
      area: 28.26,
      circumference: 18.84,
    };
    for (let [key, value] of Object.entries(circle(3))) {
      expect(value).toBeCloseTo(targetCircle[key]);
    }
  });
});
