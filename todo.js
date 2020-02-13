// save to local store
// load from local store

const toDoForm = document.querySelector('.js-toDoForm');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';

let toDos = []; // save to do list 

function saveToDo(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function writeToDo(text){
    const newId = toDos.length + 1;

    // save to html
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerText = text;
    li.id = newId;

    const delBtn = document.createElement('button');
    delBtn.innerText = 'X';
    delBtn.addEventListener("click", deleteToDo);
    
    li.appendChild(span);
    li.appendChild(delBtn);

    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    };

    // save to local store
    toDos.push(toDoObj);
    saveToDo();
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        // const parsedToDos = JSON.parse(loadedToDos);
        JSON.parse(loadedToDos).forEach(function(toDo){
            writeToDo(toDo.text);
        });
    }
}

function deleteToDo(event){
    // search parent node
    const selectedBtn = event.target;
    const parentLi = selectedBtn.parentNode;
    toDoList.removeChild(parentLi);

    const cleanToDo = toDos.filter(function(toDo){
        return toDo.id !== parseInt(parentLi.id);
    })
    toDos = cleanToDo;
    saveToDo();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    writeToDo(currentValue);
    toDoInput.value = "";
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();