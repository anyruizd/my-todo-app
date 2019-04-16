import data from '../../data/data'
import './selectAll.scss'

export default function createSelectAll (properties = {}) {
  const element = document.createElement('button')
  element.classList.add('todos__select-all')
  element.innerHTML = '❯'
  
  element.addEventListener('click', () => data.selectAll())

  return element
}