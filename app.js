import * as util from "./util.js";

class ToDoList {
  constructor() {
    this.addToDoForm = document.querySelector("#addToDoForm");
    this.toDosListElement = document.querySelector("#ToDos");
    window.addEventListener("load", this.loadToDos.bind(this));
    this.addToDoForm.addEventListener("submit", this.addToDo.bind(this));
    /* this.toDosListElement.addEventListener(
      "click",
      this.handleListClick.bind(this)
    ); */
  }

  loadToDos() {
    const savedToDos = JSON.parse(localStorage.getItem("todos")) || [];
    this.renderToDos(savedToDos);
  }

  renderToDos(todos) {
    this.toDosListElement.innerHTML = null;

    if (todos.length) {
      todos.forEach((todo) => {
        const toDoItem = document.createElement("li");
        toDoItem.id = todo.id;
        toDoItem.setAttribute(
          "time",
          `${new Date(todo.timestamp).toJSON().slice(0, 16)}`
        );

        const textElement = document.createElement("span");
        textElement.textContent = `${todo.label} `;
        textElement.classList.add("todo-text");

        const editButton = document.createElement("button");
        const editIcon = document.createElement("i");
        editIcon.setAttribute("class", "fa-solid fa-pen-to-square");
        editButton.style.background = "cadetblue";
        editButton.appendChild(editIcon);
        editButton.addEventListener("click", () => this.editToDo(todo.id));

        const deleteButton = document.createElement("button");
        const deleteIcon = document.createElement("i");
        deleteIcon.setAttribute("class", "fa-solid fa-trash");
        deleteButton.appendChild(deleteIcon);
        deleteButton.addEventListener("click", () => this.deleteToDo(todo.id));

        toDoItem.appendChild(textElement);
        toDoItem.appendChild(editButton);
        toDoItem.appendChild(deleteButton);

        this.toDosListElement.appendChild(toDoItem);
      });
    } else {
      const toDoItem = document.createElement("li");
      toDoItem.textContent = "Please add todos above";
      this.toDosListElement.appendChild(toDoItem);
    }
  }
  editToDo(id) {
    const todos = this.getTodosFromStorage();
    const todo = todos.find((item) => item.id === id);
    if (!todo) {
      return;
    }

    const newText = prompt("Edit Todo:", todo.label);
    if (newText !== null) {
      todo.label = newText;
      localStorage.setItem("todos", JSON.stringify(todos));
      this.renderToDos(todos);
    }
  }

  deleteToDo(id) {
    console.log(id);
    const todos = this.getTodosFromStorage();
    const index = todos.findIndex((item) => item.id === id);
    if (index === -1) {
      return;
    }
    if (confirm("Are you sure you want to delete this todo?")) {
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
      this.renderToDos(todos);
    }
  }

  addToDo(event) {
    event.preventDefault();
    const taskInput = event.target.querySelector("#taskInput");
    let newTodo;
    if (label !== "") {
      newTodo = {
        id: util.returnRandomKey(),
        label,
        timestamp: new Date(),
      };
    }
    if (newTodo) {
      const todos = this.getTodosFromStorage();
      todos.push(newTodo);
      localStorage.setItem("todos", JSON.stringify(todos));
      this.renderToDos(todos);
      taskInput.value = "";
    }
  }

  getTodosFromStorage() {
    return JSON.parse(localStorage.getItem("todos")) || [];
  }
}

const toDoList = new ToDoList();
