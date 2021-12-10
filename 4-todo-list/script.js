const input = document.getElementById('texto-tarefa');
const addButton = document.getElementById('criar-tarefa');
const eraseAllButton = document.getElementById('apaga-tudo');
const eraseCompletedButton = document.getElementById('remover-finalizados');
const saveTasksButton = document.getElementById('salvar-tarefas');
const ol = document.getElementById('lista-tarefas');

function selectTask(ev) {
  const selected = document.querySelector('.selected');
  if (selected) {
    selected.classList.remove('selected');
  }
  ev.target.classList.add('selected');
}

function strikeTask(ev) {
  ev.target.classList.toggle('completed');
}

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

function createTaskFromInput() {
  const name = input.value;
  createTask(name, false);
  input.value = '';
}

function clearTasks() {
  const tasks = ol.children;
  while (tasks.length) {
    tasks[0].remove();
  }
}

function clearCompletedTasks() {
  const tasks = ol.children;
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].classList.contains('completed')) {
      tasks[i].remove();
      i -= 1;
    }
  }
}

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

function loadTasks() {
  if (!localStorage.tasks) { return; }
  clearTasks();
  const loadList = JSON.parse(localStorage.tasks);

  loadList.forEach(
    (task) => {
      createTask(task.name, task.completed);
    },
  );
}

addButton.addEventListener('click', createTaskFromInput);
eraseAllButton.addEventListener('click', clearTasks);
eraseCompletedButton.addEventListener('click', clearCompletedTasks);
saveTasksButton.addEventListener('click', saveTasks);
loadTasks();
