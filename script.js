// Select elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task event listener
addTaskBtn.addEventListener("click", addTask);

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = { text: taskText, completed: false };
  saveTaskToLocal(task);
  renderTask(task);

  taskInput.value = ""; // Clear input field
}

// Function to render a single task
function renderTask(task) {
  const li = document.createElement("li");
  li.className = task.completed ? "completed" : "";
  li.innerHTML = `
    <span>${task.text}</span>
    <div>
      <button class="complete-btn">✓</button>
      <button class="delete-btn">✗</button>
    </div>
  `;

  // Add event listeners to buttons
  li.querySelector(".complete-btn").addEventListener("click", () => toggleTaskCompletion(li, task.text));
  li.querySelector(".delete-btn").addEventListener("click", () => deleteTask(li, task.text));

  taskList.appendChild(li);
}

// Function to toggle task completion
function toggleTaskCompletion(taskElement, taskText) {
  const tasks = getTasksFromLocal();
  const updatedTasks = tasks.map((task) => {
    if (task.text === taskText) {
      task.completed = !task.completed;
    }
    return task;
  });
  saveTasksToLocal(updatedTasks);

  taskElement.classList.toggle("completed");
}

// Function to delete a task
function deleteTask(taskElement, taskText) {
  const tasks = getTasksFromLocal();
  const updatedTasks = tasks.filter((task) => task.text !== taskText);
  saveTasksToLocal(updatedTasks);

  taskElement.remove();
}

// LocalStorage utility functions
function getTasksFromLocal() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToLocal(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveTaskToLocal(task) {
  const tasks = getTasksFromLocal();
  tasks.push(task);
  saveTasksToLocal(tasks);
}

// Load tasks from localStorage and render them
function loadTasks() {
  const tasks = getTasksFromLocal();
  tasks.forEach(renderTask);
}
