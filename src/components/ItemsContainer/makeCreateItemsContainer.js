import './itemsContainer.scss'

export default function makeCreateItemsContainer (dependencies) {
  const {
    data,
    createItem
  } = dependencies

  return function createItemsContainer (properties = {}) {
    const element = document.createElement('ul')
    element.classList.add('items-container')

    function onSelect (id, completed) {
      data.updateItem({ id, completed })
    }

    function onRemove (id) {
      data.removeItem(id)
    }

    function onEdit (id, value) {
      data.updateItem({ id, value })
    }

    function renderItems () {
      const list = data.getFilteredItems()

      // Reset container before repainting
      element.innerHTML = ''

      list.forEach(itemData => {
        const itemElement = createItem({
          ...itemData,
          onSelect,
          onRemove,
          onEdit
        })
        element.appendChild(itemElement)
      })
    }

    data.subscribe('updateList', renderItems)
    data.subscribe('updateFilter', renderItems)
    renderItems()

    return element
  }
}
