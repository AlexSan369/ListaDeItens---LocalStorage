// Buscando os elementos da página

let form = document.getElementById('addForm');
let itemList = document.getElementById('items');
let filter  = document.getElementById('filter');
let teste = itemList.getElementsByTagName('span');

// Adicionando os Eventos
// Ao enviar formulário
form.addEventListener('submit', addItem);

// Botão Deletar Item
itemList.addEventListener('click', removeItem);

// Procurar Item
filter.addEventListener('keyup', buscarItems);

// Adiciona Item
function addItem(elemento) {
    elemento.preventDefault();

    // Recebe valor do Input "Busca Item"
    let newItem = document.getElementById('item').value;
    // Criando novo item <li>
    let li = document.createElement('li');
    // Adicionando a classe bootstrap
    li.className = 'list-group-item';
    // envolvendo o texto em um span
    let liTxt = document.createElement('span')
    // Inserindo texto recebido na var newItem
    liTxt.appendChild(document.createTextNode(newItem));
    li.appendChild(liTxt);

    // Criando o botão delete no item da lista
    let deleteBtn = document.createElement('button');
    // Adiciona classes para o botão delete
    deleteBtn.className = 'btn btn-danger btn-sm float-end delete';
    // Adiciona o texto do botão
    deleteBtn.appendChild(document.createTextNode('X'));
    // Acrescenta o botão no elemento li
    li.appendChild(deleteBtn);
    itemList.appendChild(li); // Adiciona o novo item na lista
    form.reset(); // Limpa o formulário

    // Salva os itens no localStorage
    saveItems();
}

// Remover Itens
function removeItem (e) {
    //console.dir(e);
    if (e.target.classList.contains('delete')) {
        let li = e.target.parentElement;
        itemList.removeChild(li);
    }

    // Salva os itens no localStorage
    saveItems();
}

// Procurar Itens
function buscarItems (e) {
    // Converte o texto para minúsculo
    let text = e.target.value.toLowerCase();
    // Busca todos os itens da lista
    let items = itemList.getElementsByTagName('li');
    // Converte os itens para um array
    Array.from(items).forEach(function (item) {
        // Busca o primeiro item da lista
        let itemName = item.firstChild.textContent;
        // Busca o item na lista que começa com o mesmo texto digitado
        if (itemName.toLocaleLowerCase().indexOf(text) != -1) {
            item.style.display = 'block'; // Exibe o Item
        } else {
            item.style.display = 'none';
        }
    });
}

// Salva os itens no localStorage
function saveItems() {
    let items = [] //array para receber os itens
    let lis = itemList.getElementsByTagName('span');
    for (let i = 0; i < lis.length; i++) {
        items.push(lis[i].textContent);
    }
    localStorage.setItem('items', JSON.stringify(items));
}

// Carrega os itens do localStorage
function loadItems() {
    let items = JSON.parse(localStorage.getItem('items'));
    if (items) {
        for (let i = 0; i < items.length; i++) {
            let li = document.createElement('li');
            li.className = 'list-group-item';
            let liTxt = document.createElement('span');
            liTxt.appendChild(document.createTextNode(items[i]));
            li.appendChild(liTxt);

            let deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger btn-sm float-end delete';
            deleteBtn.appendChild(document.createTextNode('X'));
            li.appendChild(deleteBtn);
            itemList.appendChild(li);
        }
    }
}

// Carrega os itens do localStorage ao carregar a página
loadItems();