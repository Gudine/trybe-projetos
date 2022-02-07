const clearMatch = /^(clear|console\.clear\(\))$/;
const mainMatch = /^(\w+)\(([^)]*)\)(?:(?:\[[^\]]+\])|(?:\.\w+))*$/;
const dataMatch = /^data(?:(?:\[[^\]]+\])|(?:\.\w+))*$/;
const keysMatch = /(?:(?:\[([^\]]+)\])|(?:\.(\w+)))/g;
const prompt = document.querySelector('.prompt');
const animals = ['🐒', '🦍', '🦧', '🐕', '🐺', '🦊', '🦝', '🐈', '🦁', '🐅', '🐎', '🦄', '🦓', '🦌', '🦬', '🐂', '🐄', '🐖', '🐗', '🐏', '🐑', '🐐', '🐪', '🦙', '🦒', '🐘', '🦣', '🦏', '🦛', '🐁', '🐹', '🐇', '🐿️', '🦫', '🦔', '🦇', '🐻', '🐨', '🐼', '🦥', '🦦', '🦨', '🦘', '🦡', '🦃', '🐔', '🐓', '🐦', '🐧', '🕊️', '🦅', '🦆', '🦢', '🦉', '🦤', '🦩', '🦚', '🦜', '🐸', '🐊', '🐢', '🦎', '🐍', '🐉', '🐳', '🐬', '🦭', '🐟', '🐠', '🐡', '🦈', '🐙', '🐌', '🦋', '🐛', '🐜', '🐝', '🪲', '🐞', '🦗', '🪳', '🕷️', '🦂', '🦟', '🪰', '🪱'];

const randomizeAnimals = () => {
  const header = document.querySelector('h1');
  header.dataset.animalBefore = animals[parseInt(Math.random() * animals.length)];
  header.dataset.animalAfter = animals[parseInt(Math.random() * animals.length)];
}

const functDict = {
  getSpeciesByIds, getAnimalsOlderThan, getEmployeeByName,
  getRelatedEmployees, countAnimals,
  calculateEntry, getAnimalMap,
  getSchedule, getOldestFromFirstSpecies,
  getEmployeesCoverage, 
};

const generateInput = () => {
  const p = document.createElement('p');
  p.classList.add('input');

  const span = document.createElement('span');
  span.contentEditable = true;
  span.spellcheck = false;
  span.addEventListener('keydown', sendCommand);
  span.addEventListener("paste", overridePaste);

  p.appendChild(span);
  prompt.appendChild(p);
  const range = document.createRange();
  span.focus();
  range.selectNodeContents(span);
};

const generateOutput = (text) => {
  const p = document.createElement('p');
  p.classList.add('output');
  p.innerText = text;
  prompt.appendChild(p);
};

const getKeys = (base, match) => {
  const keys = [...match.input.matchAll(keysMatch)].map((key) => key[1] || `"${key[2]}"`);
  try {
    keys.forEach((key) => {
      base = base[JSON.parse(`[${key}]`)[0]];
    });
  } catch {
    return "ERRO: Parâmetros inválidos.";
  }

  return base;
}

const getData = (match) => {
  if (!match) return "ERRO: Formatação invalida.";
  
  return getKeys(data, match);
}

const execFunction = (match) => {
  if (!match) return "ERRO: Formatação invalida.";

  let funct, params;
  
  try {
    funct = functDict[match[1]];
  } catch {
    return "ERRO: Função não reconhecida.";
  }
  
  try {
    params = JSON.parse(`[${match[2]}]`);
  } catch {
    return "ERRO: Parâmetros inválidos.";
  }

  try {
    return getKeys(funct(...params), match);
  } catch (error) {
    return `ERRO DA FUNÇÃO: ${error.message}`;
  }
};

const sendCommand = (ev) => {
  if (ev.key !== 'Enter') return;
  ev.preventDefault();

  ev.target.contentEditable = false;
  
  const text = ev.target.innerText;
  let result;

  if (text.match(clearMatch)) {
    prompt.innerHTML = '';
    generateInput();
    return;
  };

  if (text.match(dataMatch)) result = getData(text.match(dataMatch));
  else result = execFunction(text.match(mainMatch));

  generateOutput(JSON.stringify(result, null, 2));
  generateInput();
};

const overridePaste = (ev) => {
  // Código adaptado de:
  // https://stackoverflow.com/questions/12027137/
  ev.preventDefault();
  let text = ev.clipboardData.getData('text/plain');

  // Código adaptado de:
  // https://stackoverflow.com/questions/2920150/
  const sel = window.getSelection();
  const range = sel.getRangeAt(0);
  range.deleteContents();
  range.insertNode(document.createTextNode(text));
  range.setStart(range.startContainer, range.endOffset);
};

randomizeAnimals();
generateInput();
