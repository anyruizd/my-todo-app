import './footer.scss'
import createLeftCounter from '../LeftCounter/createLeftCounter'
import createFilters from '../Filters/createFilters'
import data from './../../data/data'

export default function createFooter (properties = {}) {
  const element = document.createElement('div')
  element.classList.add('todos__controllers')

  function onShowAll () {
    data.showAll()
  }

  function onShowActive () {
    data.showActive()
  }

  function onShowCompleted () {
    data.showCompleted()
  }

  const filters = createFilters({
    onShowAll,
    onShowActive,
    onShowCompleted
  })
  const leftCounter = createLeftCounter({numberOfItemsLeft : 3})

  data.subscribe('updateItems', onShowActive)
  data.subscribe('updateItems', onShowAll)
  data.subscribe('updateItems', onShowCompleted)

  element.appendChild(leftCounter)
  element.appendChild(filters)

  return element
}