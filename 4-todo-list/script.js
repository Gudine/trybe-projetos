/* Coloca vários elementos em variáveis. Em ordem:
* Lista de tarefas
* Espaço para digitar tarefas
* Botão para criar tarefas a partir do texto
* Botão para apagar todas as tarefas
* Botão para apagar todas as tarefas completadas
* Botão para salvar tarefas no localStorage
*/

const taskSelector = '#lista-tarefas li';
const ol = document.getElementById('lista-tarefas');
const input = document.getElementById('texto-tarefa');
const addButton = document.getElementById('criar-tarefa');
const removeAllButton = document.getElementById('apaga-tudo');
const removeCompletedButton = document.getElementById('remover-finalizados');
const saveTasksButton = document.getElementById('salvar-tarefas');
let pointer;

// Faz um risco na tarefa clicada duas vezes
function markTaskAsCompleted(ev) {
  ev.target.parentNode.classList.toggle('completed');
}

// Apaga a tarefa selecionada
function removeTask(ev) {
  ev.target.parentNode.remove();
}

function taskDragStart(ev) {
  const elem = ev.target.parentNode;
  const height = elem.offsetHeight / 2;
  ev.dataTransfer.setDragImage(elem, 32, height);

  const pos = [...document.querySelectorAll(taskSelector)].indexOf(elem);
  ev.dataTransfer.setData('text/plain', pos);
}

function refreshPointerPos(tasks, taskPos, y) {
  for (let i = 0; i < taskPos.length; i += 1) {
    if (y < taskPos[i]) {
      pointer.style.display = null;
      tasks[i].insertAdjacentElement('beforebegin', pointer);
      return;
    }
  }
  pointer.style.display = null;
  tasks[tasks.length - 1].insertAdjacentElement('afterend', pointer);
}

function taskDragOver(ev) {
  ev.preventDefault();
  const y = ev.pageY;

  const tasks = document.querySelectorAll(taskSelector);
  const taskPos = [];
  tasks.forEach(
    (task) => {
      taskPos.push(
        task.getBoundingClientRect().top + task.getBoundingClientRect().height / 2,
      );
    },
  );

  refreshPointerPos(tasks, taskPos, y);
}

function taskDrop(ev) {
  const pos = parseInt(ev.dataTransfer.getData('text/plain'), 10);
  const elem = [...document.querySelectorAll(taskSelector)][pos];
  pointer.insertAdjacentElement('beforebegin', elem);
  ol.children[0].insertAdjacentElement('beforebegin', pointer);
  pointer.style.display = 'none';
}

function taskDragLeave(ev) {
  if (ev.target === document.querySelector('html')) {
    pointer.style.display = 'none';
  }
}

document.addEventListener('drop', taskDrop);
document.addEventListener('dragenter', (ev) => ev.preventDefault());
document.addEventListener('dragover', taskDragOver);
document.addEventListener('dragleave', taskDragLeave);
// Cria uma tarefa no final da lista,
// dado o nome da tarefa e status de completação

function makeX() {
  const elem = document.createElement('span');
  elem.classList.add('x');
  elem.innerText = 'x';
  elem.addEventListener('click', removeTask);
  return elem;
}

function makeDrag() {
  const elem = document.createElement('span');
  elem.classList.add('drag');
  elem.innerText = '᎒᎒᎒';
  elem.draggable = true;
  elem.addEventListener('dragstart', taskDragStart);
  return elem;
}

function makeCheck() {
  const elem = document.createElement('span');
  elem.classList.add('check');
  elem.innerText = '✓';
  elem.addEventListener('click', markTaskAsCompleted);
  return elem;
}

function createSubElems(name) {
  const spans = [];
  spans.push(makeX());
  spans.push(makeDrag());
  spans.push(makeCheck());

  spans.push(document.createElement('span'));
  spans[3].classList.add('content');
  spans[3].innerText = name;

  return spans;
}

function createTask(name, completed) {
  const li = document.createElement('li');
  if (completed) {
    li.classList.add('completed');
  }

  const spans = createSubElems(name);
  spans.forEach((span) => li.appendChild(span));

  ol.appendChild(li);
}

// Pega o texto do input, e cria
// uma tarefa com esses dados
function createTaskFromInput(ev) {
  if (ev.type === 'keyup' && ev.key !== 'Enter') {
    return;
  }
  const name = input.value;
  createTask(name, false);
  input.value = '';
}

// Apaga todas as tarefas
function removeAllTasks() {
  const tasks = ol.children;
  while (tasks.length > 1) {
    tasks[1].remove();
  }
}

// Apaga todas as tarefas completadas
function removeCompletedTasks() {
  const tasks = ol.children;
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].classList.contains('completed')) {
      tasks[i].remove();
      i -= 1;
    }
  }
}

// Salva todas as tarefas no localStorage
function saveTasks() {
  const saveList = [];
  const tasks = [...ol.children].slice(1);

  tasks.forEach(
    (task) => {
      const taskObj = { name: null, completed: false };
      taskObj.name = task.children[3].innerText;
      if (task.classList.contains('completed')) {
        taskObj.completed = true;
      }
      saveList.push(taskObj);
    },
  );
  localStorage.tasks = JSON.stringify(saveList);
}

function makePointer() {
  pointer = document.createElement('div');
  pointer.id = 'pointer';
  pointer.style.display = 'none';
  ol.appendChild(pointer);
}
// Pega todas as tarefas do localStorage,
// e adiciona elas na página
function loadTasks() {
  if (!localStorage.tasks) { return; }
  removeAllTasks();
  const loadList = JSON.parse(localStorage.tasks);

  loadList.forEach(
    (task) => {
      createTask(task.name, task.completed);
    },
  );
}

// Adiciona escutadores de cada função
// para o respective botão
addButton.addEventListener('click', createTaskFromInput);
input.addEventListener('keyup', createTaskFromInput);
removeAllButton.addEventListener('click', removeAllTasks);
removeCompletedButton.addEventListener('click', removeCompletedTasks);
saveTasksButton.addEventListener('click', saveTasks);

makePointer();
loadTasks();
