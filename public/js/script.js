$(document).ready(loadTasksFromLocalStorage);
$('#btn-add').on('click', addTask);

function addTask() {
    let input = $('#desc');
    let text = input.val().trim();
    let todoTasks = getTodoTasks();
    
    if (text === '') {    
        alert('Forneça uma descrição');
        return;
    }

    if (itemExists(todoTasks, text)) {
        alert('Item já existe');
        return;
    }

    // add o item na lista
    todoTasks.append(createListItem(text));   
    inputReset(input);

    let tasks = getTasksFromLocalStorage();
    tasks.push({'desc': text, 'concluida': false});
    setTasksToLocalStorage(tasks);
    updateStatus(todoTasks, getDoneTasks());
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function setTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));    
}

function loadTasksFromLocalStorage() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach((task) => {
        let li = createListItem(task.desc);
        if (task.concluida) {
            formatDoneTask(li);
            getDoneTasks().append(li);
        } else {
            getTodoTasks().append(li);
        }
    });
    updateStatus(getTodoTasks(), getDoneTasks());
}

function deleteItem(evt) {
    let tasks = getTasksFromLocalStorage();
    // remove da DOM
    $(evt.target).parent().remove();

    // remove do localStorage
    const desc = $(evt.target).prev().text();
    const index = getTaskIndex(tasks, desc);
    tasks.splice(index, 1);    
    setTasksToLocalStorage(tasks);

    updateStatus(getTodoTasks(), getDoneTasks());
}


function updateStatus(todoList, doneList) {
    let totalDone = doneList.children().length;    
    let totalTasks = todoList.children().length + totalDone;
    let status = $('#status');
    status.text(`${totalDone} of ${totalTasks} completed`);
}

function formatDoneTask(item) {
    item.addClass('task-done');
}

function getTaskIndex(tasks, desc) {
    return tasks.findIndex((task) => task.desc === desc);    
}

function doneTask(evt) {
    let item = $(evt.target).parent();
    let desc = item.children().eq(1).text();

    // atualiza css de tarefa concluída
    formatDoneTask(item);

    getDoneTasks().append(item);

    let tasks = getTasksFromLocalStorage();

    let index = getTaskIndex(tasks, desc);
    tasks[index].concluida = true;

    setTasksToLocalStorage(tasks);

    updateStatus(getTodoTasks(), getDoneTasks());
}

function getTodoTasks() {
    return $('#todo-tasks');
}

function getDoneTasks() {
    return $('#done-tasks');
}

function createListItem(text) {
    // criar o item da lista
    let li = $('<li></li>');
    let textItem = document.createTextNode(text);    
    
    // criação do checkbox
    let check = $('<input type="checkbox">');
    check.on('click', doneTask);

    // criação do botão de exclusão
    let btn = $('<button>x</button>');
    btn.on('click', deleteItem);    

    btn.append(textBtn);
    li.append(check, textItem, btn);

    return li;    
}

function inputReset(input) {
    input.value = '';
}

function itemExists(list, text) {
    let listItems = Array.from(list.children());
    
    let arrayResult = listItems.filter((item) => {        
        return item.children().eq(1).text() === text;
    });    
    return arrayResult.length;
}
