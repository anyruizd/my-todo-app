import createItem from '../Item/createItem'
import data from '../../data/data'

import './itemsContainer.scss'

export default function createItemsContainer (properties = {}) {
  const element = document.createElement('ul')
  element.classList.add('todos__items-container')

  function renderItems () {
    const list = data.getFilteredItems()
    const events = {
      onSelect,
      onRemove,
      onEdit
    }
    
    element.innerHTML = '' // Reset container before repainting
    list.forEach(itemData => {
      const itemElement = createItem({...itemData, ...events})
      element.appendChild(itemElement)
    });
  }

  function onSelect (id) {
    data.selectItem(id)
  }

  function onRemove (id) {
    data.removeItem(id)
  }

  function onEdit (id, value) {
    data.updateItem(id, value)
  }

  data.subscribe('updateItem', renderItems)
  data.subscribe('updateFilter', renderItems)
  renderItems();

  return element
}