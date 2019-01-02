class Input {
  constructor (node, callback) {
    this.node = node
    this.input = ''
    this.callback = callback

    this.buildInput()
    this.eventsHandler()
  }

  /**
   * Generates the input as a DOM element
   * @return {Object} 
   */
  shell () {
    const domParser = new DOMParser()
    const input = `<input autofocus class="todos__new-item" placeholder="What needs to be done?"/>`
    return (
      domParser.parseFromString(input, 'text/html').body.children[0]
    )
  }

  /**
   * Sets the input in the DOM
   */
  buildInput () {
    this.node.appendChild(this.shell())
    this.input = this.node.querySelector('input')
  }

  handleCallback () {
    this.callback(this.input.value)
    this.input.value = ''
  }

  /**
   * 
   */
  eventsHandler () {
    this.input.addEventListener('keypress', event => {
      const enterKeyCode = 13
      const inputValue = event.keyCode
      inputValue === enterKeyCode ? this.handleCallback() : ''
    })
  }

}

module.exports = { Input }