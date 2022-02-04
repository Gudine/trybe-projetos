const mainMatch = /^(\w+)\(([^\n)]+)\)(?:(?:\[[^\n\]]+\])|(?:\.\w+))*$/;
const keysMatch = /(?<=^(?:\w+)\((?:[^\n)]+)\).*)(?:(?:\[([^\n\]]+)\])|(?:\.(\w+)))/g;
const prompt = document.querySelector('.prompt');

const functDict = {
  getSpeciesByIds, getAnimalsOlderThan, getEmployeeByName,
  isManager, getRelatedEmployees, countAnimals, countEntrants,
  calculateEntry, getSingleElem, getAnimalMap, getFullSchedule,
  getSchedule, getOldestFromFirstSpecies, getEmployee,
  getSingleEmployeeCoverage, getEmployeesCoverage, 
};

function execFunction(match) {
  if (!match) return "ERRO: Formatação invalida."
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

  let result = funct(...params);
  const keys = [...match.input.matchAll(keysMatch)].map((key) => key[1] || `"${key[2]}"`);
  try {
    keys.forEach((key) => {
      console.log(key);
      result = result[JSON.parse(`[${key}]`)[0]];
    });
  } catch {
    return "ERRO: Parâmetros inválidos.";
  }

  return result;
}

function sendCommand(ev) {
  if (ev.key !== 'Enter') { return; }
  ev.preventDefault();

  ev.target.contentEditable = false;

  const match = ev.target.innerText.match(mainMatch);
  generateOutput(JSON.stringify(execFunction(match), null, 2));
  generateInput();
}

function overridePaste(ev) {
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
}

function generateInput() {
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
}

function generateOutput(text) {
  const p = document.createElement('p');
  p.classList.add('output');
  p.innerText = text;
  prompt.appendChild(p);
}

generateInput();
