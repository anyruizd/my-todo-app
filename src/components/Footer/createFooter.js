import createLeftCounter from '../LeftCounter/createLeftCounter'
import data from './../../data/data'
import './footer.scss'

export default function createFooter (properties = {}) {
  const element = document.createElement('div')
  element.classList.add('todos__controllers')

  function updateLeftCounter () {
    element.innerHTML = ''
    const list = data.getList()
    const completedItems = list.filter(({completed}) => completed)
    const numberOfItemsLeft = list.length - completedItems.length
    const leftCounter = createLeftCounter({numberOfItemsLeft})
    element.appendChild(leftCounter)
  }

  updateLeftCounter()
  data.subscribe('updateItem', updateLeftCounter)
  return element
}