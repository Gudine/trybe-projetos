const regex = /^(\w+)\(([^\n)]+)\)$/
const prompt = document.querySelector('.prompt');

const functDict = { 
  compareTrue, calcArea, splitSentence, concatName,
  footballPoints, highestCount, catAndMouse, fizzBuzz,
  encode, decode, techList, generatePhoneNumber,
  triangleCheck, hydrate, 
};

function execFunction(match) {
  if (!match) {
    return "ERRO: Formatação invalida."
  }
  let funct, params;
  
  try {
    funct = functDict[match[1]]
  } catch {
    return "ERRO: Função não reconhecida."
  }
  
  try {
    params = JSON.parse(`[${match[2]}]`);
  } catch {
    return "ERRO: Parâmetros inválidos."
  }

  return funct(...params);
}

function sendCommand(ev) {
  if (ev.key !== 'Enter') { return; }
  ev.preventDefault();

  ev.target.contentEditable = false;

  const match = ev.target.innerText.match(regex);
  generateOutput(JSON.stringify(execFunction(match)));
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
