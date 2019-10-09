//selecting dom elements for manipulation
const input = document.querySelector("input[type = 'text']");
const ul = document.querySelector("ul");
const spans = document.getElementsByTagName("span");
const saveBtn = document.querySelector("#save");
const clearBtn = document.querySelector("#clear");

const deleteTodo = () => {
  for (let span of spans) {
    span.addEventListener("click", function() {
      span.parentElement.remove();
    });
  }
};
const loadTodo = () => {
  if (localStorage.getItem("todoList")) {
    ul.innerHTML = localStorage.getItem("todoList");
    deleteTodo();
  }
};
input.addEventListener("keypress", function(keyPressed) {
  if (keyPressed.which === 13) {
    const li = document.createElement("li");
    const spanText = document.createElement("span");
    const spanTrash = document.createElement("span");
    const icon = document.createElement("i");
    const newTodo = this.value;
    this.value = " ";
    icon.classList.add("fas", "fa-trash-alt");
    spanText.classList.add("todo-text");
    spanTrash.classList.add("todo-trash");
    spanTrash.append(icon);
    ul.appendChild(li).append(spanText, newTodo);
    li.append(spanTrash);
    deleteTodo();
  }
});
ul.addEventListener(
  "click",
  function(ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);
saveBtn.addEventListener("click", function() {
  localStorage.setItem("todoList", ul.innerHTML);
});
clearBtn.addEventListener("click", function() {
  ul.innerHTML = "";
  localStorage.removeItem("todoList", ul.innerHTML);
});
deleteTodo();
loadTodo();
