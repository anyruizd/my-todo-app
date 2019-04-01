import createItem from './createItem'

export default function createItemsContainer(data) {
  
  const element = document.createElement('ul')
  element.classList.add('todos__items-container')
  data.subscribe('addItem', createItem)

  return element
}