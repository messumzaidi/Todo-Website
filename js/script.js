const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    const taskText = inputBox.value.trim();
    if (!taskText) {
        alert("You must write something!");
        return;
    }

    const li = createTaskElement(taskText);
    listContainer.appendChild(li);
    inputBox.value = "";
    saveData();
}

function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;
    const removeBtn = document.createElement("span");
    removeBtn.textContent = "\u00d7";
    removeBtn.classList.add("remove-btn");
    removeBtn.addEventListener("click", function() {
        li.remove();
        saveData();
    });
    li.appendChild(removeBtn);
    li.addEventListener("click", function() {
        li.classList.toggle("checked");
        saveData();
    });
    return li;
}

function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function loadTasks() {
    listContainer.innerHTML = localStorage.getItem("tasks") || "";
}

document.getElementById("add-button").addEventListener("click", addTask);
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
});

loadTasks();
