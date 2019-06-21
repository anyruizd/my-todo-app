import './newItem.scss'

export default function makeCreateNewItem (dependencies) {
  const { data } = dependencies
  return function createNewItem (properties = {}) {
    const element = document.createElement('input')
    element.classList.add('new-item')
    element.autofocus = ''
    element.placeholder = 'What needs to be done?'

    element.addEventListener('keypress', event => {
      const enterKeyCode = 13
      const currentValue = event.keyCode
      const inputValue = event.target.value
      const isEnter = currentValue === enterKeyCode

      if (isEnter && inputValue.trim()) {
        data.addItem({
          value: element.value,
          completed: false
        })
        element.value = ''
      }
    })

    return element
  }
}
