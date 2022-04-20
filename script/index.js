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

  //grab the icons next to each task and the paragraph
  const taskTextParagraphs = document.querySelectorAll(".taskText");
  const editIcons = document.querySelectorAll('[name="edit"]');
  const deleteIcons = document.querySelectorAll('[name="delete"]');
  const checkIcons = document.querySelectorAll('[name="check"]');

  //attach events to each icon
  deleteIcons.forEach((icon) =>
    icon.addEventListener("click", removeTaskFromList)
  );

  checkIcons.forEach((icon) =>
    icon.addEventListener("click", markTaskAsChecked)
  );

  editIcons.forEach((icon) =>
    icon.addEventListener("click", makeContentEditable)
  );

  taskTextParagraphs.forEach((paragraph) =>
    paragraph.addEventListener("blur", removeContentEditable)
  );
});

//grab the form  and the input element
const form = document.forms[0];
const newTaskInput = document.querySelector("input");

//grab the task list
const taskList = document.querySelector(".taskList");

// // attach blur event to existing tastText
// const taskTextParagraphs = document.querySelectorAll(".taskText");

// taskTextParagraphs.forEach((paragraph) =>
//   paragraph.addEventListener("blur", removeContentEditable)
// );

//function that creates a new task element and inserts it into the html
const createNewTask = () => {
  const newTaskText = newTaskInput.value;

  const newTaskTemplate = `
  <li class="mb-4 d-flex justify-content-center align-items-center new-task">
  <p class="taskText mb-0">${newTaskText}</p><i class="bi bi-pencil" name="edit"></i><i class="bi bi-check-lg" name="check"></i><i class="bi bi-x-lg" name="delete"></i>
  </li>`;
  taskList.insertAdjacentHTML("afterBegin", newTaskTemplate);

  const deleteIcon = document.querySelector('[name="delete"]');
  deleteIcon.addEventListener("click", removeTaskFromList);

  const checkIcon = document.querySelector('[name="check"]');
  checkIcon.addEventListener("click", markTaskAsChecked);

  const editIcon = document.querySelector('[name="edit"]');
  editIcon.addEventListener("click", makeContentEditable);

  const taskText = document.querySelector("p");
  taskText.addEventListener("blur", removeContentEditable);
};

//add new task to list and reset the form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  createNewTask();
  form.reset();
});

window.addEventListener("beforeunload", () => {
  console.log("here");
  saveTasksToLocalStorage(taskList.innerHTML);
});
