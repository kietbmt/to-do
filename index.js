const form = document.getElementById("form");
const input = document.getElementById("input");
const list = document.getElementById("list");
const errorMessage = document.querySelector(".error-message");

let tasks = [];
let editingId = null;

const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
  render();
};

const saveEdit = (id, newText) => {
  newText = newText.trim();

  if (newText !== "") {
    const task = tasks.find((t) => t.id === id);
    task.text = newText;
  }

  editingId = null;
  render();
};

const render = () => {
  list.innerHTML = "";

  tasks.forEach((task) => {
    const row = document.createElement("div");
    row.className = "task";

    let content;
    if (task.id === editingId) {
      content = document.createElement("input");
      content.value = task.text;
      content.className = "edit-input";
      content.addEventListener("keydown", (e) => {
        if (e.key === "Enter") saveEdit(task.id, content.value);
      });
    } else {
      content = document.createElement("p");
      content.textContent = task.text;
    }

    const editBtn = document.createElement("button");
    editBtn.innerHTML = task.id === editingId
      ? '<i class="fa-solid fa-check"></i>'
      : '<i class="fa-solid fa-pen-to-square"></i>';
    editBtn.addEventListener("click", () => {
      if (task.id === editingId) {
        saveEdit(task.id, content.value);
      } else {
        editingId = task.id;
        render();
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
    });

    const icons = document.createElement("div");
    icons.className = "icons";
    icons.appendChild(editBtn);
    icons.appendChild(deleteBtn);

    row.appendChild(content);
    row.appendChild(icons);
    list.appendChild(row);

    if (task.id === editingId) content.focus();
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();

  if (text === "") {
    errorMessage.textContent = "Vui lòng nhập công việc!";
    return;
  }

  errorMessage.textContent = "";
  tasks.push({ id: Date.now(), text });
  input.value = "";
  render();
});

render();