import data from './../../data/data'
import './itemCreator.scss'

export default function createItemCreator (properties = {}) {

  const element = document.createElement('input');
  element.classList.add('todos__new-item');
  element.autofocus = ''
  element.placeholder = 'What needs to be done?'
  
  element.addEventListener('keypress', event => {
    const enterKeyCode = 13
    const currentValue = event.keyCode
    const inputValue = event.target.value
    const isEnter = currentValue === enterKeyCode
  
    if (isEnter && inputValue) {
      data.addItem({
        value: element.value,
        completed: false
      })
      element.value = ''
    }
  });

  return element;
}