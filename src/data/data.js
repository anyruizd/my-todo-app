import ItemsData from './ItemsData'

const data = new ItemsData();

data.add({
  value: 'holiii',
  completed: true,
  visible: true
})

data.add({
  value: 'Hello again',
  completed: false,
  visible: true
})

export default data;