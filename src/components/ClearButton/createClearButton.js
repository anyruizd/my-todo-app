import data from './../../data/data'

export default function createClearButton () {
  const element = document.createElement('button')
  element.classList.add('todos__clear-completed')
  element.innerHTML = 'Clear Completed'

  element.addEventListener('click', () => data.removeCompleted())
  
  return element
}