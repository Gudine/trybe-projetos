const getCharacter = require('../src/getCharacter');

describe('9 - Implemente os casos de teste da função `getCharacter`', () => {
  it('Verifica se ao não receber nenhum parâmetro, a função `getCharacter` retorna undefined', () => {
    expect(getCharacter()).toBeUndefined();
  });
  it('Verifica se ao receber o parâmetro "Arya", a função `getCharacter` retorna o objeto correto', () => {
    expect(getCharacter('Arya')).toEqual({
      name: 'Arya Stark',
      class: 'Rogue',
      phrases: [ 'Not today', 'A girl has no name.' ],
    });
  });
  it('Verifica se ao receber o parâmetro "Brienne", a função `getCharacter` retorna o objeto correto', () => {
    expect(getCharacter('Brienne')).toEqual({
      name: 'Brienne Tarth',
      class: 'Knight',
      phrases: [ 'Im No Lady, Your Grace.', 'I, Brienne Of Tarth, Sentence You To Die.' ],
    });
  });
  it('Verifica se ao receber o parâmetro "Melissandre", a função `getCharacter` retorna o objeto correto', () => {
    expect(getCharacter('Melissandre')).toEqual({
      name: 'Melissandre',
      class: 'Necromancer',
      phrases: [ 'Death By Fire Is The Purest Death.', 'For The Night Is Dark And Full Of Terrors.' ],
    });
  });
  it('Verifica se o parâmetro recebido pela função `getCharacter` é Case Insensitive', () => {
    expect(getCharacter('aRyA')).toEqual(getCharacter('ArYa'));
    expect(getCharacter('briEnne')).toEqual(getCharacter('Brienne'));
    expect(getCharacter('MELISSANDRE')).toEqual(getCharacter('MelissandrE'));
  });
  it('Verifica se ao receber um nome que não está presente, a função `getCharacter` retorna undefined', () => {
    expect(getCharacter('Cersei')).toBeUndefined();
  });
});
