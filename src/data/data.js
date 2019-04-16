import ItemsData from './ItemsData'

const data = new ItemsData();

data.addItem({
  value: 'holiii',
  completed: true,
  visible: true
})

data.addItem({
  value: 'Hello again',
  completed: false,
  visible: true
})

export default data;