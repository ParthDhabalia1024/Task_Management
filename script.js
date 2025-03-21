// script.js

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
    const name = document.getElementById("taskName").value.trim();
    const description = document.getElementById("taskDescription").value.trim();
    if (!name) {
        alert("Task name cannot be empty!");
        return;
    }
    
    const task = { id: Date.now(), name, description, status: "pending" };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    document.getElementById("taskName").value = "";
    document.getElementById("taskDescription").value = "";
}

function renderTasks(filter = "all") {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach(task => {
        if (filter !== "all" && task.status !== filter) return;
        
        const li = document.createElement("li");
        li.className = "task-item";
        li.innerHTML = `
            <span class="${task.status === 'completed' ? 'completed' : ''}">${task.name} - ${task.description}</span>
            <div>
                <button onclick="toggleStatus(${task.id})">${task.status === "completed" ? "Mark Pending" : "Mark Completed"}</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function toggleStatus(id) {
    tasks = tasks.map(task => task.id === id ? { ...task, status: task.status === "completed" ? "pending" : "completed" } : task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function filterTasks(status) {
    renderTasks(status);
}

document.addEventListener("DOMContentLoaded", () => renderTasks());
