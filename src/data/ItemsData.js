import PubSub from './PubSub'

export default class ItemsData extends PubSub {
  constructor (list = []) {
    super()
    this.list = list
    this.filter = ''
  }

  addItem (...elementData) {
    elementData.forEach(item => {
      const isValid =
      item &&
      typeof item === 'object' &&
      Object.keys(item).length !== 0

      if (isValid) {
        const element = {
          ...item,
          id: 'item-' + Math.round(Math.random() * 100000)
        }
        this.list = [...this.list, element]
        this.publish('updateList', this.list)
      }
    })
  }

  updateItem (data) {
    this.list.find((element, index, list) => {
      if (element.id === data.id) {
        list[index] = { ...element, ...data }
      }
    })

    this.publish('updateList', this.list)
  }

  removeItem (id) {
    this.list = this.list.filter(element => element.id !== id)
    this.publish('updateList', this.list)
  }

  removeCompleted () {
    this.list = this.list.filter(element => !element.completed)
    this.publish('updateList', this.list)
  }

  selectAll () {
    const listCompleted = this.getCompleted()
    const processAll =
    listCompleted.length === 0 ||
    listCompleted.length === this.list.length

    if (processAll) {
      this.list.forEach(item => {
        item.completed = !item.completed
      })
    }
    else {
      const listActive = this.getActive()
      listActive
        .forEach((item) => (item.completed = !item.completed))
    }

    this.publish('updateList', this.list)
  }

  updateFilter (filter) {
    this.filter = filter
    this.publish('updateFilter', this.list)
  }

  getFilteredItems () {
    if (!this.filter) {
      return this.list
    }
    else if (this.filter === 'active') {
      return this.getActive()
    }
    else {
      return this.getCompleted()
    }
  }

  getCompleted () {
    return this.list.filter(({ completed }) => completed)
  }

  getActive () {
    return this.list.filter(({ completed }) => !completed)
  }

  getList () {
    return this.list
  }
}

/**
 * Items data supports:

1. Add new items to the list
  -expected input and output
  -call the publish when add new item
  -Structure of the input
  -id generation
  -if no input
  -if input is not an object
  -if is the same input
2. Remove items
3. Edit items
4. get list of items
5.

 */
