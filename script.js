let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask(){

    const input =
    document.getElementById("taskInput");

    const dueDate =
    document.getElementById("dueDate");

    const priority =
    document.getElementById("priority");

    const taskText =
    input.value.trim();

    if(taskText === ""){
        alert("Enter a task");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false,
        dueDate: dueDate.value,
        priority: priority.value
    });

    saveTasks();

    input.value = "";
    dueDate.value = "";

    displayTasks();
}

function displayTasks(){

    const taskList =
    document.getElementById("taskList");

    taskList.innerHTML = "";

    const search =
    document
    .getElementById("searchInput")
    .value
    .toLowerCase();

    tasks
    .filter(task =>
        task.text
        .toLowerCase()
        .includes(search)
    )
    .forEach((task,index)=>{

        const li =
        document.createElement("li");

        li.innerHTML = `

        <div>

            <strong>${task.text}</strong>

            <br>

            📅 ${task.dueDate || "No Date"}

            <br>

            <span class="
            priority-${task.priority.toLowerCase()}
            ">
            ${task.priority}
            </span>

        </div>

        <div class="actions">

            <button onclick="toggleTask(${index})">
            ✓
            </button>

            <button onclick="deleteTask(${index})">
            🗑
            </button>

        </div>

        `;

        taskList.appendChild(li);

    });

    document.getElementById(
    "totalTasks"
    ).innerText =
    "Total: " + tasks.length;

    document.getElementById(
    "completedTasks"
    ).innerText =
    "Completed: " +
    tasks.filter(
    task => task.completed
    ).length;

    document.getElementById(
    "pendingTasks"
    ).innerText =
    "Pending: " +
    tasks.filter(
    task => !task.completed
    ).length;
}

function toggleTask(index){

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();

    displayTasks();
}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    displayTasks();
}

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}