import data from '../../data/data'
import './selectAll.scss'

export default function selectAll (properties = {}) {
  const element = document.createElement('button')
  element.classList.add('todos__select-all')
  element.innerHTML = '❯'

  function onSelectAll () {
    const list = data.getList()
    const listCompleted = list.filter(({completed}) => completed)
    const processAll = listCompleted.length === 0 || listCompleted.length === list.length

    if (processAll) {
      list.forEach((item) => {
        data.select(item.id)
      });
    }
    else {
      list
      .filter(({completed}) => !completed)
      .forEach((item) => {
        data.select(item.id)
      });
    }
  }
  
  element.addEventListener('click', onSelectAll)

  return element
}