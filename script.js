const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach(addTaskToDOM);
}

function saveTasks() {
  const tasks = Array.from(taskList.children).map((li) => ({
    text: li.querySelector("span").innerText,
    completed: li.classList.contains("completed"),
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTaskToDOM(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = task.text;

  if (task.completed) li.classList.add("completed");

  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.classList.add("delete");
  delBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.append(span, delBtn);
  taskList.appendChild(li);
}

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return alert("Please enter a task!");
  const newTask = { text, completed: false };
  addTaskToDOM(newTask);
  saveTasks();
  taskInput.value = "";
});

window.addEventListener("DOMContentLoaded", loadTasks);
