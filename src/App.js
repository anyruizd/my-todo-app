const { renderTitle } = require('./components/Title/Title')
const { Input } = require('./components/Input/Input')
const { TodosList } = require('./components/TodosList/TodosList')

const todoList = new TodosList()

const renderApp = (node) => {
  const title = renderTitle()

  const shell = `<section class="todos__elements">
                  ${ title }
                  <ul class="todos__items-container"></ul>
                </section>`

  node.innerHTML = shell
  const input = new Input(node, todoList.add.bind(todoList))
}

/* const todosData = [
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
] */

module.exports = { renderApp }