class TodosList {
  constructor (node, list = []) {
    this.node = node
    this.list = list

    this.buildList()
  }

  /**
   * Add a new item to the list
   * @param {String} item
   */
  add(item) {
    this.list.push(item)
    console.log(this.list)
  }

  /**
   * 
   * @param {Array} list 
   */
  buildList () {
    const itemsDom = this.list.map(item => {
      return `<div class="todos__item ${ item.completed ? 'todos__item--selected' : '' }">
                ${item.text}
              </div>`
    }).join('')

    return itemsDom
  }

}

module.exports = { TodosList }