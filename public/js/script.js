$(document).ready(loadTasksFromLocalStorage);
$('#btnAdicionar').on('click', addTask);

function addTask() {
    const todoTasks = getTodoTasks();
    const desc = $('#inputDescricao').val().trim();
    const color = $('input[name="cor"]:checked').val();
    
    if (!desc) {
        alert('Forneça uma descrição');
        return;
    }

    if (isTaskDuplicate(desc)) {
        alert('Task already exists');
        return;
    }

    if (!color) {
        console.log('Escolha uma cor');
        return;
    }

    const listItem = createListItem(desc, color);
    console.log(listItem);
    $('#todo-tasks').append(listItem);

    const tasks = getTasksFromLocalStorage();
    console.log(tasks)
    tasks.push({ desc, concluida: false, color, arquivado: false });
    setTasksToLocalStorage(tasks);
}

function isTaskDuplicate(desc) {
    return $('#todo-task').children().filter((index, item) => item.children[1].innerText === desc).length > 0;
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function setTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        const listItem = createListItem(task.desc, task.color);
        if (task.concluida) {
            $('#done-tasks').append(listItem);
        } else {
            $('#todo-tasks').append(listItem);
        }

        if (task.arquivado) {
            $('archive-tasks').append(listItem);
        }
    });
}

function deleteItem(evt) {
    const tasks = getTasksFromLocalStorage();
    const listItem = $(evt.target).parent();
    const desc = listItem.children().eq(1).text();

    listItem.remove();
    const index = getTaskIndex(tasks, desc);
    tasks.splice(index, 1);
    setTasksToLocalStorage(tasks);

    updateStatus(getTodoTasks(), getArchiveTasks());
}



function formatArchiveTask(item) {
    item.addClass('task-done');
}

function getTaskIndex(tasks, desc) {
    return tasks.findIndex(task => task.desc === desc);
}

function archiveTask(evt) {

    let tasks = getTasksFromLocalStorage();

    const listItem = $(evt.target).parent();
    const desc = listItem.children().eq(1).text();

    forEach(tasks, task => {
        if (task.desc === desc) {
            task.arquivado = true;
        }
    });

    formatArchiveTask(listItem);
    getArchiveTasks().append(listItem);
    
    setTasksToLocalStorage(tasks);
}

function getTodoTasks() {
    return $('#todo-task');
}

function getArchiveTasks() {
    return $('#archive-tasks');
}

function createListItem(description, color) {
    const listItem = $('<li></li>').addClass('liCard');
    const header = $('<div></div>').addClass('headerCard').css('backgroundColor', '#ffa4a3');
    const body = $('<div></div>').addClass('bodyCard').css('backgroundColor', color);
    const descriptionParagraph = $('<p></p>').text(description).css('margin', '0');
    const deleteButton = $('<button></button>').text('Delete').on('click', deleteItem);
    const archiveButton = $('<a>').text('').on('click', archiveTask);
    const notCompletedText = $('<label></label>').text('Não concluida').css({color: '#e42c28' });
    const checkbox = $('<input type="checkbox">').css('padding', '10px').on('click', () => changeState(listItem));

    header.append(checkbox, notCompletedText);
    body.append(descriptionParagraph);
    body.append(deleteButton);
    body.append(archiveButton);
    listItem.append(header, body);

    return listItem;
}

function changeState(card) {
}


