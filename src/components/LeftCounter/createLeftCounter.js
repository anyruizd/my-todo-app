import './leftCounter.scss'

export default function createLeftCounter (properties = {}) {
  const { numberOfItemsLeft } = properties
  const element = document.createElement('div')
  element.classList.add('todos__items-left-counter')
  element.innerHTML = `${numberOfItemsLeft} items left`

  return element
}