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
    $(this).closest('li').remove();

    const desc = $(this).siblings('.descriptionParagraph').text();
    const tasks = getTasksFromLocalStorage();

    const index = getTaskIndex(tasks, desc);

    if (index !== -1) {
        tasks.splice(index, 1);
        setTasksToLocalStorage(tasks);
    }
}

function archiveTask() {
    console.log('archiveTask');
    $(this).closest('li').remove(); // Remove the item from the DOM

    const desc = $(this).siblings('.descriptionParagraph').text(); // Get the description of the task
    const tasks = getTasksFromLocalStorage(); // Get the tasks from local storage

    const index = getTaskIndex(tasks, desc); // Find the index of the task in the tasks array

    if (index !== -1) {
        tasks[index].isArchived = true; // Update the 'isArchived' attribute to true
        setTasksToLocalStorage(tasks); // Update the tasks in local storage
    }
}

function cardCheckbox() {
    const checkbox = $(this);
    const header = checkbox.parent();
    const description = header.siblings('.todoText').children('.descriptionParagraph');

    let tasks = getTasksFromLocalStorage();
    let index = getTaskIndex(tasks, description.text());

    checkbox.toggleClass('checked');

    if (checkbox.hasClass('checked')) {
        tasks[index].isDone = true;
        setTasksToLocalStorage(tasks);

        checkbox.empty().append($('<img>').attr('src', './public/assets/checked.png'));
        header.children('.headerText').text('Concluida').css('color', '#2b5a07');
        header.css('backgroundColor', '#b8ff99');
        header.parent().children('.todoText').children('.descriptionParagraph').css('text-decoration', 'line-through');
        description.next('.archiveButton').css('display', 'block');

    } else {
        tasks[index].isDone = false;
        setTasksToLocalStorage(tasks);

        checkbox.empty().append($('<img>').attr('src', './public/assets/unchecked.png'));
        header.children('.headerText').text('Não Concluida').css('color', '#e42c28');
        header.css('backgroundColor', '#ffa4a3');
        header.parent().children('.todoText').children('.descriptionParagraph').css('text-decoration', 'none');
        description.next('.archiveButton').css('display', 'none');

    }
}

function createListItem(description, color, isArchived, isDone) {
    const listItem = $('<li></li>').addClass('liCard').css('backgroundColor', color);

    const header = $('<div></div>').addClass('todoHeader');

    const body = $('<div></div>').addClass('todoText');

    let colortext;
    switch (color) {
        case '#daf5fa':
            colortext = '#19b5dc';
            break;
        case '#d1fecb':
            colortext = '#58a51d';
            break;
        case '#f6d0f6':
            colortext = '#cb65cb';
            break;
        case '#dcd0f3':
            colortext = '#9763f9';
            break;
        case '#fcfccb':
            colortext = '#8f8f69';
            break;
        case '#fbd4b4':
            colortext = '#ec842e';
            break;
        case '#fffff':
            colortext = '#727272';
            break;
        default:
            colortext = '';
            break;
    }

    const descriptionParagraph = $('<p class="descriptionParagraph"></p>').text(description).css({
        backgroundColor: color,
        color: colortext,
    });

    const deleteButton = $('<button></button>').append($('<img>').attr('src', './public/assets/trash-icon.png')).on('click', deleteCard).css({
        argin: '0',
        padding: '0',
        border: 'none',
        background: 'none',
        boxshadow: 'none',
        outline: 'none',
        cursor: 'pointer',
        display: 'none',
    });

    const checkbox = $('<button></button>').append($('<img>').attr('src', './public/assets/unchecked.png')).on('click', cardCheckbox).css({
        margin: '0',
        padding: '0',
        border: 'none',
        background: 'none',
        boxshadow: 'none',
        outline: 'none',
        cursor: 'pointer',
    });


    const headerText = $('<label class="headerText"></label>').text('Não concluida').css({
        color: '#e42c28',
        padding: '10px'
    });

    const archiveButton = $('<img>').append($('<img>'))
        .attr('src', './public/assets/archive-icon.png')
        .on('click', archiveTask)
        .addClass('archiveButton')
        .css('display', 'none');


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

    if ($('#tasks').children().filter((index, item) => item.children[1].children[0].innerText === desc).length > 0) {
        alert('Task already exists');
        return;
    }

    if (!color) {
        alert('Escolha uma cor');
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

