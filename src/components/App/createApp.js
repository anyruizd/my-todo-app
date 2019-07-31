import createTitle from '../Title'
import createNewItem from '../NewItem'
import createSelectAll from '../SelectAll'
import createItemsContainer from '../ItemsContainer'
import createFooter from '../Footer'

import './App.scss'

export default function createApp (node) {
  const title = createTitle()
  const newItem = createNewItem()
  const selectAllButton = createSelectAll()
  const itemsContainer = createItemsContainer()
  const footer = createFooter()

  node.appendChild(title)
  node.appendChild(newItem)
  node.appendChild(selectAllButton)
  node.appendChild(itemsContainer)
  node.appendChild(footer)
}
