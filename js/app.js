const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('button, new-task');
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
const completeTaskHolder = document.getElementById('completed-tasks');

const createNewTaskElement = taskString => {
  const listItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  checkBox.type = 'checkBox';
  editInput.type = 'text';
  editButton.textContent = 'Edit';
  editButton.className = 'edit';
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'delete';
  label.textContent = taskString;

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};


const addTask = () => {
  if (taskInput.value) {
    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = '';
  }
};

const deleteTask = () => {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const editTask = function() {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type=text]');
  const editButton = listItem.querySelector('button, edit');
  const label = listItem.querySelector('label');
  const containsClass = listItem.classList.contains('editMode');

  if (editButton.textContent === 'Edit') {
    editButton.textContent = 'Save';
  } else {
    editButton.textContent = 'Edit';
  }

  if (containsClass) {
    label.textContent = editInput.value;
  } else {
    editInput.value = label.textContent;
  }
  listItem.classList.toggle('editMode');
};

const taskCompleted = function() {
  let listItem = this.parentNode;
  completeTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function() {
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener('click', addTask);

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completeTaskHolder.children.length; i++) {
  bindTaskEvents(completeTaskHolder.children[i], taskIncomplete);
}
