import data from './../../data/data'

export default function createClearButton () {
  const element = document.createElement('button')
  element.classList.add('todos__clear-completed')
  element.innerHTML = 'Clear Completed'

  function clearItems () {
    const list = data.getList()
    list
    .filter(({completed}) => completed)
    .forEach(element => {
      data.remove(element.id)
    });
  }

  element.addEventListener('click', clearItems)
  // data.subscribe('updateItem', clearItems)
  return element
}