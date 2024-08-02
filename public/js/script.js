$(document).ready(loadTasksFromLocalStorage);
$('#btnAdicionar').on('click', addTask);

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

        $('#tasks').append(listItem);

        if (task.isArchived) {
            $('#archived-tasks').append(listItem);
        }
    });
}


function getTaskIndex(tasks, desc) {
    return tasks.findIndex(task => task.desc === desc);
}

function getTodoTasks() {
    return $('#todo-task');
}

function getArchiveTasks() {
    return $('#archive-tasks');
}

function deleteCard() {
 console.log('deleteCard');
}

function archiveTask() {
console.log('archiveTask');
}

function cardCheckbox() {
    let x = $(this).parent();
    console.log(x.children()[1]);
}

function createListItem(description, color, isArchived, isDone) {
    const listItem = $('<li></li>').addClass('liCard').css('backgroundColor', color);

    const header = $('<div></div>').addClass('todoHeader');

    const body = $('<div></div>').addClass('todoText');

    const descriptionParagraph = $('<p></p>').text(description).css('background-color', color);

    const deleteButton = $('<button></button>').on('click', deleteCard).text('X').css({
        style: 'none',
        backgroundColor: 'red',
        border: 'black',
        cursor: 'pointer',
    });

    const checkbox = $('<button>check</button>').on('click', cardCheckbox);


const headerText = $('<label class="headerText"></label>').text('Não concluida').css({
        color: '#e42c28',
        padding: '10px'
    });

    const archiveButton = $('<img>').attr('src', './public/assets/archive-icon.png').on('click', archiveTask);

    archiveButton.css({
        cursor: 'pointer',
        padding: '10px',
    });

    header.append(checkbox, headerText);
    body.append(descriptionParagraph);
    body.append(archiveButton);
    body.append(deleteButton);
    listItem.append(header, body);

    console.log(listItem);
    return listItem;
}

function addTask() {
    const todoTasks = getTodoTasks();
    const desc = $('#inputDescricao').val().trim();
    const color = $('input[name="cor"]:checked').val();

    if (!desc) {
        alert('Forneça uma descrição');
        return;
    }

    if ($('#tasks').children().filter((index, item) => item.children[1].innerText === desc).length > 0) {
        alert('Task already exists');
        return;
    }

    if (!color) {
        console.log('Escolha uma cor');
        return;
    }

    const listItem = createListItem(desc, color, false, false);

    $('#tasks').append(listItem);

    const tasks = getTasksFromLocalStorage();

    tasks.push({ desc, color, isArchived: false, isDone: false });

    setTasksToLocalStorage(tasks);

    $('#inputDescricao').val('');
    $('input[name="cor"]').prop('checked', false);
}

