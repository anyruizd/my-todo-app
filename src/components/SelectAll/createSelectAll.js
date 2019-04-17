import data from '../../data/data'
import './selectAll.scss'

export default function createSelectAll (properties = {}) {
  const element = document.createElement('button')
  element.classList.add('select-all')
  element.innerHTML = '❯'
  element.addEventListener('click', () => {
    element.classList.toggle('select-all--clicked')
    data.selectAll()
  })

  return element
}