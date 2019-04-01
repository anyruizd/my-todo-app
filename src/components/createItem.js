export default function createItem(list) {
  const node = document.querySelector('.todos__items-container')
  
  const template = list.map(({value, completed}, index) => {
    return `
      <li class="todos__item todos__item--showing">
        <div class ="todos__item-checkbox">
          <input ${ completed ? "checked" : ''} type="checkbox" value="None" id="item-${index}-completed" name="check"/>
          <label for="item-${index}-completed"></label>
        </div>
        <span class="todos__item-text">${value}</span>
        <input class="todos__item-edit" type="text" value="${value}"/>
        <button class="todos__item-remove" data-remove="remove-${index}-item"></button>
      </li>
    `
  }).join('')

  node.innerHTML = template
}

