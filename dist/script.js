
window.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('todo-input');
    const userText = taskInput.value;

    if (userText.trim() === "") return;

   
    createTaskElement(userText, false);

   
    saveTasksToLocalStorage();

    taskInput.value = ""; 
}

function createTaskElement(text, isCompleted) {
    const newLi = document.createElement('li');
    newLi.classList.add('todo-item'); 
    if (isCompleted) {
        newLi.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;
    checkbox.classList.add('cursor-pointer', 'accent-pink-500', 'w-4', 'h-4'); 

    const taskSpan = document.createElement('span');
    taskSpan.innerText = text;
    taskSpan.classList.add('text-sm', 'font-medium', 'break-all'); 

    checkbox.onchange = function() {
        if (checkbox.checked) {
            newLi.classList.add('completed'); 
        } else {
            newLi.classList.remove('completed'); 
        }
        saveTasksToLocalStorage(); 
    };

    const editBtn = document.createElement('button');
    editBtn.innerText = "✏️";
    editBtn.classList.add('hover:scale-125', 'transition-transform', 'cursor-pointer', 'p-1');
    editBtn.onclick = function() {
        let updatedText = prompt("Edit task:", taskSpan.innerText);
        if (updatedText !== null && updatedText.trim() !== "") {
            taskSpan.innerText = updatedText;
            saveTasksToLocalStorage(); 
        }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "❌";
    deleteBtn.classList.add('hover:scale-125', 'transition-transform', 'cursor-pointer', 'p-1');
    deleteBtn.onclick = function() {
        newLi.remove();
        saveTasksToLocalStorage(); 
    };

    const leftContainer = document.createElement('div');
    leftContainer.classList.add('flex', 'items-center', 'gap-3', 'flex-1', 'pr-2');
    leftContainer.appendChild(checkbox);
    leftContainer.appendChild(taskSpan);

    const rightContainer = document.createElement('div');
    rightContainer.classList.add('flex', 'items-center', 'gap-2');
    rightContainer.appendChild(editBtn);
    rightContainer.appendChild(deleteBtn);

    newLi.appendChild(leftContainer);
    newLi.appendChild(rightContainer);
    
    document.getElementById('todo-list').appendChild(newLi);
}

// --- LOCAL STORAGE FUNCTIONS ---


function saveTasksToLocalStorage() {
    const todoItems = [];
    const listElements = document.querySelectorAll('#todo-list .todo-item');

    listElements.forEach(li => {
        const text = li.querySelector('span').innerText;
        const isCompleted = li.classList.contains('completed');
        todoItems.push({ text: text, completed: isCompleted });
    });

    localStorage.setItem('myTodoList', JSON.stringify(todoItems));
}


function loadTasks() {
    const savedTasks = localStorage.getItem('myTodoList');
    if (savedTasks) {
        const todoItems = JSON.parse(savedTasks);
        todoItems.forEach(item => {
            createTaskElement(item.text, item.completed);
        });
    }
}

document.getElementById('todo-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});