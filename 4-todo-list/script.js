const input = document.getElementById('texto-tarefa');
const button = document.getElementById('criar-tarefa');
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

function createTask() {
  const li = document.createElement('li');
  li.innerText = input.value;
  li.addEventListener('click', selectTask);
  li.addEventListener('dblclick', strikeTask);

  ol.appendChild(li);
  input.value = '';
}

button.addEventListener('click', createTask);
