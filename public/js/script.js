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
    $('#todo-task').append(listItem);

    const tasks = getTasksFromLocalStorage();
    tasks.push({ desc, concluida: false, color });
    setTasksToLocalStorage(tasks);
    updateStatus(todoTasks, getDoneTasks());
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
            formatDoneTask(listItem);
            getDoneTasks().append(listItem);
        } else {
            getTodoTasks().append(listItem);
        }
    });
    updateStatus(getTodoTasks(), getDoneTasks());
}

function deleteItem(evt) {
    const tasks = getTasksFromLocalStorage();
    const listItem = $(evt.target).parent();
    const desc = listItem.children().eq(1).text();

    listItem.remove();
    const index = getTaskIndex(tasks, desc);
    tasks.splice(index, 1);
    setTasksToLocalStorage(tasks);

    updateStatus(getTodoTasks(), getDoneTasks());
}

function updateStatus(todoList, doneList) {
    const totalDone = doneList.children().length;
    const totalTasks = todoList.children().length + totalDone;
    $('#status').text(`${totalDone} of ${totalTasks} completed`);
}

function formatDoneTask(item) {
    item.addClass('task-done');
}

function getTaskIndex(tasks, desc) {
    return tasks.findIndex(task => task.desc === desc);
}

function doneTask(evt) {
    const listItem = $(evt.target).parent();
    const desc = listItem.children().eq(1).text();

    formatDoneTask(listItem);
    getDoneTasks().append(listItem);

    const tasks = getTasksFromLocalStorage();
    const index = getTaskIndex(tasks, desc);
    tasks[index].concluida = true;
    setTasksToLocalStorage(tasks);

    updateStatus(getTodoTasks(), getDoneTasks());
}

function getTodoTasks() {
    return $('#todo-task');
}

function getDoneTasks() {
    return $('#done-tasks');
}

function createListItem(description, color) {
    const listItem = $('<li></li>').addClass('liCard');
    const header = $('<div></div>').addClass('headerCardNC').css('backgroundColor', '#ffa4a3');
    const body = $('<div></div>').addClass('bodyCardNC').css('backgroundColor', color);
    const descriptionParagraph = $('<p></p>').text(description);
    const notCompletedText = $('<p></p>').text('Não concluida').css({ padding: '10px', color: '#e42c28' });
    const checkbox = $('<input type="checkbox">').css('padding', '10px').on('click', () => changeState(listItem));

    header.append(checkbox, notCompletedText);
    body.append(descriptionParagraph);
    listItem.append(header, body);

    return listItem;
}

function changeState(card) {
    // Function implementation here
}


