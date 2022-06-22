const removeTaskFromList = (e) => e.target.parentElement.remove();

const markTaskAsChecked = (e) => {
  console.log("heee");

  e.target.parentElement.classList.toggle("checked");
};

const makeContentEditable = (e) => {
  const paragraph = e.target.previousElementSibling;
  paragraph.parentElement.classList.add("editing");
  paragraph.contentEditable = true;
};

const removeContentEditable = (e) => {
  console.log(e.target.parentElement);
  e.target.parentElement.classList.remove("editing");
  e.target.contentEditable = false;
};

const saveTasksToLocalStorage = (tasks) =>
  localStorage.setItem("tasks", JSON.stringify(tasks));

const getTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem("tasks");
  return JSON.parse(savedTasks);
};

export {
  removeTaskFromList,
  markTaskAsChecked,
  makeContentEditable,
  removeContentEditable,
  saveTasksToLocalStorage,
  getTasksFromLocalStorage,
};
