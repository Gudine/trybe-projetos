const input = document.getElementById('texto-tarefa');
const addButton = document.getElementById('criar-tarefa');
const eraseAllButton = document.getElementById('apaga-tudo');
const eraseCompletedButton = document.getElementById('remover-finalizados');
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

function clearTasks() {
  const elems = ol.children;
  while (elems.length) {
    elems[0].remove();
  }
}

function clearCompletedTasks() {
  const elems = ol.children;
  for (let i = 0; i < elems.length; i += 1) {
    if (elems[i].classList.contains('completed')) {
      elems[i].remove();
      i -= 1;
    }
  }
}

addButton.addEventListener('click', createTask);
eraseAllButton.addEventListener('click', clearTasks);
eraseCompletedButton.addEventListener('click', clearCompletedTasks);
