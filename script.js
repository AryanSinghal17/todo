const nameInput = document.getElementById("name");
const dateInput = document.getElementById("date");
const taskOrder = document.getElementById("taskOrder");

const btn = document.getElementById("btn");

const todayOutput = document.getElementById("todayOutput");
const completeOutput = document.getElementById("CompleteOutput");

let tasks = [];


function saveTasks() {
  document.cookie =
    "tasks=" +
    encodeURIComponent(JSON.stringify(tasks)) +
    ";path=/";
}


function getCookie(cookieName) {
  let cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    let [name, value] = cookie.trim().split("=");

    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }

  return null;
}


function displayTasks() {
  todayOutput.innerHTML = "";
  completeOutput.innerHTML = "";

  tasks.forEach((task, index) => {
    if (!task.completed) {
      todayOutput.innerHTML += `
        <li>
          <strong>${task.name}</strong>
          (${task.date}) - ${task.priority}

          <button onclick="completeTask(${index})">
            Complete
          </button>

          <button onclick="deleteTask(${index})">
            Delete
          </button>
        </li>
      `;
    } else {
      completeOutput.innerHTML += `
        <li>
          <strong>${task.name}</strong>
          (${task.date}) - ${task.priority}

          <button onclick="deleteTask(${index})">
            Delete
          </button>
        </li>
      `;
    }
  });
}


btn.addEventListener("click", () => {
  if (
    nameInput.value === "" ||
    dateInput.value === "" ||
    taskOrder.value === ""
  ) {
    alert("Please fill all fields");
    return;
  }

  const task = {
    name: nameInput.value,
    date: dateInput.value,
    priority: taskOrder.value,
    completed: false
  };

  tasks.push(task);

  saveTasks();
  displayTasks();

  nameInput.value = "";
  dateInput.value = "";
  taskOrder.selectedIndex = 0;
});


function completeTask(index) {
  tasks[index].completed = true;

  saveTasks();
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);

  saveTasks();
  displayTasks();
}


const savedTasks = getCookie("tasks");

if (savedTasks) {
  tasks = JSON.parse(savedTasks);
}

displayTasks();