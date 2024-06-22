document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);
let btnAdd = document.getElementById('btn-add');
btnAdd.addEventListener('click', addTask);

function loadTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // adicionar nas listas
}

function deleteItem(evt) {
    evt.target.parentNode.remove();
    updateStatus(getTodoTasks(), getDoneTasks());
}

function updateStatus(todoList, doneList) {
    let totalDone = doneList.childNodes.length;    
    let totalTasks = todoList.childNodes.length + totalDone;
    let status = document.getElementById('status');
    status.textContent = `${totalDone} of ${totalTasks} completed`;
}

function doneTask(evt) {
    let item = evt.target.parentNode;
    getDoneTasks().appendChild(item);
    // mostra botão de exclusão
    item.lastChild.classList.remove('hide-element');
    // esconde checkbox
    item.firstChild.classList.add('hide-element');
    // formata descrição da tarefa
    item.classList.add('task-done');

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
    let textBtn = document.createTextNode('del');
    btn.addEventListener('click', deleteItem);
    btn.classList.add('hide-element');

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
    updateStatus(todoTasks, getDoneTasks());
}
