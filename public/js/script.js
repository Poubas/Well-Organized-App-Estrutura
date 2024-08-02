$(document).ready(loadTasksFromLocalStorage);
$(document).ready(() => $('#taskInput').hide());
$('#btnAdicionar').on('click', addTask);
$('#addTaskButton').on('click', () => {
    $('#taskInput').show();
    $('#addTaskButton').hide();
});

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function setTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {

        const listItem = createListItem(task.desc, task.color, task.isArchived, task.isDone);

        if (task.isArchived) {
            $('#archived-tasks').append(listItem);
        } else {
            $('#tasks').append(listItem);
        }
    });
}


function getTodoTasks() {
    return $('#todo-task');
}

function getArchiveTasks() {
    return $('#archive-tasks');
}

function deleteCard() {
    const desc = $(this).siblings()[0].innerText;
    const tasks = getTasksFromLocalStorage();

    for (task of tasks) {
        if (task.desc === desc) {
            const index = tasks.indexOf(task);
            tasks.splice(index, 1);
        }
    }
    
    setTasksToLocalStorage(tasks);

    $(this).closest('li').remove();
}

function archiveTask() {

    const desc = $(this).siblings()[0].innerText;
    const tasks = getTasksFromLocalStorage();

    for (task of tasks) {
        if (task.desc === desc) {
            task.isArchived = true;
        }
    }

    setTasksToLocalStorage(tasks);
    $(this).closest('li').remove();
}

function cardCheckbox() {
    const checkbox = $(this);
    const header = checkbox.parent();
    const description = header.next().children()[0].innerText;
    const descriptionParagraph = header.next().children().filter('p');

    let tasks = getTasksFromLocalStorage();

    for (task of tasks) {
        if (task.desc === description) {
            task.isDone = !task.isDone;
            if (task.isDone) {
                header.children()[1].innerText = 'Concluida';
                checkbox.attr('src', './public/assets/checked.png');
                header.removeClass('todoHeader');
                header.addClass('doneHeader');
                header.next().children().filter('#archiveButton').show();
                descriptionParagraph.removeClass('todoText');
                descriptionParagraph.addClass('doneText');
            } else {
                header.children()[1].innerText = 'Não concluida';
                checkbox.attr('src', './public/assets/unchecked.png');
                header.removeClass('doneHeader');
                header.addClass('todoHeader');
                header.next().children().filter('#archiveButton').hide();
                descriptionParagraph.removeClass('doneText');
                descriptionParagraph.addClass('todoText');
            }
        }
    }

    setTasksToLocalStorage(tasks);
}

function createListItem(description, color, isArchived, isDone) {
    const listItem = $('<li></li>').addClass('liCard').css('backgroundColor', color);

    const header = $('<div id="cardHeader"></div>').addClass('todoHeader');

    const body = $('<div id="cardBody"></div>').addClass('todoText');

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

    let checkbox;
    let headerText;

    const descriptionParagraph = $('<p></p>').text(description).css('color', colortext).addClass('open-sans-semi-bold');
    const archiveButton = $('<img id="archiveButton" src="./public/assets/archive-icon.png">').on('click', archiveTask).hide();
    const deleteButton = $('<img id="deleteButton" src="./public/assets/trash-icon.png">').on('click', deleteCard).hide();

    if (isDone) {
        checkbox = $('<img src="./public/assets/checked.png">').on('click', cardCheckbox);
        headerText = $('<label></label>').text('Concluida');
        header.removeClass('todoHeader');
        header.addClass('doneHeader');
        descriptionParagraph.removeClass('todoText');
        descriptionParagraph.addClass('doneText');
        archiveButton.show();

    } else {
        checkbox = $('<img src="./public/assets/unchecked.png">').on('click', cardCheckbox);
        headerText = $('<label></label>').text('Não concluida');
        header.removeClass('doneHeader');
        header.addClass('todoHeader');
        descriptionParagraph.removeClass('doneText');
        descriptionParagraph.addClass('todoText');
        archiveButton.hide();
    }

    if (isArchived) {
        archiveButton.hide();
        deleteButton.show();
        checkbox.off('click');
    }


    header.append(checkbox, headerText);
    body.append(descriptionParagraph);
    body.append(archiveButton);
    body.append(deleteButton);
    listItem.append(header, body);

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

