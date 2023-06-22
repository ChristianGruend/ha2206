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
    taskItem.innerHTML = `<strong>${task.title}</strong><br>${task.description}<br>Fälligkeitsdatum: ${task.dueDate}`;
    tasksList.appendChild(taskItem);
  });
});
