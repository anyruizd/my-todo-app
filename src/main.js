import ItemsData from './data/ItemsData';
import createTitle from './components/createTitle';
import createItemCreator from './components/createItemCreator';
import createItemsContainer from './components/createItemsContainer'
import createItem from './components/createItem'

import './main.scss'

const rootElement = document.querySelector('#root');
const data = new ItemsData();

const title = createTitle({
  title: 'todos',
});

const itemCreator = createItemCreator({
  placeholder: 'What needs to be done?',
  addItem
})

function addItem(value) {
  data.add({
    value,
    completed: false
  })
}

const itemsContainer = createItemsContainer(data)

rootElement.appendChild(title);
rootElement.appendChild(itemCreator);
rootElement.appendChild(itemsContainer);
