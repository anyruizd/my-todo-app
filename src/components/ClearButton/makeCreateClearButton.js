export function makeCreateClearButton (dependencies = {}) {
  const { data } = dependencies
  return function createClearButton () {
    const element = document.createElement('button')
    element.classList.add('clear-completed')
    element.innerHTML = 'Clear Completed'
    element.addEventListener('click', () => data.removeCompleted())

    return element
  }
}
