$(document).ready(loadTasksFromLocalStorage);
$('#btnAdd').on('click', addTask);

function addTask() {
    let form= $('#formMenu').serializeArray();

    let desc = $('#inputDescricao').val();
    let color = $('input[name="cor"]:checked').val();

    //n funfa agui
    if (desc === '') {    
        alert('Forneça uma descrição');
        return;
    }

    if (itemExists(todoTasks, desc)) {
        alert('Item já existe');
        return;
    }

    if (cor === '') {    
        console.log('Escolha uma cor');
        return;
    }

    // add o item na lista
    let x = createListItem(desc, color);
    console.log(x);

    $('#tasksList').append(x);   

    let tasks = getTasksFromLocalStorage();
    tasks.push({'desc': desc, 'concluida': false, 'color': color});
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

function createListItem(desc, color) {
    let $li = $('<li></li>').addClass('liCard');

    let $header = $('<div></div>').addClass('headerCardNC').css('backgroundColor', '#ffa4a3');
    let $body = $('<div></div>').addClass('bodyCardNC').css('backgroundColor', color);

    let $desc = $('<p></p>').text(desc);

    let $textoNaoFinalizado = $('<p></p>')
        .text('Não concluida')
        .css({
            padding: '10px',
            color: '#e42c28'
        });

    let $check = $('<input type="checkbox">').css('padding', '10px').on('click', function () {
        changeState($li);
    });

    $header.append($check);
    $header.append($textoNaoFinalizado);

    $body.append($desc);

    $li.append($header);
    $li.append($body);

    return $li;
}

function changeState(card) {

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
