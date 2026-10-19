const form = document.getElementById("form");
const input = document.getElementById("input");
const list = document.getElementById("list");
const errorMessage = document.querySelector(".error-message");

let tasks = [];
const render = () => {
  list.innerHTML = "";

  tasks.forEach((task) => {

    const row = document.createElement("div");
    row.className = "task";

    let content;

    if (task.isEditing) {
      content = document.createElement("input");
      content.className = "edit-input";
      content.value = task.draft;

      content.addEventListener("input", () => {
        task.draft = content.value;
      });
    } else {
      content = document.createElement("p");
      content.textContent = task.text;

      if (task.completed) {
        content.classList.add("completed");
      }

    
      content.addEventListener("click", () => {
        task.completed = !task.completed;
        render();
      });
    }


    const editBtn = document.createElement("button");
    if (task.isEditing) {
      editBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    } else {
      editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    }

    editBtn.addEventListener("click", () => {
      if (task.isEditing) {

        if (task.draft.trim() !== "") {
          task.text = task.draft.trim();
        }
        task.isEditing = false;
      } else {

        task.isEditing = true;
        task.draft = task.text;
      }
      render();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      render();
    });

    const icons = document.createElement("div");
    icons.className = "icons";
    icons.appendChild(editBtn);
    icons.appendChild(deleteBtn);

    row.appendChild(content);
    row.appendChild(icons);
    list.appendChild(row);
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
  tasks.push({
    id: Date.now(),
    text: text,
    completed: false,
    isEditing: false,
    draft: "",
  });
  input.value = "";
  render();
});

render();