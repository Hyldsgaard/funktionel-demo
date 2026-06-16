// Funktionel Tasks — a tiny vanilla-JS task list with localStorage persistence.
// No build step, no dependencies. Just open index.html in a browser.

const STORAGE_KEY = "funktionel-tasks";

// --- State ---------------------------------------------------------------

/** @type {{ id: string, text: string, completed: boolean }[]} */
let tasks = loadTasks();
let currentFilter = "all";

// --- DOM references ------------------------------------------------------

const form = document.getElementById("new-task-form");
const input = document.getElementById("new-task-input");
const list = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const taskCount = document.getElementById("task-count");
const clearCompletedBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter");

// --- Persistence ---------------------------------------------------------

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// --- Actions -------------------------------------------------------------

function addTask(text) {
  tasks.push({
    id: crypto.randomUUID(),
    text: text,
    completed: false,
  });
  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    render();
  }
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  render();
}

function clearCompleted() {
  tasks = tasks.filter((t) => !t.completed);
  saveTasks();
  render();
}

function setFilter(filter) {
  currentFilter = filter;
  filterButtons.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.filter === filter);
  });
  render();
}

// --- Rendering -----------------------------------------------------------

function getVisibleTasks() {
  if (currentFilter === "active") {
    return tasks.filter((t) => !t.completed);
  }
  if (currentFilter === "completed") {
    return tasks.filter((t) => t.completed);
  }
  return tasks;
}

function render() {
  const visible = getVisibleTasks();

  list.innerHTML = "";
  visible.forEach((task) => list.appendChild(createTaskElement(task)));

  emptyState.hidden = tasks.length !== 0;

  const remaining = tasks.filter((t) => !t.completed).length;
  taskCount.textContent = `${remaining} ${remaining === 1 ? "task" : "tasks"} left`;
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.className = "task" + (task.completed ? " is-completed" : "");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task__checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", () => toggleTask(task.id));

  const text = document.createElement("span");
  text.className = "task__text";
  text.textContent = task.text;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "task__delete";
  deleteBtn.textContent = "×";
  deleteBtn.setAttribute("aria-label", "Delete task");
  deleteBtn.addEventListener("click", () => deleteTask(task.id));

  li.append(checkbox, text, deleteBtn);
  return li;
}

// --- Events --------------------------------------------------------------

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask(input.value);
  input.value = "";
  input.focus();
});

clearCompletedBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => setFilter(btn.dataset.filter));
});

// --- Init ----------------------------------------------------------------

render();
