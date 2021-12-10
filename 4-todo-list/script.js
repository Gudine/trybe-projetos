/* Coloca vários elementos em variáveis. Em ordem:
* Lista de tarefas
* Espaço para digitar tarefas
* Botão para criar tarefas a partir do texto
* Botão para apagar todas as tarefas
* Botão para apagar todas as tarefas completadas
* Botão para apagar a tarefa selecionada
* Botão para salvar tarefas no localStorage
* Botão para mover a tarefa selecionada para cima
* Botão para mover a tarefa selecionada para baixo
*/

const ol = document.getElementById('lista-tarefas');
const input = document.getElementById('texto-tarefa');
const addButton = document.getElementById('criar-tarefa');
const eraseAllButton = document.getElementById('apaga-tudo');
const eraseCompletedButton = document.getElementById('remover-finalizados');
const eraseSelectedButton = document.getElementById('remover-selecionado');
const saveTasksButton = document.getElementById('salvar-tarefas');
const moveUpButton = document.getElementById('mover-cima');
const moveDownButton = document.getElementById('mover-baixo');

// Seleciona a tarefa clicada
function selectTask(ev) {
  const selected = document.querySelector('.selected');
  if (selected) {
    selected.classList.remove('selected');
  }
  ev.target.classList.add('selected');
}

// Faz um risco na tarefa clicada duas vezes
function strikeTask(ev) {
  ev.target.classList.toggle('completed');
}

// Cria uma tarefa no final da lista,
// dado o nome da tarefa e status de completação
function createTask(name, completed) {
  const li = document.createElement('li');
  li.innerText = name;
  if (completed) {
    li.classList.add('completed');
  }
  li.addEventListener('click', selectTask);
  li.addEventListener('dblclick', strikeTask);

  ol.appendChild(li);
}

// Pega o texto do input, e cria
// uma tarefa com esses dados
function createTaskFromInput() {
  const name = input.value;
  createTask(name, false);
  input.value = '';
}

// Apaga todas as tarefas
function eraseTasks() {
  const tasks = ol.children;
  while (tasks.length) {
    tasks[0].remove();
  }
}

// Apaga todas as tarefas completadas
function eraseCompletedTasks() {
  const tasks = ol.children;
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].classList.contains('completed')) {
      tasks[i].remove();
      i -= 1;
    }
  }
}

// Apaga a tarefa selecionada
function eraseSelectedTask() {
  const selected = document.querySelector('.selected');
  selected.remove();
}

// Salva todas as tarefas no localStorage
function saveTasks() {
  const saveList = [];
  const tasks = [...ol.children];

  tasks.forEach(
    (task) => {
      const taskObj = { name: null, completed: false };
      taskObj.name = task.innerText;
      if (task.classList.contains('completed')) {
        taskObj.completed = true;
      }
      saveList.push(taskObj);
    },
  );
  localStorage.tasks = JSON.stringify(saveList);
}

// Pega todas as tarefas do localStorage,
// e adiciona elas na página
function loadTasks() {
  if (!localStorage.tasks) { return; }
  eraseTasks();
  const loadList = JSON.parse(localStorage.tasks);

  loadList.forEach(
    (task) => {
      createTask(task.name, task.completed);
    },
  );
}

// Move a tarefa selecionada para cima
function moveTaskUp() {
  const selected = document.querySelector('.selected');
  if (!selected) {
    console.log('ERRO: Nenhum item selecionado.');
    return;
  }
  if (!selected.previousElementSibling) {
    console.log('ERRO: Item selecionado é o primeiro.');
    return;
  }

  const prev = selected.previousElementSibling;
  prev.insertAdjacentElement('beforebegin', selected);
}

// Move a tarefa selecionada para baixo
function moveTaskDown() {
  const selected = document.querySelector('.selected');
  if (!selected) {
    console.log('ERRO: Nenhum item selecionado.');
    return;
  }
  if (!selected.nextElementSibling) {
    console.log('ERRO: Item selecionado é o último.');
    return;
  }

  const next = selected.nextElementSibling;
  next.insertAdjacentElement('afterend', selected);
}

// Adiciona escutadores de cada função
// para o respective botão
addButton.addEventListener('click', createTaskFromInput);
eraseAllButton.addEventListener('click', eraseTasks);
eraseCompletedButton.addEventListener('click', eraseCompletedTasks);
eraseSelectedButton.addEventListener('click', eraseSelectedTask);
saveTasksButton.addEventListener('click', saveTasks);
moveUpButton.addEventListener('click', moveTaskUp);
moveDownButton.addEventListener('click', moveTaskDown);

loadTasks();
