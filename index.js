import { createStore } from 'redux'

/**********************************************/
/********** NODES = DOM MANIPULATION **********/
/**********************************************/
const app = document.querySelector('#root')
// Bootstrap container
const container = document.createElement('main')
container.className = 'container my-4'
app.appendChild(container)
// Bootstrap row
const row = document.createElement('div')
row.className = 'row'
container.appendChild(row)
// Bootstrap column
const column = document.createElement('div')
column.className = 'col-12 col-md-10 col-lg-8 mx-auto'
row.appendChild(column)
// Heading
const heading = document.createElement('h1')
heading.className = 'h3 mb-5 text-center'
heading.innerText = 'Task Manager'
column.appendChild(heading)
// Input
const inputGroup = document.createElement('div')
inputGroup.className = 'input-group mb-4'
inputGroup.innerHTML = `
    <input type="text" class="form-control" placeholder="Add a new todo" aria-label="Add a new todo" aria-describedby="button-addon2">
    <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" id="button-addon2">Add</button>
    </div>
`
column.appendChild(inputGroup)
// To Do List
const toDoList = document.createElement('ul')
toDoList.className = 'list-group'
column.appendChild(toDoList)

/*******************************/
/******** DRAWING TASKS ********/
/*******************************/
const drawTasks = () => {
  toDoList.innerHTML = ''
  store.getState().forEach(task => {
    const taskContainer = document.createElement('li')
    taskContainer.className = 'list-group-item'
    taskContainer.innerText = task
    toDoList.appendChild(taskContainer)
    listenToRemoveTodos(taskContainer)
  })
}

/*******************************/
/****** ADDING A NEW TODO ******/
/*******************************/
const listeningForNewTodos = () => {
  const button = document.querySelector('button')
  const inputField = document.querySelector('input')
  button.addEventListener('click', () => {
    store.dispatch({
      type: 'ADD',
      task: inputField.value
    })
    inputField.value = ''
  })
}

/*******************************/
/******* REMOVING A TODO *******/
/*******************************/
const listenToRemoveTodos = li => {
  li.addEventListener('click', e => {
    store.dispatch({
      type: 'DELETE',
      task: e.target.innerHTML
    })
  })
}

/*******************************/
/************ REDUX ************/
/*******************************/
// 1. Reducer
const demoTasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4']
const tasksReducer = (state = demoTasks, action) => {
  switch (action.type) {
    case 'ADD':
      return [action.task, ...state]
    case 'DELETE':
      return [...state.filter(task => task !== action.task)]
    default:
      return state
  }
}
// 2. Store
const store = createStore(tasksReducer)
// 3. Subscription
store.subscribe(() => drawTasks())

/*******************************/
/***** INITIATING THE APP ******/
/*******************************/
drawTasks()
listeningForNewTodos()
