import './title.scss'

export default function createTitle(properties = {}) {
  const element = document.createElement('h1')
  element.classList.add('title')
  element.innerHTML = 'todos'
  
  return element;
}
