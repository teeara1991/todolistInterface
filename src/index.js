//selecting dom elements for manipulation

let todoStore = [{ name: "asdasd", checked: true }];

const todoTemplate = (id, name, checked = false) => `
<li class="todo-item" data-id="${id}">
  <input type="checkbox" ${checked && "checked"}/>
  <input type="text" value="${name}" name="todo-edit" style="display: none;"/>
  <span class="todo-text">${name}</span>
  <span class="todo-trash"><i class="fas fa-trash-alt"></i></span>
  <span class="todo-edit"><i class="fas fa-edit"></i></span>
</li>
`;

const form = document.querySelector("form[name=todo]");
const buttons = document.querySelector("#buttons");
const todosListRoot = document.querySelector(".todos");

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

const renderTodos = () => {
  const todosHtml = todoStore
    .map((todo, index) => todoTemplate(index, todo.name, todo.checked))
    .join("")
    .trim();

  todosListRoot.innerHTML = todosHtml;
  attachListeniers();
};

form.addEventListener("submit", event => {
  event.preventDefault();
  const todoName = form.querySelector("input[name=todo-name]");

  todoStore = [...todoStore, { name: todoName.value, checked: false }];

  renderTodos();
  todoName.value = "";
});

buttons.querySelector("#delete").addEventListener("click", event => {
  const newTodow = todoStore.reduce((acc, item) => {
    if (item.checked) {
      return acc;
    }

    return [...acc, item];
  }, []);

  todoStore = [...newTodow];
  renderTodos();
});
buttons.querySelector("#clear").addEventListener("click", event => {
  todoStore = [];
  renderTodos();
});
buttons.querySelector("#save").addEventListener("click", event => {
  localStorage.setItem("storage", JSON.stringify(todoStore));
});

loadAction();
