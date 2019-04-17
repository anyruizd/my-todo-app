import data from './../../data/data'
import './leftCounter.scss'

export default function createLeftCounter (properties = {}) {
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