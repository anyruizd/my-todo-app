import PubSub from './PubSub'

export default class ItemsData extends PubSub {
  constructor (list = []) {
    super();
    this.list = list;
    this.filter = ''
  }

  addItem(elementData) {
    const element = {
      ...elementData,
      id: 'item-' + Math.round(Math.random() * 100000)
    }
    this.list = [...this.list, element];
    this.publish('updateList', this.list);
  }

  updateItem(props) {
    this.list.find((element, index, list) => {
      if (element.id === props.id) {
        list[index] = {...element, ...props }
      }
    })

    this.publish('updateList', this.list);
  }

  removeItem(id) {
    this.list = this.list.filter(element => element.id !== id);
    this.publish('updateList', this.list);
  }

  removeCompleted() {
    this.list = this.list.filter(element => !element.completed);
    this.publish('updateList', this.list);
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
      .forEach((item) => item.completed = !item.completed)
    }

    this.publish('updateList', this.list);
  }

  updateFilter (filter) {
    this.filter = filter
    this.publish('updateFilter', this.list);
  }

  getFilteredItems () {
    if (!this.filter) {
      return this.list
    }
    else if (this.filter === 'active') {
      return this.getActive()
    } else {
      return this.getCompleted()
    }
  }

  getCompleted () {
    return this.list.filter(({ completed }) => completed)
  }

  getActive () {
    return this.list.filter(({completed}) => !completed)
  }

  getList() {
    return this.list
  }
}