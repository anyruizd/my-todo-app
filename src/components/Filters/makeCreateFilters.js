import './filters.scss'

export default function makeCreateFilters (dependencies) {
  const { data } = dependencies

  return function createFilters (properties = {}) {
    const element = document.createElement('div')
    element.classList.add('filters')

    element.innerHTML = `
      <button class="filters__show-all">All</button>
      <button class="filters__show-active">Active</button>
      <button class="filters__show-completed">Completed</button>
    `
    const showAllElement = element.querySelector('.filters__show-all')
    const showActiveElement = element.querySelector('.filters__show-active')
    const showCompletedElement = element.querySelector('.filters__show-completed')

    showAllElement.addEventListener('click', () => {
      data.updateFilter('')
    })

    showActiveElement.addEventListener('click', () => {
      data.updateFilter('active')
    })

    showCompletedElement.addEventListener('click', () => {
      data.updateFilter('completed')
    })

    return element
  }
}
