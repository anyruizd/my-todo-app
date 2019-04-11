export default function createItem(properties = {}) {
  const {
    id,
    value,
    completed,
    onSelect,
    onRemove,
    onEdit
  } = properties;
  
  const element = document.createElement('li')
  element.className = `todos__item todos__item--showing ${completed ? "todos__item--selected" : ''}`

  const template = `
    <div class="todos__item-checkbox">
      <input ${completed ? "checked" : ''} type="checkbox" value="None" id="${id}" name="check"/>
      <label for="${id}"></label>
    </div>
    <span class="todos__item-text">${value}</span>
    <input class="todos__item-edit" type="text" value="${value}"/>
    <button class="todos__item-remove"></button>
    `
  element.innerHTML = template

  const checkboxElement = element.querySelector('input[type="checkbox"]')
  const removeElement = element.querySelector('.todos__item-remove')
  const itemTextElement = element.querySelector('.todos__item-text')
  const itemEditElement = element.querySelector('.todos__item-edit')

  checkboxElement.addEventListener('click', () => onSelect(id))
  removeElement.addEventListener('click', () => onRemove(id))
  itemTextElement.addEventListener('dblclick', () => { element.classList.add('todos__item--editing') })
  itemEditElement.addEventListener('keypress', (event) => {
    const enterKeyCode = 13
    const currentValue = event.keyCode
    const inputValue = event.target.value
    const isEnter = currentValue === enterKeyCode
  
    if (isEnter && inputValue) {
      onEdit(id, itemEditElement.value)
      itemEditElement.value = ''
      element.classList.remove('todos__item--editing')
    }
  })
  
  return element
}


/**
 * const itemElement = itemsListElement.querySelector('.todos__item:last-child')
  const itemCheckbox = itemElement.querySelector('input[type="checkbox"]')
  const itemText = itemElement.querySelector('.todos__item-text')
  const itemEdit = itemElement.querySelector('.todos__item-edit')
  const itemRemove = itemElement.querySelector('.todos__item-remove')

  itemCheckbox.addEventListener('click', handleSelectItemEvent)
  itemText.addEventListener('dblclick', handleEditTextEvent)
  itemEdit.addEventListener('keypress', handleItemEditEvent)
  itemRemove.addEventListener('click', handleRemoveItemEvent)
 * 
 */
