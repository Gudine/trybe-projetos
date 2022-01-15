const button = document.querySelector('#buttonSubmit');
button.addEventListener('click', (ev) => {
  const emailInput = document.querySelector('#emailInput');
  const passwordInput = document.querySelector('#passwordInput');
  if (emailInput.value === 'tryber@teste.com' && passwordInput.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
  ev.preventDefault();
});

const agreement = document.getElementById('agreement');
const submitBtn = document.getElementById('submit-btn');
function enableSubmit(ev) {
  if (ev.target.checked) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

agreement.addEventListener('change', enableSubmit);

const textarea = document.getElementById('textarea');
const caracteresRestantes = document.getElementById('counter');

textarea.addEventListener('input', (ev) => {
  caracteresRestantes.innerHTML = (500 - ev.target.value.length);
});

const nameAndLastname = document.getElementById('nameAndLastname');
const emailAndHouse = document.getElementById('emailAndHouse');
const radioFamily = document.querySelector('.radio-family');
const checkbox = document.querySelector('.checkbox');
const rateContainer = document.querySelector('.rate-container');
const textAreaCont = document.querySelector('.textarea-container');

// Requisito 21
function getCheckboxValues(form) {
  const result = [];
  [...form.subject].forEach((x) => {
    if (x.checked) {
      result.push(x.value);
    }
  });

  return result;
}

function replaceEmail(parent, form) {
  const email = document.createElement('p');
  email.innerHTML = `Email: ${form.email.value}`;
  email.className = 'result';

  const house = document.createElement('p');
  house.innerHTML = `Casa: ${form.house.value}`;
  house.className = 'result';

  parent.innerHTML = '';
  parent.appendChild(email);
  parent.appendChild(house);
}

function replaceElem(parent, text) {
  const elem = document.createElement('p');
  elem.innerHTML = text;
  elem.className = 'result';
  parent.innerHTML = '';
  parent.appendChild(elem);
}

function replaceForm(ev) {
  const { form } = ev.target;

  replaceElem(nameAndLastname, `Nome: ${form.name.value} ${form.lastname.value}`);

  replaceEmail(emailAndHouse, form);

  replaceElem(radioFamily, `Família: ${form.family.value}`);
  replaceElem(checkbox, `Matérias: ${getCheckboxValues(form).join(', ')}`);
  replaceElem(rateContainer, `Avaliação: ${form.rate.value}`);
  replaceElem(textAreaCont, `Observações: ${form.textarea.value}`);

  document.querySelector('.agreement-container').innerHTML = '';
  ev.preventDefault();
}

submitBtn.addEventListener('click', replaceForm);

function generateRate() {
  const rateSubContainer = document.querySelector('.rate-subcontainer');
  for (let i = 1; i <= 10; i += 1) {
    const label = document.createElement('label');
    label.htmlFor = `rate-${i}`;

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'rate';
    input.id = `rate-${i}`;
    input.value = i;

    label.appendChild(input);
    label.appendChild(document.createTextNode(i));

    rateSubContainer.appendChild(label);
  }
}

window.onload = generateRate;
