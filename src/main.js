import './main.scss'

const todosData = []

const inputEvents = () => {
  const input = document.querySelector('.todos__new-item')
  const enterKeyCode = 13

  input.addEventListener('keypress', event => {
    const currentValue = event.keyCode
    if (currentValue === enterKeyCode) {
      addTodoItem(input.value)
      input.value = ''
    }
  })
}

const updateItemsList = (list = []) => {
  const nodeToMount = document.querySelector('.todos__items-container')
  
  const itemsToDom = list.map((item, index) => {
    return `<li class="todos__item ${ item.completed ? 'todos__item--selected' : '' }">
              <div class ="todos__item-checkbox">
                <input type="checkbox" value="None" id="item-${index}-completed" name="check"/>
                <label for="item-${index}-completed"></label>
              </div>
              <span class="todos__item-text">${item}</span>
              <button class="todos__item-remove"></button>
            </li>`
  }).join('')

  nodeToMount.innerHTML = itemsToDom
}

const addTodoItem = item => {
  todosData.push(item)
  updateItemsList(todosData)
}

inputEvents()