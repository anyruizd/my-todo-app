import './leftCounter.scss'

export function makeCreateLeftCounter (dependencies = {}) {
  const { data } = dependencies
  return function createLeftCounter (properties = {}) {
    const element = document.createElement('div')
    element.classList.add('left-counter')

    function updateLeftCounter () {
      const listActive = data.getActive()
      const numberOfItemsLeft = listActive.length

      element.innerHTML = `${numberOfItemsLeft} items left`
    }

    updateLeftCounter()
    data.subscribe('updateList', updateLeftCounter)

    return element
  }
}
