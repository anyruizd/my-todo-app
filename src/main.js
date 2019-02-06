import './main.scss'

const selectAllElement = document.querySelector('.todos__select-all')
const itemsListElement = document.querySelector('.todos__items-container')
const itemsLeftCounterElement = document.querySelector('.items-left__counter')
const inputElement = document.querySelector('.todos__new-item')
const controllersElement = document.querySelector('.todos__controllers')
const clearCompletedElement = document.querySelector('.todos__clear-completed')
const filtersElement = document.querySelector('.todos__filters')

let indexCounter = 0

/**
 *  Removes item
 * @param {Object} item 
 */
function removeItem(item) {
  item.removeEventListener('click', handleRemoveItemEvent)
  item.remove()
  updateItemsLeft()
  updateControlElementsVisibility()
} 

/**
 * Handles selectAll event
 */
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

/**
 * Updates the number of items left
 */
function updateItemsLeft() {
  const itemsElements = Array.from(itemsListElement.querySelectorAll('.todos__item'))

  const itemsLeftElements = checkedItems(itemsElements)

  itemsLeftCounterElement.innerHTML = (itemsElements.length - itemsLeftElements.length) + ' items left'
}

/**
 * Returns an array containing the checked items
 * @param { Array } itemsList 
 */
function checkedItems(itemsList) {
  return itemsList.filter(item => {
      const checkboxElement = item.querySelector('input[type="checkbox"]')
      return checkboxElement.checked
  })

}

/**
 * Handles the newItem creation
 * @param event 
 */
function handleCreateNewItem(event) {
  const enterKeyCode = 13
  const currentValue = event.keyCode
  const isEnter = currentValue === enterKeyCode

  if (isEnter && inputElement.value) {
    addItem(inputElement.value)
    inputElement.value = ''
  }
}

/**
 * Adds a new item to the items list
 * @param {String} itemText 
 */
function addItem(itemContent) {
  itemsListElement.appendChild(createItemTemplate(itemContent))

  const itemElement = itemsListElement.querySelector('.todos__item:last-child')
  
  const itemCheckbox = itemElement.querySelector('input[type="checkbox"]')
  const itemText = itemElement.querySelector('.todos__item-text')
  const itemRemove = itemElement.querySelector('.todos__item-remove')

  itemCheckbox.addEventListener('click', handleSelectItemEvent)
  itemText.addEventListener('dblclick', handleEditTextEvent)
  itemRemove.addEventListener('click', handleRemoveItemEvent)

  updateControlElementsVisibility()
  updateItemsLeft()
}

/**
 * Handles select item event
 * @param  event 
 */
function handleSelectItemEvent(event) {
  selectItem(event.target.closest('.todos__item'))
}

/**
 * Handles edit text event
 * @param event 
 */
function handleEditTextEvent(event) {
  console.log('handleEditTextEvent!!!')
}

/**
 * Handles remove item event
 * @param event 
 */
function handleRemoveItemEvent(event) {
  removeItem(event.target.closest('.todos__item'))
}

/**
 * Shows control elements when is needed
 */
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

/**
 * Returns DOM element containing item HTML template 
 * @param {String} text 
 */
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

/**
 * Select clicked item
 * @param {*} item 
 * 
 */
function selectItem(item) {
  item.classList.toggle('todos__item--selected')
  updateItemsLeft()
}

/**
 * Hanldes clearCompleted event
 * @param  event 
 */
function handleClearCompleted(event) {
  const itemsElements = itemsListElement.querySelectorAll('.todos__item')
  const itemsToRemove = checkedItems(Array.from(itemsElements))

  itemsToRemove.forEach(item => {
    removeItem(item)
  })
}

/**
 * Handles filterElements event
 * @param event 
 */
function handleFilterElements(event) {
  // TODO: Depending on the clicked filter button, shows elements as follows:
  // If "all": add --showing modifier to all elements nad remove --hidden
  // If "completed": filter all checked checbox and add --showing
  // If "active": filter all unchecked checkbox and add --showing
  const clickedElement = event.target.id

  const filterFunctions = {
    "show-all" : showAll,
    "show-active": showActive,
    "show-completed": showCompleted
  }

  filterFunctions[`${clickedElement}`]()
}

/**
 * Shows all the items list 
 */
function showAll() {
  const itemsElements = itemsListElement.querySelectorAll('.todos__item')

  itemsElements.forEach(item => {
    item.classList.remove('todos__item--hidden')
    item.classList.add('todos__item--showing')
  })
}

/**
 * Shows active items list
 */
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

/**
 * Shows completed items list
 */
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