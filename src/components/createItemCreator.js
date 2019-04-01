export default function createItemCreator (properties) {
  const { placeholder, addItem } = properties;

  const element = document.createElement('input');
  element.classList.add('todos__new-item');
  element.autofocus = ''
  element.placeholder = placeholder
  
  element.addEventListener('keypress', event => {
    const enterKeyCode = 13
    const currentValue = event.keyCode
    const inputValue = event.target.value
    const isEnter = currentValue === enterKeyCode
  
    if (isEnter && inputValue) {
      addItem(inputValue)
      element.value = ''
    }
  });

  return element;
}