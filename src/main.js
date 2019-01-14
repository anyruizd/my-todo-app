import './main.scss'

/* ----------------------------------- Init app */

const initApp = () => {
  renderList()
  handleEvents()
}

/** ----------------------------------- Create new items */
const todosData = []

const createNewItem = () => {
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

const addTodoItem = item => {
  const newItem = {
    "text" : item,
    "completed" : false
  }
  todosData.push(newItem)
  renderList(todosData)
  updateElements()
  itemsReferences()
}

/** ----------------------------------- Read items created */

const renderList = (list = []) => {
  const nodeToMount = document.querySelector('.todos__items-container')
  
  const itemsToDom = list.map((item, index) => {
    return `<li class="todos__item">
              <div class ="todos__item-checkbox">
                <input type="checkbox" value="None" id="item-${index}-completed" name="check"/>
                <label for="item-${index}-completed"></label>
              </div>
              <span class="todos__item-text">${item.text}</span>
              <button class="todos__item-remove"></button>
            </li>`
  }).join('')

  nodeToMount.innerHTML = itemsToDom
}

const updateElements = () => {
  const controllersReference = document.querySelector('.todos__controllers')
  const selectAllReference = document.querySelector('.todos__select-all')

  controllersReference.classList.remove('hidden')
  selectAllReference.classList.remove('hidden')

}

/* Update */

// 1......... Marcar individual

const itemsReferences = () => {
  const itemReference = document.querySelector('.todos__items-container')

  itemReference.addEventListener('click', (event) => {
    const clickedElement = event.target
    /* const isCheckbox = clickedElement.closest('.todos__item-checkbox')
    const isRemove = clickedElement.classList.contains('todos__items-remove')

    isCheckbox ? itemReference.classList.toggle('todos__item--selected') : '' */
    console.log(clickedElement)
  })
}


const handleEvents = () => {
  createNewItem()
}

initApp()