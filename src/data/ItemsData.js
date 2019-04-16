import PubSub from './PubSub'

export default class ItemsData extends PubSub {
  constructor (list = []) {
    super();
    this.list = list;
    this.filter = ''
  }

  add(elementData) {
    // TODO: add support to add multiple items at once
    const element = {
      ...elementData,
      id: 'item-' + Math.round(Math.random() * 100000)
    }
    this.list = [...this.list, element];
    this.publish('updateItem', this.list);
  }

  remove(id) {
    this.list = this.list.filter(element => element.id !== id);
    this.publish('updateItem', this.list);
  }

  selectItem(id) {
    this.list.forEach(element => {
      if(element.id === id){
        element.completed = !element.completed
      }
    });
    this.publish('updateItem', this.list);
  }

  selectAll () {
    const listCompleted = this.list.filter(({ completed }) => completed)
    const processAll = 
       listCompleted.length === 0 ||
      listCompleted.length === this.list.length

    if (processAll) {
      this.list.forEach(({id}) => this.selectItem(id))
    }
    else {
      this.list
      .filter(({completed}) => !completed)
      .forEach(({id}) => this.selectItem(id))
    }
  }

  update(id, value) {
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
    return this.list.filter(element => {
      if (this.filter === 'active') {
        return !element.completed
      } 
      else if (this.filter === 'completed') {
        return element.completed
      }
    })
  }

  getList() {
    return this.list
  }
}