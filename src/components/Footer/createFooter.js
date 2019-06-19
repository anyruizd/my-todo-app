import './footer.scss'
import createLeftCounter from '../LeftCounter/createLeftCounter'
import createFilters from '../Filters/'
import createClearButton from '../ClearButton/'

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
