import PubSub from './PubSub'

export default class ItemsData extends PubSub {
  constructor (list = []) {
    super();
    this.list = list;
    this.filter = ''
  }

  addItem(elementData) {
    // TODO: add support to add multiple items at once
    const element = {
      ...elementData,
      id: 'item-' + Math.round(Math.random() * 100000)
    }
    this.list = [...this.list, element];
    this.publish('updateItem', this.list);
  }

  removeItem(id) {
    this.list = this.list.filter(element => element.id !== id);
    this.publish('updateItem', this.list);
  }

  removeCompleted() {
    const listCompleted = this.getCompleted()
    listCompleted
    .forEach(element => {
      this.removeItem(element.id)
    });
  }

  selectItem(idReceived) {
    this.list.forEach(element => {
      if(element.id === idReceived){
        element.completed = !element.completed
      }
    });
    this.publish('updateItem', this.list);
  }

  selectAll () {
    const listCompleted = this.getCompleted()
    const processAll = 
    listCompleted.length === 0 || 
    listCompleted.length === this.list.length

    if (processAll) {
      this.list.forEach(({id}) => this.selectItem(id))
    }
    else {
      const listActive = this.getActive()
      listActive
      .forEach(({id}) => this.selectItem(id))
    }
  }

  updateItem(id, value) {
    this.list.forEach(element => {
      if(element.id === id){
        element.value = value
      }
    })
    this.publish('updateItem', this.list);
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