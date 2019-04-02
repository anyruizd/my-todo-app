import createItem from '../Item/createItem'
import data from '../../data/data'

export default function createItemsContainer(properties = {}) {
  const element = document.createElement('ul')
  element.classList.add('todos__items-container')

  function renderItems() {
    const list = data.getList()

    element.innerHTML = ''
    list.forEach(itemData => {
      const itemElement = createItem(itemData)
      element.appendChild(itemElement)
    });
  }
  renderItems();
  data.subscribe('addItem', renderItems)

  return element
}