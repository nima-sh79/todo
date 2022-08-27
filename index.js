const todoTitle = document.getElementById('title');
const todoDesc = document.getElementById('description');
const submitTodoButton = document.getElementById('submit');
const mainList = document.getElementById('main');
const myAlert = document.getElementById('alert');
myAlert.style.display = 'none';
const toastify = (msg) => {
    myAlert.children[0].innerHTML = msg;
    myAlert.style.display = 'flex';
    myAlert.children[1].addEventListener('click', () => {myAlert.style.display = 'none';});
}

const lcTodos = localStorage.getItem('todosList');
const parsedLcTodos = JSON.parse(lcTodos) || [];
console.log(parsedLcTodos)


let savedTodos = [...parsedLcTodos];

const createNewTodo = (title, desc , id , checked) => {
    const listItem = document.createElement('li');
    listItem.id = id;
    const newTodoTitle = document.createElement('h3');
    const todoTitleInput =document.createElement('input');

    newTodoTitle.appendChild(todoTitleInput);

    todoTitleInput.className = "title-input";
    todoTitleInput.disabled = true;


    todoTitleInput.defaultValue = title;
    newTodoTitle.style.backgroundColor = 'tomato';
    if(checked) {newTodoTitle.style.backgroundColor = 'green'};
    const newTodoDesc = document.createElement('p');
    newTodoDesc.innerHTML = desc;
    const newTodoDel = document.createElement('button');
    newTodoDel.innerHTML = 'delete';
    const newTodoEdit = document.createElement('button');
    newTodoEdit.innerHTML = 'edit';
    const newTodoUpdate = document.createElement('button');
    newTodoUpdate.innerHTML = 'check';
    
    listItem.appendChild(newTodoTitle);
    listItem.appendChild(newTodoDesc);
    listItem.appendChild(newTodoDel);
    listItem.appendChild(newTodoEdit);
    listItem.appendChild(newTodoUpdate);
    mainList.appendChild(listItem); 


    // const todoActions = `<div>
    // <button onclick="alret('ckxvlcxkv')">DEl</button>
    // <button>EDIT</button>
    // <button>UPDATE</button>
    // </div>`;
    // listItem.innerHTML += todoActions;
};
    

savedTodos.forEach(todo => createNewTodo(todo.title, todo.desc, todo.id, todo.checked));


const handleCreateNewTodo = (e) => {
    e.preventDefault();
    if (!todoTitle.value) return toastify('please enter something');
    const newTodo = {
        id: Date.now(),
        title: todoTitle.value,
        desc: todoDesc.value,
        checked: false,
    };

    savedTodos.push(newTodo);
    localStorage.setItem('todosList', JSON.stringify(savedTodos))


    createNewTodo(newTodo.title, newTodo.desc, newTodo.id, newTodo.checked)
    

};

submitTodoButton.addEventListener('click' , handleCreateNewTodo);


mainList.addEventListener('click', (g) => {
    if (g.target.innerText === "delete") {
        const todoEl = g.target.parentElement;
        const filtredTodos = savedTodos.filter(
            (item) => item.id !== Number(todoEl.id)
        );
        localStorage.setItem("todosList", JSON.stringify(filtredTodos));
        location.reload();
    } else if (g.target.innerText === "check") {
        const todoEl = g.target.parentElement;
        const filtredTodo = savedTodos.filter(
            (item) => item.id === Number(todoEl.id)
        );
        const updateFiltredTodo = { ...filtredTodo[0], checked: true};
        const filtredTodos = savedTodos.filter(
            (item) => item.id !== Number(todoEl.id)
        );
        const updatedSavedTodos = [...filtredTodos, updateFiltredTodo];
        localStorage.setItem('todosList', JSON.stringify(updatedSavedTodos));
        location.reload();
        } else if (g.target.innerText === "edit") {
            const todoEl = g.target.parentElement;
            todoEl.children[0].children[0].disabled = false;
            todoEl.children[0].children[0].select();
            todoEl.children[0].children[0].style.backgroundColor = "blue";
            g.target.innerText = "save";
            g.target.addEventListener('click', () => {
                const filtredTodo = savedTodos.filter(
                    (item) => item.id === Number(todoEl.id)
                );
                const updateFiltredTodo = { ...filtredTodo[0], title: todoEl.children[0].children[0].value};
                const filtredTodos = savedTodos.filter(
                    (item) => item.id !== Number(todoEl.id)
                );
                const updatedSavedTodos = [...filtredTodos, updateFiltredTodo];
                localStorage.setItem('todosList', JSON.stringify(updatedSavedTodos));
                location.reload();  
            })

        }
});
