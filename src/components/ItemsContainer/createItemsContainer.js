import createItem from '../Item/createItem'
import data from '../../data/data'

export default function createItemsContainer(properties = {}) {
  const element = document.createElement('ul')
  element.classList.add('todos__items-container')

  data.subscribe('addItem', () => {
    const list = data.getList()

    element.innerHTML = ''
    list.forEach(itemData => {
      const itemElement = createItem(itemData)
      element.appendChild(itemElement)
    });
  })

  return element
}