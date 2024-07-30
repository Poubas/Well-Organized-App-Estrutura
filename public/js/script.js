let ulTarefas = document.getElementById('tarefas');
let cor;
const form = document.getElementById('menu')

//eventos

form.addEventListener('submit', function(evt) {
    evt.preventDefault();

    const formData = new FormData();
    const data = {}

    formData.forEach((value, key) => {
        data[key] = value;
    });

    console.log(data);
});

function getInput() {

}
/*function abrirMenu(botao) {
    let menu = document.getElementById(".menu");
    botao.parentNode.replaceChild(menu, botao);
}*/

function selecionarCor(btn) {
    let css = window.getComputedStyle(btn)
    let corFundo = css.backgroundColor;
    cor = corFundo;
}

function adicionarTarefa() {
    botaoAdicionar.addEventListener('click', () => {
        let cor;
        let descricao;

        adicionarTarefa(criarItemLista(descricao, cor));
        inputReset(inputDescricao);
    });
}

function criarItemLista(descricao, cor) {
    let li = document.createElement('li')
    let body = document.createElement('div');
    let header = document.createElement('div');

    let desc = document.createTextNode(text);
    this.desc.textContent = descricao;

    let text = document.createElement('p');
    text.textContent = "Não finalizado";

    let check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    check.addEventListener('click', concluirTarefa());

    header.appendChild(check, text)
    body.appendChild(descricao)
    li.appendChild(header, body)

    return li;
}

function adicionarTarefa(li) {
    let tarefas = ulTarefas.getTarefas()

    if (text === '') {
        alert('Forneça uma descrição');
        return;
    }

    if (itemExists(tarefas, descricao)) {
        alert('Item já existe');
        return;
    }

    ul_tarefas.appendChild(criarItemLista(li))
}

function criarItemLista(descricao, cor) {

}

function inputReset(input) {
    input.value = '';
}

function itemExists(lista, texto) {
    let listaItens = Array.from(lista.childNodes);

    let resultadoArray = listaItens.filter((item) => {
        return item.firstChild.nextSibling.textContent === text;
    });

    return arrayResult.length;
}

function getTarefas() {
    return document.getElementById('ulTarefas');
}
