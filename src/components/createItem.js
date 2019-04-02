export default function createItem(properties) {
  const { value, completed } = properties;
  const id = 'item-' + Math.round(Math.random() * 100000)

  const element = document.createElement('li')
  element.className = 'todos__item todos__item--showing'

  const template = `
    <div class ="todos__item-checkbox">
      <input ${completed ? "checked" : ''} type="checkbox" value="None" id="${id}" name="check"/>
      <label for="${id}"></label>
    </div>
    <span class="todos__item-text">${value}</span>
    <input class="todos__item-edit" type="text" value="${value}"/>
    <button class="todos__item-remove"></button>
    `
  element.innerHTML = template

  return element
}

