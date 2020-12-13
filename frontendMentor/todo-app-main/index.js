// -----------------

// variables(line 5) -- Dom variables(line 11) -- functions(line 31) -- events(line 226)

// variables

let listId = 0; // this is use to give each label and input different for and id (attribue)

let itemsLeft = 0;

// Dom variables

let body = document.body;

let modeSwitcher = document.getElementById("switchMode");

let textTodo = document.getElementById("newTodo");

let addTodoBtn = document.getElementById("addTodo");

let todoListsCont = document.getElementById("todoLists");

let filterItems = document.querySelector(".filter-items");

let clearCompletedBtn = document.querySelector('.clear-items');

let itemsLeftSpan = document.querySelector('.items-left span');

// ---------------------

// functions

function itemsLeftFunc() {
    itemsLeft = todoListsCont.querySelectorAll('[data-complete="false"]').length;
    itemsLeftSpan.textContent = itemsLeft;
}

// add new list
function addTodo() {
    if (textTodo.value == "") {
        return;
    }

    let todoCont = document.createElement("li");
    todoCont.classList.add("box", "todo-flex", "todo");
    todoCont.tabIndex = 0;
    todoCont.setAttribute("data-complete", "false");
    todoCont.setAttribute('draggable', true);

    let checkCont = document.createElement("div");
    checkCont.classList.add("todo__check-cont");

    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute(
        "aria-label",
        "check and uncheck to complete and uncomplete todo list"
    );
    input.id = `${textTodo.value.substring(0, 1)}${listId}`;

    let inputLabel = document.createElement("label");
    inputLabel.classList.add("todo-check");
    inputLabel.tabIndex = 0;
    inputLabel.setAttribute("aria-hidden", true);
    inputLabel.setAttribute("for", input.id);

    let todoContent = document.createElement("div");
    todoContent.classList.add("todo__text");
    todoContent.textContent = textTodo.value;

    let cancelTodoBtn = document.createElement("button");
    cancelTodoBtn.classList.add("todo__button");
    cancelTodoBtn.setAttribute("aria-label", "cancel todo list");

    checkCont.append(input);
    checkCont.append(inputLabel);
    todoCont.append(checkCont);
    todoCont.append(todoContent);
    todoCont.append(cancelTodoBtn);
    todoListsCont.append(todoCont);

    listId += 1;
    textTodo.value = "";

    textTodo.focus();
    itemsLeftFunc();

    // 
    // drag events
    todoCont.addEventListener('dragstart', event => {
        todoCont.classList.add('dragging');
    })

    todoCont.addEventListener('dragend', event => {
        todoCont.classList.remove('dragging');
    })
}

todoListsCont.addEventListener('dragover', event => {
    event.preventDefault();
    const afterElement = getDragAfterEleemnt(event.clientY);
    const draggable = document.querySelector('.dragging');
    if (!afterElement) {
        todoListsCont.append(draggable);
    } else {
        afterElement.before(draggable);
    }    
})

function getDragAfterEleemnt(offsetY) {
    const draggableElements = [...todoListsCont.querySelectorAll('.todo:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = offsetY - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// keyboard accessiblity for adding new list
function keyboardNewTodo(event) {
    if (event.key == "Enter") {
        addTodo();
    }
}

function swithingMode() {
    body.classList.toggle("sun");
    if (body.classList.contains("sun")) {
        modeSwitcher.src = "images/icon-moon.svg";
    } else {
        modeSwitcher.src = "images/icon-sun.svg";
    }
}

// this works for both click and focus(Enter Key) cause of the sematic used(button)
function removeList(event) {
    if (event.target.className != "todo__button") {
        return;
    }

    let listToRemove = event.target.closest(".todo");
    listToRemove.remove();
    itemsLeftFunc();
}

// check list
function checkEl(event, element) {
    let inputElement = element.previousElementSibling;
    let parentTodo = event.target.closest(".todo");

    if (inputElement.checked) {
        parentTodo.classList.remove("completed");
        parentTodo.setAttribute("data-complete", "false");
    } else {
        parentTodo.classList.add("completed");
        parentTodo.setAttribute("data-complete", "true");
    }
    itemsLeftFunc();
}

function checkList(event) {
    let targetLabel = event.target.closest(".todo-check");
    if (!targetLabel) {
        return;
    }
    checkEl(event, targetLabel);
}

// filter items based on active/completed
function filter(event) {
    let targetBtn = event.target.closest("button");
    if (!targetBtn) return;

    if (targetBtn.classList.contains("active")) return;

    let btnStatus = targetBtn.dataset.status;

    filterItems.querySelectorAll("button").forEach((button) => {
        button.classList.remove("active");
        if (button == targetBtn) {
            button.classList.add("active");
        }
    });

    let allLists = todoListsCont.querySelectorAll(".todo");

    for (let list of allLists) {
        list.classList.add("todo-flex");
        list.hidden = false;
    }
    switch (btnStatus) {
        case "Active":
            for (let list of allLists) {
                if (list.dataset.complete == "true") {
                    list.classList.remove("todo-flex");
                    list.hidden = true;
                }
            }
            break;

        case "Completed":
            for (let list of allLists) {
                if (list.dataset.complete == "false") {
                    list.classList.remove("todo-flex");
                    list.hidden = true;
                }
            }
            break;
    }
}

function clearCompleted() {
    for (let list of todoListsCont.querySelectorAll('.todo')) {
        if (list.dataset.complete == 'true') {
            list.remove();
        }
    }
}

// -------------------------

// Events

modeSwitcher.onclick = function (event) {
    swithingMode();
};

modeSwitcher.onkeydown = function (event) {
    if (event.key == "Enter" || event.key == " ") {
        swithingMode();
    }
};

textTodo.addEventListener("keydown", keyboardNewTodo);

addTodoBtn.addEventListener("click", addTodo);

addTodoBtn.addEventListener("keydown", keyboardNewTodo);

todoListsCont.addEventListener("click", removeList);

todoListsCont.addEventListener("click", checkList);

filterItems.addEventListener("click", filter);

clearCompletedBtn.addEventListener('click', clearCompleted);

// keyboard to check and uncheck list
todoListsCont.addEventListener('keydown', event => {
    if (!((event.key == ' ' || event.key == 'Enter') && event.target.closest('.todo-check'))) {
        return;
    }
    let chackLabel = event.target.closest('.todo-check');
    if (chackLabel.previousElementSibling.checked) {
        chackLabel.previousElementSibling.checked = false;
        event.target.closest('.todo').setAttribute("data-complete", "false");
        event.target.closest('.todo').classList.remove('completed');
    } else {
        chackLabel.previousElementSibling.checked = true;
        event.target.closest('.todo').setAttribute("data-complete", "true");
        event.target.closest('.todo').classList.add('completed');
    }
    itemsLeftFunc();
})
