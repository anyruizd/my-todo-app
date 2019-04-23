import './footer.scss'
import createLeftCounter from '../LeftCounter/createLeftCounter'
import createFilters from '../Filters/createFilters'
import createClearButton from '../ClearButton/createClearButton'

export default function createFooter (properties = {}) {
  const element = document.createElement('div')
  element.classList.add('footer')

  const filters = createFilters()
  const leftCounter = createLeftCounter()
  const clearButton = createClearButton()

  element.appendChild(leftCounter)
  element.appendChild(filters)
  element.appendChild(clearButton)

  return element
}
