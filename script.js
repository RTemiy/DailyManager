const MF= document.getElementById('mf');
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
    Categories.innerHTML='';
    CategoriesField.innerHTML='';

    for (var x = 0; x < AllCategories.length; x++) {
        var a = document.createElement('div');
        a.textContent=AllCategories[x];
        a.setAttribute('id',AllCategories[x]);
        a.setAttribute('onclick',`ShowThisCategory('${AllCategories[x]}')`);
        var b= document.createElement('div');
        b.setAttribute('id',AllCategories[x]+"F");
        Categories.appendChild(a);
        CategoriesField.appendChild(b);
    }
    for (var x = 0; x < Events.length; x++) {
        let e = document.createElement('event');
        e.innerHTML = Events[x].beginningDate + ' | <p>' + Events[x].text;
        document.getElementById(Events[x].category+'F').appendChild(e);
    }
}

var Events = [];
var AllCategories = [];


function CreateEvent() {
    var m = document.createElement('NewWindow');
    var ih = document.createElement('p');
    ih.textContent = 'Введите текст';
    m.appendChild(ih);
    var it = document.createElement('input');
    m.appendChild(it);
    var ch = document.createElement('p');
    ch.textContent = 'Выберите категорию';
    m.appendChild(ch);
    var ic = document.createElement('select');
    for(var x=0;x<AllCategories.length;x++){
        var u = document.createElement('option');
        u.innerText=AllCategories[x];
        u.value=AllCategories[x];
        ic.appendChild(u);
    }
    m.appendChild(ic);
    m.appendChild(document.createElement('p'));
    var ok = document.createElement('button');
    ok.textContent = 'Создать';
    m.appendChild(ok);
    var cancel = document.createElement('button');
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
    var m = document.createElement('NewWindow');
    var ih = document.createElement('p');
    ih.textContent = 'Введите название категории';
    m.appendChild(ih);
    var it = document.createElement('input');
    m.appendChild(it);
    m.appendChild(document.createElement('p'));
    var ok = document.createElement('button');
    ok.textContent = 'Создать';
    m.appendChild(ok);
    var cancel = document.createElement('button');
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

function ShowThisCategory(a){
    var b=CategoriesField.childNodes;
    var c=Categories.childNodes;
    for(var x=0;x<b.length;x++){
        if(b[x].id!=a+'F'){
            c[x].setAttribute('style','color:grey;');
            b[x].hidden=true;
        }
        else{
            c[x].setAttribute('style','color:white;');
            b[x].hidden=false;
        }
    };
}

function SaveData(){
    localStorage.setItem('Events',JSON.stringify(Events));
    localStorage.setItem('Categories',JSON.stringify(AllCategories));
}

function LoadData(){
    Events=JSON.parse(localStorage.getItem('Events'));
    AllCategories=JSON.parse(localStorage.getItem('Categories'));
    Refresh();
}

NewButton.addEventListener('click', CreateEvent, false);
NewCategory.addEventListener('click', CreateCategory, false);
SaveButton.addEventListener('click', SaveData, false);
LoadButton.addEventListener('click', LoadData, false);

Refresh();
