console.log("script is connected");

function saveTasksToStorage() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector('div.taskitem').previousSibling.textContent.trim(),
            date: li.querySelector('.Due-date') ? li.querySelector('.Due-date').textContent.replace('(Due: ', '').replace(' )', '') : '',
            priority: li.getAttribute('data-priority'),
            done: li.classList.contains('done')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(task => {
        addTaskFromData(task);
    });
}

function addTaskFromData(taskData) {
    let li = document.createElement("li");
    li.classList.add("new-task");
    li.setAttribute("data-priority", taskData.priority);
    if (taskData.done) {
        li.classList.add("done");
    }

    if (taskData.date) {
        let datespan = document.createElement("span");
        datespan.textContent = "(Due: " + taskData.date + " )";
        datespan.classList.add("Due-date");
        li.appendChild(datespan);
    }

    let editbtn = document.createElement("button");
    editbtn.classList.add("edit-btn");
    editbtn.textContent = " ✏️";

    editbtn.onclick = function () {
        let originalTextNode = li.firstChild;
        if (!originalTextNode) return;

        const backup = originalTextNode.cloneNode(true);

        const currentText = originalTextNode.textContent.trim();
        const input = document.createElement("input");
        input.type = "text";
        input.className = "edit-input";
        input.value = currentText;

        li.replaceChild(input, originalTextNode);
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);

        let cancelled = false;

        function saveEdit() {
            if (cancelled) return;
            const newText = input.value.trim();
            if (newText.length > 0) {
                const newTextNode = document.createTextNode(newText + "");
                li.replaceChild(newTextNode, input);
                saveTasksToStorage();
            } else {
                li.replaceChild(backup, input);
            }
        }

        function cancelEdit() {
            cancelled = true;
            li.replaceChild(backup, input);
        }

        input.onkeydown = function (e) {
            if (e.key == "Enter") saveEdit();
            else if (e.key == "Escape") cancelEdit();
        };

        input.onblur = function () {
            setTimeout(() => {
                if (!cancelled) saveEdit();
            }, 100);
        };
    };

    let deletebutton = document.createElement("button");
    deletebutton.textContent = "❌";
    deletebutton.classList.add("del-btn");

    deletebutton.onclick = function () {
        li.classList.add("removing");
        setTimeout(() => {
            li.remove();
            saveTasksToStorage();
        }, 300);
    };

    setTimeout(() => {
        li.classList.add("show");
    }, 10);

    let donebutton = document.createElement("button");
    donebutton.textContent = "✅";
    donebutton.classList.add("done-btn");
    donebutton.onclick = function () {
        li.classList.toggle("done");
        saveTasksToStorage();
    };

    let textNode = document.createTextNode(taskData.text);
    let taskitem = document.createElement("div");
    taskitem.classList.add("taskitem");
    li.appendChild(textNode);
    taskitem.appendChild(deletebutton);
    taskitem.appendChild(donebutton);
    taskitem.appendChild(editbtn);
    li.appendChild(taskitem);

    donebutton.innerHTML = "<span class='tick'>✅</span>";

    document.getElementById("taskList").appendChild(li);
}

function addTask() {
    let task = document.getElementById("taskInput").value;
    let date = document.getElementById("dateinput").value;
    let priority = document.getElementById("priority").value;

    if (!task.trim()) {
        alert("Please enter a task.");
        return;
    }
    if (!priority) {
        alert("Please select a priority.");
        return;
    }

    let li = document.createElement("li");
    li.classList.add("new-task");
    li.setAttribute("data-priority", priority);

    if (date) {
        let datespan = document.createElement("span");
        datespan.textContent = "(Due: " + date + " )";
        datespan.classList.add("Due-date");
        li.appendChild(datespan);
    }

    let editbtn = document.createElement("button");
    editbtn.classList.add("edit-btn");
    editbtn.textContent = " ✏️";

    editbtn.onclick = function () {
        let originalTextNode = li.firstChild;
        if (!originalTextNode) return;

        const backup = originalTextNode.cloneNode(true);

        const currentText = originalTextNode.textContent.trim();
        const input = document.createElement("input");
        input.type = "text";
        input.className = "edit-input";
        input.value = currentText;

        li.replaceChild(input, originalTextNode);
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);

        let cancelled = false;

        function saveEdit() {
            if (cancelled) return;
            const newText = input.value.trim();
            if (newText.length > 0) {
                const newTextNode = document.createTextNode(newText + "");
                li.replaceChild(newTextNode, input);
                saveTasksToStorage();
            } else {
                li.replaceChild(backup, input);
            }
        }

        function cancelEdit() {
            cancelled = true;
            li.replaceChild(backup, input);
        }

        input.onkeydown = function (e) {
            if (e.key == "Enter") saveEdit();
            else if (e.key == "Escape") cancelEdit();
        };

        input.onblur = function () {
            setTimeout(() => {
                if (!cancelled) saveEdit();
            }, 100);
        };
    };

    let deletebutton = document.createElement("button");
    deletebutton.textContent = "❌";
    deletebutton.classList.add("del-btn");

    deletebutton.onclick = function () {
        li.classList.add("removing");
        setTimeout(() => {
            li.remove();
            saveTasksToStorage();
        }, 300);
    };

    setTimeout(() => {
        li.classList.add("show");
    }, 10);

    let donebutton = document.createElement("button");
    donebutton.textContent = "✅";
    donebutton.classList.add("done-btn");
    donebutton.onclick = function () {
        li.classList.toggle("done");
        saveTasksToStorage();
    };

    let textNode = document.createTextNode(task);
    let taskitem = document.createElement("div");
    taskitem.classList.add("taskitem");
    li.appendChild(textNode);
    taskitem.appendChild(deletebutton);
    taskitem.appendChild(donebutton);
    taskitem.appendChild(editbtn);
    li.appendChild(taskitem);

    donebutton.innerHTML = "<span class='tick'>✅</span>";

    document.getElementById("taskList").appendChild(li);
    document.getElementById("taskInput").value = "";
    document.getElementById("dateinput").value = "";
    document.getElementById("priority").value = "";

    saveTasksToStorage();
}

function filterTask(priority) {
    const tasks = document.querySelectorAll("#taskList li");
    tasks.forEach(task => {
        const taskPriority = task.getAttribute("data-priority");
        if (priority === "all" || taskPriority === priority) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
}

document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

window.onload = function () {
    loadTasksFromStorage();
};
