const display = document.getElementById("display");
  const add = document.getElementById("add");
  const tasksDiv = document.getElementById("tasksDiv");

  let tasks = [];
  function loadTasks() {
    const saveTasks = localStorage.getItem("tasks");
    if(savedTasks != null) {
      tasks = JSON.parse(savedTasks);
    }
  }
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks) );
  }

  function addTask() {
    let task = display.value;
    if (task === "") {
      return;
    }
    tasks.push(task);
    saveTasks();
    render();
    clearInput();
  }
  function clearInput() {
    display.value ="";
  }

  function render() {
    tasksDiv.textContent = "";

    for (let i = 0; i < tasks.length; i++) {
      const div = document.createElement("div");
      div.classList.add("parent");
      const p = document.createElement("p");
      p.textContent = tasks[i];
      p.classList.add("task");

      const btn = document.createElement("button");
      btn.textContent = "🗑️";
      btn.classList.add ("my-button");
      btn.addEventListener("click", () => {
        tasks.splice(i, 1);
        saveTasks();
        render();
      });

      div.appendChild(p);
      div.appendChild(btn);
      tasksDiv.appendChild(div);
    }
  }

  add.addEventListener("click", () => {
    addTask();
  });
  display.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });
loadTasks();
render();
