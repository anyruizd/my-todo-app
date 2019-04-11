import createItem from '../Item/createItem'
import data from '../../data/data'

export default function createItemsContainer(properties = {}) {
  const element = document.createElement('ul')
  element.classList.add('todos__items-container')

  function renderItems() {
    const list = data.getList()
    const events = {
      onSelect,
      onRemove,
      onEdit
    }
    
    element.innerHTML = ''
    list.forEach(itemData => {
      const itemElement = createItem({...itemData, ...events})
      element.appendChild(itemElement)
    });
  }

  function onSelect (id) {
    data.select(id)
  }

  function onRemove (id) {
    data.remove(id)
  }

  function onEdit (id, value) {
    data.update(id, value)
  }

  data.subscribe('updateItem', renderItems)
  renderItems();

  return element
}