const { renderApp } = require('./App.js')

import './main.scss'

const node = document.querySelector('#app')
const app = renderApp(node);