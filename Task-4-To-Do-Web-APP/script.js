// ========================================
// GET HTML ELEMENTS
// ========================================

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");

const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");


// ========================================
// TASK DATA
// ========================================

let tasks = [];

let editingTaskId = null;


// ========================================
// LOAD SAVED TASKS
// ========================================

function loadTasks() {

    const savedTasks = localStorage.getItem("taskflowTasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }

}


// ========================================
// SAVE TASKS
// ========================================

function saveTasks() {

    localStorage.setItem(
        "taskflowTasks",
        JSON.stringify(tasks)
    );

}


// ========================================
// UPDATE TASK COUNT
// ========================================

function updateTaskCount() {

    const count = tasks.length;

    taskCount.textContent =
        `${count} ${count === 1 ? "Task" : "Tasks"}`;

}


// ========================================
// FORMAT DATE
// ========================================

function formatDate(dateValue) {

    const date = new Date(dateValue + "T00:00:00");

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

}


// ========================================
// CREATE TASK ELEMENT
// ========================================

function createTaskElement(task) {

    const taskItem = document.createElement("div");

    taskItem.className = "task-item";


    if (task.completed) {
        taskItem.classList.add("completed");
    }


    // Task information

    const taskInfo = document.createElement("div");

    taskInfo.className = "task-info";


    const taskTitle = document.createElement("div");

    taskTitle.className = "task-title";

    taskTitle.textContent = task.title;


    const taskMeta = document.createElement("div");

    taskMeta.className = "task-meta";

    taskMeta.textContent =
        `${formatDate(task.date)} • ${task.time}`;


    taskInfo.appendChild(taskTitle);

    taskInfo.appendChild(taskMeta);


    // Task actions

    const taskActions = document.createElement("div");

    taskActions.className = "task-actions";


    // Complete button

    const completeButton =
        document.createElement("button");

    completeButton.className =
        "task-action complete-btn";

    completeButton.textContent =
        task.completed ? "Undo" : "✓ Complete";


    completeButton.addEventListener(
        "click",
        function () {

            toggleTask(task.id);

        }
    );


    // Edit button

    const editButton =
        document.createElement("button");

    editButton.className =
        "task-action edit-btn";

    editButton.textContent = "Edit";


    editButton.addEventListener(
        "click",
        function () {

            editTask(task.id);

        }
    );


    taskActions.appendChild(completeButton);

    taskActions.appendChild(editButton);


    taskItem.appendChild(taskInfo);

    taskItem.appendChild(taskActions);


    return taskItem;

}


// ========================================
// DISPLAY TASKS
// ========================================

function renderTasks() {

    taskList.innerHTML = "";


    if (tasks.length === 0) {

        taskList.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    ✓
                </div>

                <h3>No tasks yet</h3>

                <p>
                    Add your first task to get started.
                </p>

            </div>
        `;

        updateTaskCount();

        return;

    }


    // Sort tasks by date and time

    tasks.sort(function (a, b) {

        const first =
            new Date(`${a.date}T${a.time}`);

        const second =
            new Date(`${b.date}T${b.time}`);

        return first - second;

    });


    tasks.forEach(function (task) {

        const taskElement =
            createTaskElement(task);

        taskList.appendChild(taskElement);

    });


    updateTaskCount();

}


// ========================================
// ADD TASK
// ========================================

taskForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const title =
            taskInput.value.trim();

        const date =
            taskDate.value;

        const time =
            taskTime.value;


        // Check input

        if (title === "") {

            alert("Please enter a task.");

            taskInput.focus();

            return;

        }


        if (date === "") {

            alert("Please select a date.");

            taskDate.focus();

            return;

        }


        if (time === "") {

            alert("Please select a time.");

            taskTime.focus();

            return;

        }


        // UPDATE EXISTING TASK

        if (editingTaskId !== null) {

            tasks = tasks.map(function (task) {

                if (task.id === editingTaskId) {

                    return {
                        id: task.id,
                        title: title,
                        date: date,
                        time: time,
                        completed: task.completed
                    };

                }

                return task;

            });


            editingTaskId = null;


            const button =
                document.querySelector(".add-task-btn");

            button.innerHTML =
                "<span>+</span> Add Task";

        }


        // ADD NEW TASK

        else {

            const newTask = {

                id: Date.now(),

                title: title,

                date: date,

                time: time,

                completed: false

            };


            tasks.push(newTask);

        }


        saveTasks();

        renderTasks();

        taskForm.reset();

        taskInput.focus();

    }
);


// ========================================
// COMPLETE / UNDO
// ========================================

function toggleTask(id) {

    tasks = tasks.map(function (task) {

        if (task.id === id) {

            task.completed =
                !task.completed;

        }

        return task;

    });


    saveTasks();

    renderTasks();

}


// ========================================
// EDIT TASK
// ========================================

function editTask(id) {

    const task =
        tasks.find(function (task) {

            return task.id === id;

        });


    if (!task) {
        return;
    }


    taskInput.value = task.title;

    taskDate.value = task.date;

    taskTime.value = task.time;


    editingTaskId = id;


    const button =
        document.querySelector(".add-task-btn");

    button.innerHTML =
        "<span>✓</span> Update Task";


    taskInput.focus();

}


// ========================================
// INITIALIZE APPLICATION
// ========================================

loadTasks();

renderTasks();