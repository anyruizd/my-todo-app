import './main.scss'

const node = document.querySelector('#app')

const todosData = [
  {
  "text": "item number 1",
  "completed": true 
  },
  {
    "text": "item number 2",
    "completed": false 
  },
  {
    "text": "item number 3",
    "completed": false 
  }
]

const setTemplate = () => {
  const header = renderHeader()
  const input = renderInput()
  const todosList = renderTodosList(todosData)

  return (
    `<section class="todos__elements">
        ${ header }
        ${ input }
        <ul class="todos__items-container">
          ${ todosList }
        </ul>
     </section>
    `
  )
}

node.innerHTML = setTemplate()

const renderHeader = () => {
  return '<h1 class="todos__title">todos</h1>'
}

const renderInput = () => {
  return `<div class="todos">
            <input autofocus class="todos__new-item" placeholder="What needs to be done?">
          </div>`
}

const renderTodosList = (itemsList) => {
  const itemsDom = itemsList.map(item => {
    return `<div class="todos__item ${ item.completed ? 'todos__item--selected' : '' }">
              ${item.text}
            </div>`
  }).join('')

  return itemsDom
}

const inputElement = document.querySelector('.todos__new-item')

inputElement.addEventListener('keypress', event => {
  const enterKeyCode = 13
  const clickedElement = event.keyCode
  clickedElement === enterKeyCode ? console.log('target', inputElement.value) : ''
})