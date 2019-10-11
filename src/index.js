import {
  deleteAction,
  loadAction,
  completeAction,
  submitAction,
  saveAction,
  todoStore
} from "./actions";

const form = document.querySelector("form[name=todo]");
const todosListRoot = document.querySelector(".todos");

const todoTemplate = (id, name, checked = false, completed = false) => `
<ul class="todo-item ${completed ? "completed" : ""}" data-id="${id}">
  <input type="checkbox" ${checked && "checked"}/>
  <span class="todo-text">${name}</span>
  <span class="todo-trash"><i class="fas fa-trash-alt"></i></span>
</ul>
`;
const attachListeniers = () => {
  const todos = todosListRoot.querySelectorAll(".todo-item");

  for (let todo of todos) {
    const id = todo.getAttribute("data-id");
    todo
      .querySelector(".todo-trash")
      .addEventListener("click", deleteAction(id));
    todo
      .querySelector("input[type=checkbox]")
      .addEventListener("click", completeAction(id));
    todo
      .querySelector(".todo-text")
      .addEventListener("click", completeAction(id));
  }
};

export const renderTodos = () => {
  const todosHtml = todoStore
    .map((todo, index) =>
      todoTemplate(index, todo.name, todo.checked, todo.completed)
    )
    .join("")
    .trim();

  todosListRoot.innerHTML = todosHtml;
  attachListeniers();
  saveAction();
};

form.addEventListener("submit", submitAction);

loadAction();
