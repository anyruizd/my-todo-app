import './main.scss'

const selectAllElement = document.querySelector('.todos__select-all')
const itemsListElement = document.querySelector('.todos__items-container')
const itemsLeftCounterElement = document.querySelector('.items-left__counter')
const inputElement = document.querySelector('.todos__new-item')
const controllersElement = document.querySelector('.todos__controllers')
const clearCompletedElement = document.querySelector('.todos__clear-completed')
const filtersElement = document.querySelector('.todos__filters')

let indexCounter = 0

function removeItem(item) {
  item.removeEventListener('click', handleItemsEvents)
  item.remove()
  updateItemsLeft()
  updateControlElementsVisibility()
}

function handleSelectAll() {
  // TODO: Check which elements don't have selected class active
  // and activate it, and if all of them have the class selected, 
  // then deactivate it.

  const itemsElements = itemsListElement.querySelectorAll('.todos__item')
  const nextValue = selectAllElement.dataset.value === 'true' ? true : false
  
  itemsElements.forEach(item => {
    const checkboxElement = item.querySelector('input[type="checkbox"]')
    checkboxElement.checked = nextValue
    checkboxElement.checked ? 
    item.classList.add('todos__item--selected') :
    item.classList.remove('todos__item--selected')
  })

  selectAllElement.dataset.value = nextValue ? 'false' : 'true'
  updateItemsLeft()
}

function updateItemsLeft() {
  const itemsElements = Array.from(itemsListElement.querySelectorAll('.todos__item'))

  const itemsLeftElements = checkedItems(itemsElements)

  itemsLeftCounterElement.innerHTML = (itemsElements.length - itemsLeftElements.length) + ' items left'
}

function checkedItems(itemsList) {
  return itemsList.filter(item => {
      const checkboxElement = item.querySelector('input[type="checkbox"]')
      return checkboxElement.checked
    })

}

function handleCreateNewItem(event) {
  const enterKeyCode = 13
  const currentValue = event.keyCode
  const isEnter = currentValue === enterKeyCode

  if (isEnter && inputElement.value) {
    addItem(inputElement.value)
    inputElement.value = ''
  }
}

function addItem(itemText) {
  itemsListElement.appendChild(createItemTemplate(itemText))

  const itemsListElements = itemsListElement.querySelectorAll('.todos__item')
  itemsListElements.forEach(item => item.addEventListener('click', handleItemsEvents))
  updateControlElementsVisibility()
  updateItemsLeft()
}

function updateControlElementsVisibility() {
  const itemsListElements = itemsListElement.querySelectorAll('.todos__item')
  const hasNoItems = itemsListElements.length === 0
  if (hasNoItems) {
    controllersElement.classList.add('hidden')
    selectAllElement.classList.add('hidden')
    
  } else {
    controllersElement.classList.remove('hidden')
    selectAllElement.classList.remove('hidden')
  }
}

function createItemTemplate(text) {
  const parser = new DOMParser();
  const template =  `
    <li class="todos__item todos__item--showing">
      <div class ="todos__item-checkbox">
        <input type="checkbox" value="None" id="item-${indexCounter}-completed" name="check"/>
        <label for="item-${indexCounter}-completed"></label>
      </div>
      <span class="todos__item-text">${text}</span>
      <button class="todos__item-remove" data-remove="remove-${indexCounter}-item"></button>
    </li>
  `
  
  indexCounter += 1
  return parser.parseFromString(template, 'text/html').body.children[0]
  
}

function handleItemsEvents (event) {
  const itemCompleted = /item-\d-completed/;

  const clickedElement = event.target
  clickedElement.classList.contains('todos__item-remove') ? removeItem(clickedElement.closest('.todos__item')) : ''
  itemCompleted.test(clickedElement.id) ? selectItem(clickedElement.closest('.todos__item')) : ''
}

function selectItem(item) {
  item.classList.toggle('todos__item--selected')
  updateItemsLeft()
}

function handleClearCompleted(event) {
  const itemsElements = itemsListElement.querySelectorAll('.todos__item')
  const itemsToRemove = checkedItems(Array.from(itemsElements))

  itemsToRemove.forEach(item => {
    removeItem(item)
  })
}

function handleFilterElements(event) {
  // TODO: Depending on the clicked filter button, shows elements as follows:
  // If "all": add --showing modifier to all elements nad remove --hidden
  // If "completed": filter all checked checbox and add --showing
  // If "active": filter all unchecked checkbox and add --showing
  const clickedElement = event.target.id

  const filterType = {
    "show-all" : showAll,
    "show-active": showActive,
    "show-completed": showCompleted
  }

  filterType[`${clickedElement}`]()
}

function showAll() {
  const itemsElements = itemsListElement.querySelectorAll('.todos__item')

  itemsElements.forEach(item => {
    item.classList.remove('todos__item--hidden')
    item.classList.add('todos__item--showing')
  })
}

function showActive() {
  const itemsElements = [... itemsListElement.querySelectorAll('.todos__item')]

  itemsElements.forEach(item => {
    item.classList.add('todos__item--hidden')
  })

  const itemsToShow = itemsElements.filter(item => {
    const checkboxElement = item.querySelector('input[type="checkbox"]')
    return !checkboxElement.checked
  })
  .forEach(item => {
    item.classList.remove('todos__item--hidden')
    item.classList.add('todos__item--showing')
  })
  
}

function showCompleted() {
  const itemsElements = itemsListElement.querySelectorAll('.todos__item')
  const itemsToShow = checkedItems([... itemsElements])

  // TODO: How can I improve this?
  itemsToShow.length ? itemsElements.forEach(item => {
    item.classList.add('todos__item--hidden')
  }) : ''
  
  itemsToShow.forEach(item => {
    item.classList.remove('todos__item--hidden')
    item.classList.add('todos__item--showing')
  })
}

filtersElement.addEventListener('click', handleFilterElements)
clearCompletedElement.addEventListener('click', handleClearCompleted)
selectAllElement.addEventListener('click', handleSelectAll)
inputElement.addEventListener('keypress', handleCreateNewItem)
updateItemsLeft()