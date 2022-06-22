import {
  removeTaskFromList,
  markTaskAsChecked,
  makeContentEditable,
  removeContentEditable,
  saveTasksToLocalStorage,
  getTasksFromLocalStorage,
} from "./utils.js";

window.addEventListener("load", () => {
  const savedTasks = getTasksFromLocalStorage();

  taskList.innerHTML = savedTasks;

  const taskTextParagraphs = document.getElementsByClassName("taskText");
  [...taskTextParagraphs].forEach((paragraph) =>
    paragraph.addEventListener("blur", (e) => removeContentEditable(e))
  );
});

//grab the form  and the input element
const form = document.forms[0];
const newTaskInput = document.querySelector("input");

//grab the task list
const taskList = document.querySelector(".taskList");

//function that creates a new task element and inserts it into the html
const createNewTask = () => {
  const newTaskText = newTaskInput.value;

  const newTaskTemplate = `
  <li class="mb-4 d-flex justify-content-center align-items-center new-task">
  <p class="taskText mb-0">${newTaskText}</p><i class="bi bi-pencil" name="edit"></i><i class="bi bi-check-lg" name="check"></i><i class="bi bi-x-lg" name="delete"></i>
  </li>`;

  taskList.insertAdjacentHTML("afterBegin", newTaskTemplate);

  //binds blur event on paragraph
  const taskTextParagraph = document.querySelector(".taskText");
  taskTextParagraph.addEventListener("blur", removeContentEditable);
};

//add new task to list when a submit event is fired on the form, then reset the form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  createNewTask();
  form.reset();
});

//listens to click events on the parent element and fire each function depending on the name attribute of the clicked button
taskList.addEventListener("click", (e) => {
  console.log(e.relatedTarget);
  const targetName = e.target.getAttribute("name");

  if (targetName === "delete") removeTaskFromList(e);

  if (targetName === "check") markTaskAsChecked(e);

  if (targetName === "edit") makeContentEditable(e);
});

//saves tasks to local storage when the page is unloaded
window.addEventListener("beforeunload", () =>
  saveTasksToLocalStorage(taskList.innerHTML)
);
