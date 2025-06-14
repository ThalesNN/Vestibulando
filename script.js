const calendar = document.getElementById("calendar");
const taskList = document.getElementById("taskList");
const modal = document.getElementById("taskModal");
const taskInput = document.getElementById("taskInput");
const deleteButton = document.getElementById("deleteButton");

let selectedDate = null;

// Carrega tarefas do localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || {};

// Cria os dias do mês
function renderCalendar() {
  calendar.innerHTML = "";
  for (let i = 1; i <= 30; i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.innerText = i;
    day.addEventListener("click", () => openModal(i));
    calendar.appendChild(day);
  }
}

// Mostra tarefas na lista
function renderTasks() {
  taskList.innerHTML = "";
  for (const date in tasks) {
    const li = document.createElement("li");
    li.innerText = `Dia ${date}: ${tasks[date]}`;
    taskList.appendChild(li);
  }
}

// Abre o modal para adicionar/editar tarefa
function openModal(date) {
  selectedDate = date;
  taskInput.value = tasks[date] || "";
  deleteButton.style.display = tasks[date] ? "inline-block" : "none";
  modal.classList.remove("hidden");
}

// Fecha o modal
function closeModal() {
  modal.classList.add("hidden");
  taskInput.value = "";
}

// Salva ou edita tarefa
function saveTask() {
  const task = taskInput.value.trim();
  if (task) {
    tasks[selectedDate] = task;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  closeModal();
  renderTasks();
}

// Exclui tarefa
function deleteTask() {
  delete tasks[selectedDate];
  localStorage.setItem("tasks", JSON.stringify(tasks));
  closeModal();
  renderTasks();
}

// Inicializa
renderCalendar();
renderTasks();
