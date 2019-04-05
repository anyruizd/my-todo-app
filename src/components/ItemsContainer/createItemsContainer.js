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
      onEdit,
      onDoubleClick
    }
    element.innerHTML = ''
    list.forEach(itemData => {
      const itemElement = createItem({...itemData, ...events})
      console.log({...itemData, ...events})
      element.appendChild(itemElement)
    });
  }
  
  renderItems();
  data.subscribe('addItem', renderItems)
  data.subscribe('removeItem', renderItems)

  function onSelect (id) {
    console.log('onselect!', id)
  }

  function onRemove (id) {
    data.remove(id)
  }

  function onEdit (id) {
    console.log('onEdit!', id)
  }

  function onDoubleClick (id) {
    console.log('onDoubleClick!', id)
  }

  return element
}