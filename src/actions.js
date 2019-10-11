import { renderTodos } from "./index";

export let todoStore = [{ name: "asdasd", checked: true, completed: false }];

const deleteAction = index => event => {
  todoStore.splice(index, 1);
  renderTodos();
};
const loadAction = () => {
  const data = JSON.parse(localStorage.getItem("storage"));
  todoStore = (data && [...data]) || [];
  renderTodos();
};
const completeAction = index => event => {
  todoStore[index].completed = !todoStore[index].completed;
  todoStore[index].checked = false;
  renderTodos();
};
const submitAction = event => {
  event.preventDefault();
  const todoName = document
    .querySelector("form[name=todo]")
    .querySelector("input[name=todo-name]");
  todoStore = [...todoStore, { name: todoName.value, checked: false }];
  renderTodos();
  todoName.value = "";
  todoName.focus();
};
const saveAction = () => {
  localStorage.setItem("storage", JSON.stringify(todoStore));
};
export { deleteAction, loadAction, completeAction, submitAction, saveAction };
