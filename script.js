document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task));
        updateTasksLists();
        updateStats();
    }
});

let tasks = [];

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTasksLists();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksLists();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksLists();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTasksLists();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

    const progressBar = document.getElementById("progress");
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }

    const numbersElement = document.getElementById("numbers");
    if (numbersElement) {
        numbersElement.innerHTML = `${completedTasks} / ${totalTasks}`;
    }

    const completionMessage = document.getElementById("completionMessage");
    if (tasks.length && completedTasks === totalTasks) {
        blaskConfetti(); // Show confetti
        if (completionMessage) {
            completionMessage.classList.add("show");
        }
    } else {
        if (completionMessage) {
            completionMessage.classList.remove("show");
        }
    }
};


const updateTasksLists = () => {
    const taskList = document.getElementById("task-list");
    if (taskList) {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="task-input"
                        ${task.completed ? "checked" : ""} onchange="toggleTaskComplete(${index})"/>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="edit.png" onclick="editTask(${index})" />
                    <img src="bin.png" onclick="deleteTask(${index})" />
                </div>
            </div>
            `;
            taskList.append(listItem);
        });
    }
};

document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});

const blaskConfetti = () => {
    confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#828dff", "#24feee", "#ffdd59", "#ff6b6b"],
        shapes: ["circle", "square", "triangle", "star"],
        scalar: 1.2,
        gravity: 0.8,
    });
};

