import './main.scss'

const node = document.querySelector('#app')

const renderHeader = () => {
  return '<h1 class="todos__title">todos</h1>'
}

const renderInput = () => {
  return `<div class="todos">
            <input class="todos__new-item" placeholder="What needs to be done?">
          </div>`
}

const renderApp = () => {
  const header = renderHeader();
  const input = renderInput();
  
  return `<div class="main-container">
                ${ header }${ input }
          </div>`
}

node.innerHTML = renderApp();