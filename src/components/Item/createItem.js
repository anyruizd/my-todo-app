import './item.scss'

export default function createItem (properties = {}) {
  const {
    id,
    value,
    completed,
    onSelect,
    onRemove,
    onEdit
  } = properties;
  
  const element = document.createElement('li')
  element.className = `item ${completed ? "item--selected" : ''}`

  element.innerHTML = `
    <div class="item__checkbox">
      <input ${completed ? "checked" : ''}
      type="checkbox" value="None"
      id="${id}"
      name="check"/>
      <label for="${id}"></label>
    </div>
    <span class="item__text">${value}</span>
    <input class="item__edit"
      type="text"
      value="${value}"
    />
    <button class="item__remove"></button>
  `

  const checkboxElement = element.querySelector('input[type="checkbox"]')
  const removeElement = element.querySelector('.item__remove')
  const itemTextElement = element.querySelector('.item__text')
  const itemEditElement = element.querySelector('.item__edit')

  checkboxElement.addEventListener('click', () => onSelect(id, !completed))
  removeElement.addEventListener('click', () => onRemove(id))
  itemTextElement.addEventListener('dblclick', () => { 
    element.classList.add('item--editing') 
  })
  
  itemEditElement.addEventListener('keypress', (event) => {
    const enterKeyCode = 13
    const currentValue = event.keyCode
    const inputValue = event.target.value
    const isEnter = currentValue === enterKeyCode
  
    if (isEnter && inputValue.trim()) {
      onEdit(id, itemEditElement.value)
      itemEditElement.value = ''
      element.classList.remove('item--editing')
    }
  })
  
  return element
}