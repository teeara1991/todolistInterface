import { renderTodos } from "./index";

export let todoStore = [{ name: "asdasd", checked: true, completed: false }];

const deleteAction = index => event => {
  todoStore.splice(index, 1);
  renderTodos();
};
const visibleAction = (index, elem) => event => {
  elem.querySelector("input[name=todo-edit]").style.display = "block";
  elem.querySelector(".todo-text").style.display = "none";
};
const editAction = (index, elem) => event => {
  if (event.key === "Enter") {
    todoStore[index].name = elem.querySelector("input[name=todo-edit]").value;
    renderTodos();
  }
};
const loadAction = () => {
  const data = JSON.parse(localStorage.getItem("storage"));
  todoStore = (data && [...data]) || [];
  renderTodos();
};
const checkAction = index => event => {
  todoStore[index].checked = !todoStore[index].checked;
  renderTodos();
};
const completeAction = event => {
  todoStore.forEach((el, index) => {
    if (todoStore[index].checked) {
      todoStore[index].completed = true;
      todoStore[index].checked = false;
    }
  });
  renderTodos();
};
const unCompleteAction = event => {
  todoStore.forEach((el, index) => {
    if (todoStore[index].checked) {
      todoStore[index].completed = false;
      todoStore[index].checked = false;
    }
  });
  renderTodos();
};
const deleteCheckedteAction = event => {
  const newTodow = todoStore.reduce((acc, item) => {
    if (item.checked) {
      return acc;
    }

    return [...acc, item];
  }, []);

  todoStore = [...newTodow];
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
};
const clearAction = event => {
  todoStore = [];
  renderTodos();
};
const saveAction = event => {
  localStorage.setItem("storage", JSON.stringify(todoStore));
};
export {
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
  saveAction
};
