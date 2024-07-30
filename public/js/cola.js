// JavaScript Here
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);
document.getElementById('btn-add').addEventListener('click', addTask);
document.getElementById("theme").addEventListener("click", changeTheme);
document.getElementById('desc').addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') addTask();
});

document,getElementById()

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
            getDoneTasks().appendChild(li);
        } else {
            getTodoTasks().appendChild(li);
        }
    });
    updateStatus(getTodoTasks(), getDoneTasks());
}

function deleteItem(evt) {
    let tasks = getTasksFromLocalStorage();
    // remove da DOM
    evt.target.parentNode.remove();

    // remove do localStorage
    const desc = evt.target.previousSibling.textContent;
    const index = getTaskIndex(tasks, desc);
    tasks.splice(index, 1);    
    setTasksToLocalStorage(tasks);

    updateStatus(getTodoTasks(), getDoneTasks());
}

function updateStatus(todoList, doneList) {
    let totalDone = doneList.childNodes.length;    
    let totalTasks = todoList.childNodes.length + totalDone;
    let status = document.getElementById('status');
    status.textContent = `${totalDone} of ${totalTasks} completed`;
}

function formatDoneTask(item) {
    item.classList.add('task-done');
}

function getTaskIndex(tasks, desc) {
    return tasks.findIndex((task) => task.desc === desc);    
}

function doneTask(evt) {
    let item = evt.target.parentNode;
    let desc = item.firstChild.nextSibling.textContent;

    // atualiza css de tarefa concluída
    formatDoneTask(item);

    getDoneTasks().appendChild(item);

    let tasks = getTasksFromLocalStorage();

    let index = getTaskIndex(tasks, desc);
    tasks[index].concluida = true;

    setTasksToLocalStorage(tasks);

    updateStatus(getTodoTasks(), getDoneTasks());
}

function getTodoTasks() {
    return document.getElementById('todo-tasks');
}

function getDoneTasks() {
    return document.getElementById('done-tasks');
}

function createListItem(text) {
    // criar o item da lista
    let li = document.createElement('li');
    let textItem = document.createTextNode(text);    
    
    // criação do checkbox
    let check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    check.addEventListener('click', doneTask);

    // criação do botão de exclusão
    let btn = document.createElement('button');
    let textBtn = document.createTextNode('x');
    btn.addEventListener('click', deleteItem);    

    btn.append(textBtn);
    li.append(check, textItem, btn);

    return li;    
}

function inputReset(input) {
    input.value = '';
}

function itemExists(list, text) {
    let listItems = Array.from(list.childNodes);
    
    let arrayResult = listItems.filter((item) => {        
        return item.firstChild.nextSibling.textContent === text;
    });    
    return arrayResult.length;
}

function addTask() {
    let input = document.getElementById('desc');
    let text = input.value.trim();
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
    todoTasks.appendChild(createListItem(text));   
    inputReset(input);

    let tasks = getTasksFromLocalStorage();
    tasks.push({'desc': text, 'concluida': false});
    setTasksToLocalStorage(tasks);
    updateStatus(todoTasks, getDoneTasks());
}