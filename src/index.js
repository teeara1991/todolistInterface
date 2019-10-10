import {
  deleteAction,
  visibleAction,
  editAction,
  loadAction,
  checkAction,
  completeAction,
  unCompleteAction,
  deleteCheckedteAction,
  submitAction,
  clearAction,
  saveAction,
  todoStore
} from "./actions";

const form = document.querySelector("form[name=todo]");
const buttons = document.querySelector("#buttons");
const todosListRoot = document.querySelector(".todos");
const buttonDelete = buttons.querySelector("#delete");
const buttonComplete = buttons.querySelector("#complete");
const buttonUnComplete = buttons.querySelector("#uncomplete");
const buttonClear = buttons.querySelector("#clear");
const buttonSave = buttons.querySelector("#save");

const todoTemplate = (id, name, checked = false, completed = false) => `
<li class="todo-item ${completed ? "completed" : ""}" data-id="${id}">
  <input type="checkbox" ${checked && "checked"}/>
  <input type="text" value="${name}" name="todo-edit" style="display: none;"/>
  <span class="todo-text">${name}</span>
  <span class="todo-trash"><i class="fas fa-trash-alt"></i></span>
  <span class="todo-edit"><i class="fas fa-edit"></i></span>
</li>
`;
const attachListeniers = () => {
  const todos = todosListRoot.querySelectorAll(".todo-item");

  for (let todo of todos) {
    const id = todo.getAttribute("data-id");
    todo
      .querySelector(".todo-trash")
      .addEventListener("click", deleteAction(id));
    todo
      .querySelector(".todo-edit")
      .addEventListener("click", visibleAction(id, todo));
    todo
      .querySelector("input[name=todo-edit]")
      .addEventListener("keydown", editAction(id, todo));
    todo
      .querySelector("input[type=checkbox]")
      .addEventListener("click", checkAction(id));
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
};

form.addEventListener("submit", submitAction);
buttonDelete.addEventListener("click", deleteCheckedteAction);
buttonComplete.addEventListener("click", completeAction);
buttonUnComplete.addEventListener("click", unCompleteAction);
buttonClear.addEventListener("click", clearAction);
buttonSave.addEventListener("click", saveAction);

loadAction();
