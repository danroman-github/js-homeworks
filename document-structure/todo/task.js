const form = document.getElementById("tasks__form");
const input = document.getElementById("task__input");
const list = document.getElementById("tasks__list");
const addButton = document.getElementById("tasks__add");

// Добавление новой задачи
function addTask(text) {
    const task = document.createElement("div");
    task.className = "task";

    const title = document.createElement("div");
    title.className = "task__title";
    title.textContent = text;

    const deleteBtn = document.createElement("a");
    deleteBtn.href = "#";
    deleteBtn.className = "task__remove";
    deleteBtn.innerHTML = "×";

    deleteBtn.addEventListener("click", function(e) {
        e.preventDefault();
        task.remove();
    });

    task.appendChild(title);
    task.appendChild(deleteBtn);
    list.appendChild(task);
}

// Обработчик для формы по Enter
form.addEventListener("submit", function(e) {
    e.preventDefault();
    addTaskFromInput();
});

// Обработчик для кнопки
addButton.addEventListener("click", function(e) {
    e.preventDefault();
    addTaskFromInput();
});

// Функция для обработки ввода
function addTaskFromInput() {
    const value = input.value.trim();
    if (!value) return;
    addTask(value);
    input.value = "";
}