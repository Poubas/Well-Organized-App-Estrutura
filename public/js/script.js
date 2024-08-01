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
            $('#archive-tasks').append(listItem);
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
    const listItem = $(evt.target).parent();
    $('archive-tasks').append(listItem);

    const tasks = getTasksFromLocalStorage();
    const desc = listItem.children().eq(1).text();

    tasks.forEach(task => {
        if (task.desc === desc) {
            task.arquivado = true;
            taskAtual
        }
    });

    setTasksToLocalStorage(tasks);

    listItem.remove();
}

    //let tasks = getTasksFromLocalStorage();
 //const desc = listItem.children().eq(1).text();

    //forEach(tasks, task => {
    //   if (task.desc === desc) {
    ///        task.arquivado = true;
    //    }
    //});

    //formatArchiveTask(listItem);
    //getArchiveTasks().append(listItem);
    
    //setTasksToLocalStorage(tasks);

function getTodoTasks() {
    return $('#todo-task');
}

function getArchiveTasks() {
    return $('#archive-tasks');
}

function createListItem(description, color) {
    const listItem = $('<li></li>').addClass('liCard').css('backgroundColor', color);

    const header = $('<div></div>').addClass('headerCard').css({
        backgroundColor: ' #ffa4a3',
        fontFamily: 'Roboto Regular',
        fontSize: '10px',
        padding: '10px'
    });

    const body = $('<div></div>').addClass('bodyCard');
    
    const descriptionParagraph = $('<p></p>').text(description).css({
        padding: '10px',
        fontFamily: 'Open Sans SemiBold',
        fontSize: '20px'
    });

    switch (color) {
        case '#daf5fa':
            descriptionParagraph.css('color', '#19b5dc');
            break;
        case '#d1fecb':
            descriptionParagraph.css('color', '#58a51d');
            break;
        case '#f6d0f6':
            descriptionParagraph.css('color', '#cb65cb');    
            break;
        case '#dcd0f3':
            descriptionParagraph.css('color', '#9763f9');
            break;
        case '#fcfccb':
            descriptionParagraph.css('color', '#8f8f69');
            break;
        case '#fbd4b4':
            descriptionParagraph.css('color', '#ec842e');
            break;
        case '#fffff':
            descriptionParagraph.css('color', '#727272');
            break;
        default:
            break;
    }
    
    const deleteButton = $('<img>').attr('src', 'public/assets/trash-icon.png').on('click', deleteItem);
    deleteButton.css({
        cursor: 'pointer',
        padding: '10px',
        display: 'none'
    });

    const notCompletedText = $('<label></label>').text('Não concluida').css({
        color: '#e42c28',
        padding: '10px'
    });

    const archiveButton = $('<img>').attr('src', 'public/assets/archive-icon.png').on('click', function() {
        archiveTask($(this).parent())
    });
    
    archiveButton.css({
        cursor: 'pointer',
        padding: '10px',
        display: 'none'
    });

    const checkbox = $('<input type="checkbox">').css('padding', '10px');

    checkbox.on('click', function() {
        if ($(this).is(':checked')) {
            
            notCompletedText.text('Concluída').css('color', '#2b5a07');
            descriptionParagraph.css('textDecoration', 'line-through');
            archiveButton.css('display', 'flex')
            
            $(this).parent('div').css({
                backgroundColor: '#b8ff99'
            });

            $(this).attr('src', 'public/assets/unchecked.png');
        } else {

            notCompletedText.text('Não concluída').css('color', '#e42c28');
            descriptionParagraph.css('textDecoration', 'none');
            archiveButton.css('display', 'none')

            $(this).parent('div').css({
                backgroundColor: '#ffa4a3'
            });;

            $(this).siblings('img').attr('src', 'public/assets/unchecked.png');
        }
    });
 

    header.append(checkbox, notCompletedText);
    body.append(descriptionParagraph);
    body.append(archiveButton);
    body.append(deleteButton);
    listItem.append(header, body);

    console.log(listItem);
    return listItem;
}

function changeState(card) {

}


