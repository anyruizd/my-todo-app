import createTitle from './components/Title/createTitle'
import createNewItem from './components/NewItem'
import createSelectAll from './components/SelectAll/'
import createItemsContainer from './components/ItemsContainer/'
import createFooter from './components/Footer/'

import './main.scss'

const rootElement = document.querySelector('#root')

const title = createTitle()
const newItem = createNewItem()
const selectAllButton = createSelectAll()
const itemsContainer = createItemsContainer()
const footer = createFooter()

rootElement.appendChild(title)
rootElement.appendChild(newItem)
rootElement.appendChild(selectAllButton)
rootElement.appendChild(itemsContainer)
rootElement.appendChild(footer)
