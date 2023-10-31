const main = document.getElementById('main')
const task = document.getElementById('task')
const btn = document.getElementById('btn')
const check = document.getElementById('check')
const deleteBtn = document.querySelector('.delete')

let todos = []

getTodos()

btn.addEventListener('click', addNewTodo)

function deleteTodo(key) {
    const newTodos = todos.filter(todo => {
        return todo.key != key
    })
    console.log(newTodos)
    todos = newTodos
    storeTodos()
    render()
}

function addNewTodo(e) {
    e.preventDefault()
    const todo = {
        todo: task.value,
        done: false,
        key: JSON.stringify(Date.now())
    }
    if (todo.todo == "") return;
    todos.push(todo)
    storeTodos()
    render()
    task.value = ""
}

function storeTodos() {
    const stringTodos = JSON.stringify(todos)
    localStorage.setItem("todos", stringTodos)
}

function getTodos() {
    const TODOS = JSON.parse(localStorage.getItem("todos"))
    if (TODOS) {
        todos = TODOS
    }
}

function render() {
    main.innerHTML = ""
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos) {
        todos.forEach((todo, index) => {
            const TODO = `<div class="todo"><div><input type="checkbox" id="check" data-key="${index}" onClick="handleCheck(this)" ${todo.done ? "checked" : ""}><p>${todo.todo}</p></div><button id="${todo.key}" class="delete" onClick="deleteTodo(this.id)">X</button></div>`
            main.insertAdjacentHTML('beforeend', TODO)
            console.log(todo.done ? "checked" : "")
        });
    }

}

function handleCheck(e) {
    const key = e.getAttribute("data-key")
    if (e.checked) {
        todos[key].done = true
    } else {
        todos[key].done = false
    }
    storeTodos()
}


render()




main.addEventListener('hold')