import data from './../../data/data'
import './filters.scss'

export default function createFilters (properties = {}) {

  const element = document.createElement('div')
  element.classList.add('todos__filters')

  element.innerHTML = `
    <button id="show-all">All</button>
    <button id="show-active">Active</button>
    <button id="show-completed">Completed</button>
  `
  const showAllElement = element.querySelector('#show-all')
  const showActiveElement = element.querySelector('#show-active')
  const showCompletedElement = element.querySelector('#show-completed')

  showAllElement.addEventListener('click',() => {
    data.updateFilter('')
  })
  showActiveElement.addEventListener('click',() => {
    data.updateFilter('active')
  })
  showCompletedElement.addEventListener('click',() => {
    data.updateFilter('completed')
  })

  return element
}