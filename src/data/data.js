import ItemsData from './ItemsData'

const data = new ItemsData()

data.addItem({
  value: 'holiii',
  completed: true
})

data.addItem({
  value: 'Hello again',
  completed: false
})

export default data
