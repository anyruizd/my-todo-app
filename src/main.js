import data from './data/data'
import createTitle from './components/Title/createTitle';
import createItemCreator from './components/ItemCreator/createItemCreator';
import createSelectAll from './components/SelectAll/createSelectAll'
import createItemsContainer from './components/ItemsContainer/createItemsContainer'
import createFooter from './components/Footer/createFooter'

import './main.scss'

const rootElement = document.querySelector('#root');

const title = createTitle();

const itemCreator = createItemCreator()

const selectAllButton = createSelectAll()
const itemsContainer = createItemsContainer()
const footer = createFooter()

rootElement.appendChild(title);
rootElement.appendChild(itemCreator);
rootElement.appendChild(selectAllButton);
rootElement.appendChild(itemsContainer);
rootElement.appendChild(footer);
