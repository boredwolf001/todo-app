// Global vars
const form = document.getElementById('addTodo')
const todosContainer = document.getElementById('todos')
let todos = JSON.parse(localStorage.getItem('todos')) || []

// Add a todo el to DOM
function addTodoToDOM(todo) {
  const todoEl = document.createElement('div')

  todoEl.className = `todo ${todo.done && 'done'}`
  todoEl.setAttribute(`data-todoId-${todo.id}`, '')
  todoEl.innerHTML = `
    <h4 onclick="toggleDone(${todo.id})">${todo.text}</h4> 
    <i class="fas fa-trash" onclick="deleteTodo(${todo.id})"></i>
  `

  todosContainer.appendChild(todoEl)
}

todos.forEach(todo => {
  addTodoToDOM(todo)
})

// Add todo
function addTodo(todo) {
  const newTodo = {
    ...todo,
    done: false,
    id: todos.length + 1,
  }

  todos.push(newTodo)
  localStorage.setItem('todos', JSON.stringify(todos))

  addTodoToDOM(newTodo)
}

// Toggle The Done Property of  todo
function toggleDone(todoId) {
  todos = todos.map(todo =>
    todo.id === todoId ? { ...todo, done: !todo.done } : todo
  )
  localStorage.setItem('todos', JSON.stringify(todos))

  document.querySelector(`[data-todoId-${todoId}]`).classList.toggle('done')
}

// Delete a todo
function deleteTodo(todoId) {
  todos = todos.filter(todo => todo.id !== todoId)
  localStorage.setItem('todos', JSON.stringify(todos))

  document.querySelector(`[data-todoId-${todoId}]`).remove()
}

// Form submit event listener
form.addEventListener('submit', e => {
  e.preventDefault()

  const todoText = document.querySelector('[name=todoText]').value
  addTodo({ text: todoText })
  document.querySelector('[name=todoText]').value = ''
})
