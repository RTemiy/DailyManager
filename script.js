const MF = document.getElementById('mf');
const Toolbar = document.getElementById('toolbar');
const SaveButton = document.getElementById('save');
const NewButton = document.getElementById('new');
const NewCategory = document.getElementById('ncat');
const LoadButton = document.getElementById('load');
const Categories = document.getElementById('categories');
const CategoriesField = document.getElementById('catF');

class Event {
    constructor(text, category, Bdate) {
        this.completed = false;
        this.category = category;
        this.text = text;
        this.beginningDate = Bdate;
    }
}

function Refresh(lastusedcategory) {
    Categories.innerHTML = '';
    CategoriesField.innerHTML = '';

    for (let x = 0; x < AllCategories.length; x++) {
        let a = document.createElement('div');
        a.textContent = AllCategories[x];
        a.setAttribute('id', AllCategories[x]);
        a.setAttribute('onclick', `ShowThisCategory('${AllCategories[x]}')`);
        let b = document.createElement('div');
        b.setAttribute('id', AllCategories[x] + "F");
        Categories.appendChild(a);
        CategoriesField.appendChild(b);
    }
    for (let x = 0; x < Events.length; x++) {
        let e = document.createElement('event');
        e.innerHTML = Events[x].beginningDate + ' | <p>' + Events[x].text;
        e.setAttribute('number', x);
        e.setAttribute('onclick', `EventManager(${x})`);
        document.getElementById(Events[x].category + 'F').appendChild(e);
    }
}

var Events = [];
var AllCategories = [];


function CreateEvent() {
    let m = document.createElement('NewWindow');
    let ih = document.createElement('p');
    ih.textContent = 'Введите текст:';
    m.appendChild(ih);
    let it = document.createElement('input');
    m.appendChild(it);
    m.appendChild(document.createElement('hr'));
    let ch = document.createElement('p');
    ch.textContent = 'Выберите категорию: ';
    m.appendChild(ch);
    let ic = document.createElement('select');
    for (let x = 0; x < AllCategories.length; x++) {
        let u = document.createElement('option');
        u.innerText = AllCategories[x];
        u.value = AllCategories[x];
        ic.appendChild(u);
    }
    m.appendChild(ic);
    m.appendChild(document.createElement('hr'));
    let ok = document.createElement('button');
    ok.textContent = 'Создать';
    m.appendChild(ok);
    let cancel = document.createElement('button');
    cancel.textContent = 'Отменить';
    m.appendChild(cancel);
    ok.addEventListener('click', function () {
        Events.push(new Event(it.value, ic.value, new Date().toISOString().substring(0, 10)));
        Refresh();
        m.remove();
    });

    cancel.addEventListener('click', function () {
        m.remove();
    });
    MF.appendChild(m);
}

function CreateCategory() {
    let m = document.createElement('NewWindow');
    let ih = document.createElement('p');
    ih.innerHTML = 'Введите название категории:';
    m.appendChild(ih);
    let it = document.createElement('input');
    m.appendChild(it);
    m.appendChild(document.createElement('hr'));
    let ok = document.createElement('button');
    ok.textContent = 'Создать';
    m.appendChild(ok);
    let cancel = document.createElement('button');
    cancel.textContent = 'Отменить';
    m.appendChild(cancel);
    ok.addEventListener('click', function () {
        AllCategories.push(it.value);
        Refresh();
        m.remove();
    });

    cancel.addEventListener('click', function () {
        m.remove();
    });
    MF.appendChild(m);
}

function ShowThisCategory(a) {
    let b = CategoriesField.childNodes;
    let c = Categories.childNodes;
    for (let x = 0; x < b.length; x++) {
        if (b[x].id != a + 'F') {
            c[x].setAttribute('style', 'color:grey;');
            b[x].hidden = true;
        }
        else {
            c[x].setAttribute('style', 'color:white;');
            b[x].hidden = false;
        }
    };
}

function SaveData() {
    localStorage.setItem('Events', JSON.stringify(Events));
    localStorage.setItem('Categories', JSON.stringify(AllCategories));
}

function LoadData() {
    Events = JSON.parse(localStorage.getItem('Events'));
    AllCategories = JSON.parse(localStorage.getItem('Categories'));
    Refresh();
}

function EventManager(o) {
    let m = document.createElement('NewWindow');
    let ih = document.createElement('p');
    ih.innerHTML = 'Выберите действие с событием:';
    m.appendChild(ih);
    let de = document.createElement('button');
    de.textContent = 'Удалить';
    de.addEventListener('click', () => {
        Events.splice(o, 1);
        Refresh();
        m.remove();
    });
    m.appendChild(de);
    m.appendChild(document.createElement('p'));
    let cancel = document.createElement('button');
    cancel.textContent = 'Отменить действие';
    m.appendChild(cancel);
    cancel.addEventListener('click', function () {
        m.remove();
    });

    MF.appendChild(m);
}


NewButton.addEventListener('click', CreateEvent, false);
NewCategory.addEventListener('click', CreateCategory, false);
SaveButton.addEventListener('click', SaveData, false);
LoadButton.addEventListener('click', LoadData, false);

Refresh();
