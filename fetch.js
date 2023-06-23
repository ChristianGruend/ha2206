const taskForm = document.querySelector('#task-form');
const getTasksButton = document.querySelector('#get-tasks');
const tasksList = document.querySelector('#tasks');

taskForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const taskData = {
    title: taskForm.title.value,
    description: taskForm.description.value,
    dueDate: taskForm.dueDate.value
  };
  await fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskData)
  });
  taskForm.reset();
});

getTasksButton.addEventListener('click', async () => {
  const response = await fetch('/tasks');
  const tasks = await response.json();
  tasksList.innerHTML = '';
  tasks.forEach((task) => {
    const taskItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
      updateTaskStatus(task._id, checkbox.checked ? 'done' : 'open');
    });
    taskItem.appendChild(checkbox);
    taskItem.innerHTML += `<strong>${task.title}</strong><br>${task.description}<br>Fälligkeitsdatum: ${task.dueDate}`;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Löschen';
    deleteButton.addEventListener('click', () => {
      deleteTask(task._id);
    });
    taskItem.appendChild(deleteButton);
    tasksList.appendChild(taskItem);
  });
  
  
});
//erledigt button
async function updateTaskStatus(id, status) {
  await fetch(`/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status })
  });
}

//löschen button
async function deleteTask(id) {
  await fetch(`/tasks/${id}`, {
    method: 'DELETE'
  });
  getTasksButton.click();
}
