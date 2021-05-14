const todoStack = document.querySelector('#todoStack');
const getInput = document.querySelector('input');
const addTodo = document.querySelector('#addTodo');
const clearCompleted = document.querySelector('#clearCompleted');
const clearAll = document.querySelector('#clearAll');
const burger = document.querySelector('#burger');
let todoStorage = JSON.parse(localStorage.getItem('TODO_KEY')) || [];


let chance = 'odd';
burger.addEventListener('click',()=>{

    if(chance === 'odd'){
        burger.classList.toggle('open');
        clearCompleted.style.transform = "scale(1)";
        clearAll.style.transform = "scale(1)";
        chance = 'even';
    }else{
        burger.classList.toggle('open');
        clearCompleted.style.transform = "scale(0)";
        clearAll.style.transform = "scale(0)";
        chance = 'odd';
    }
})


// to save completed todo:
todoStack.addEventListener('click',(e)=>{
    if(e.target.tagName.toLowerCase() === 'input'){
        const selectedTodo = todoStorage.find(todo => todo.id === e.target.id);
        selectedTodo.complete = e.target.checked;
        saveTodo();
        renderTodo();
    }
})

// to delete completed todo:
clearCompleted.addEventListener('click',()=>{
    todoStorage = todoStorage.filter(todo => todo.complete !== true);
    saveTodo();
    renderTodo();
})


// to delete all todo:
clearAll.addEventListener('click',()=>{
    localStorage.removeItem('TODO_KEY');
    window.location.reload();
    renderTodo();
})


addTodo.addEventListener('click',()=>{
    if(getInput.value === null || getInput.value === '') return;
    const newTodo = createTodo(getInput.value);
    getInput.value = null;
    todoStorage.push(newTodo);
    saveTodo(newTodo);
    renderTodo();
})


function createTodo(value){
    return{id:Date.now().toString(), name:value, complete:false}
}



function saveTodo(){
    localStorage.setItem('TODO_KEY',JSON.stringify(todoStorage));
}


function renderTodo(){
    clearTodo(todoStack);
    todoStorage.forEach(todo=>{
        const div = document.createElement('div');
        div.classList.add('todo');

        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.classList.add('check');

        const label = document.createElement('label');
        const span = document.createElement('span');
        span.classList.add('custom-check');


        checkbox.setAttribute('id',todo.id);
        label.setAttribute('for',todo.id);
        label.innerText = todo.name;

        if(todo.complete === true){
            checkbox.checked = true;
        }

        div.appendChild(checkbox);
        div.appendChild(span);
        div.appendChild(label);
        todoStack.appendChild(div);
    })
}

function clearTodo(todoStack){
    while (todoStack.firstChild) {
        todoStack.removeChild(todoStack.firstChild);
    }
}

// get it from local storage:
renderTodo();