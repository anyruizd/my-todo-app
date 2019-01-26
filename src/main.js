import './main.scss'

// TODO: modify items reference scope, it is repeating in several functions

const selectAllElement = document.querySelector('.todos__select-all')
const itemsListElement = document.querySelector('.todos__items-container')
const itemsLeftCounterElement = document.querySelector('.items-left__counter')
const inputElement = document.querySelector('.todos__new-item')
const controllersElement = document.querySelector('.todos__controllers')
let indexCounter = 0

function removeItem(item) {
  // TODO: Deberia recibir la referencia del elemento y removerla 
  const itemToRemove = item.closest('.todos__item')

  itemToRemove.removeEventListener('click', handleItemsEvents)
  itemToRemove.remove()
  updateItemsLeft()
  updateControlElementsVisibility()
}

function handleSelectAll() {
  const itemsElements = itemsListElement.querySelectorAll('.todos__item')
  const nextValue = selectAllElement.dataset.value === 'true' ? true : false
  
  itemsElements.forEach(itemElement => {
    const checkboxElement = itemElement.querySelector('input[type="checkbox"]')
    checkboxElement.checked = nextValue
    itemElement.classList.toggle('todos__item--selected')
  })

  selectAllElement.dataset.value = nextValue ? 'false' : 'true'
  
  updateItemsLeft()
}

function updateItemsLeft() {
  const itemsElements = Array.from(itemsListElement.querySelectorAll('.todos__item'))

  const itemsLeftElements = itemsElements.filter(itemElement => {
    const checkboxElement = itemElement.querySelector('input[type="checkbox"]')
    return checkboxElement.checked
  })

  itemsLeftCounterElement.innerHTML = itemsLeftElements.length + ' items left'
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
    <li class="todos__item">
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
  const regex = /item-\d-completed/;

  const clickedElement = event.target
  clickedElement.classList.contains('todos__item-remove') ? removeItem(clickedElement) : ''
  regex.test(clickedElement.id) ? selectItem(clickedElement) : ''
}

function selectItem(item) {
  item.closest('.todos__item').classList.toggle('todos__item--selected')
  updateItemsLeft()
}

selectAllElement.addEventListener('click', handleSelectAll)
inputElement.addEventListener('keypress', handleCreateNewItem)
updateItemsLeft()