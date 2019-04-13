import './title.scss'

export default function createTitle(properties = {}) {
  const { title } = properties;

  const element = document.createElement('h1')
  element.classList.add('todos__title')

  element.innerHTML = `${title}`
  return element;
}
