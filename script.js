const form = document.querySelector('.form');
const formInputTitle = document.querySelector('.form>input#title');
const formInputAuthor = document.querySelector('.form>input#author');
const formInputType = document.querySelector('.form>input#type');
const listItems = document.querySelector('.list-items');

let library = {}

function loadHTML() {
    if (!window.localStorage.getItem('data')) return;
    const data = JSON.parse(window.localStorage.getItem('data'));
    Object.keys(library).map(key => createHTML(library[key]));
}
window.addEventListener('load', loadHTML);
form.addEventListener('submit', createItem);
// creation de contenu
// C
function createItem(e) {
    e.preventDefault();
    const timestamp = Date.now();
    library[timestamp] = {
        title: formInputTitle.value,
        author: formInputAuthor.value,
        type: formInputType.value,
        checked: false
    }
    createHTML(library[timestamp], timestamp);
    saveObj();
    this.reset();
}
// fonction créeant du visuel HTML
// R
function createHTML(obj, key) {
    if (!obj.title) return;
    const html = `
    <span>${obj.title} de genre ${obj.type}, écrit par ${obj.author}</span>
    <button name="trash" class="btnItem">🗑️</button>
    <button name="changes" class="btnItem">✏️</button>
    <button name="check" class="btnItem">${obj.checked ? '🔄' : '✔️'}</button>
    `
    const li = document.createElement('li');
    li.classList.add('item');
    li.setAttribute('data-key', key);
    li.innerHTML = html;
    // chaque saisie se place au dessus du plus ancien
    listItems.insertBefore(li, listItems.firstChild);
    li.children.trash.onclick = toBin;
    li.children.check.onclick = check;
}
// creation du formulaire de modification
function createEditForm(e) {
    e.preventDefault();
    const timestamp = Date.now();
    library[timestamp] = {
        title: formInputTitle.value,
        author: formInputAuthor.value,
        type: formInputType.value,
        checked: false
    }
    createHTML(library[timestamp], timestamp);
    saveObj();
    this.reset();
}
// fonction de corbeille
function toBin() {
    this.parentNode.remove();
    const key = this.parentNode.getAttribute('data-key');
    delete library[key];
    saveObj();
}
// fonction de validation de lecture d'un livre
function check() {
    this.parentNode.classList.toggle('flip');
    this.innerHTML = this.innerHTML === '✔️' ? "🔄" : "✔️";
    const key = this.parentNode.getAttribute('data-key');
    library[key].checked = !library[key].checked;
    console.log(library[key].checked);
    saveObj();
}

function saveObj() {
    window.localStorage.setItem('data', JSON.stringify(library));
}
