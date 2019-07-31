import './footer.scss'

export function makeCreateFooter (dependencies = {}) {
  const {
    createLeftCounter,
    createFilters,
    createClearButton
  } = dependencies

  return function createFooter (properties = {}) {
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
}
