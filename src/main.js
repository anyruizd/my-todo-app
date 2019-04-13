import data from './data/data'
import createTitle from './components/Title/createTitle';
import createItemCreator from './components/ItemCreator/createItemCreator';
import selectAll from './components/SelectAll/selectAll'
import createItemsContainer from './components/ItemsContainer/createItemsContainer'

import './main.scss'

const rootElement = document.querySelector('#root');

const title = createTitle({
  title: 'todos'
});

function onAddItem(value) {
  data.add({
    value,
    completed: false
  })
}

const itemCreator = createItemCreator({
  placeholder: 'What needs to be done?',
  onAddItem
})

const selectAllButton = selectAll()

const itemsContainer = createItemsContainer()


rootElement.appendChild(title);
rootElement.appendChild(itemCreator);
rootElement.appendChild(selectAllButton);
rootElement.appendChild(itemsContainer);
