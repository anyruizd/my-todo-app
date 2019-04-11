import PubSub from './PubSub'

export default class ItemsData extends PubSub {
  constructor (list = []) {
    super();
    this.list = list;
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

  select(id) {
    this.list.forEach(element => {
      if(element.id === id){
        element.completed = !element.completed
      }
    });
    this.publish('updateItem', this.list);
  }

  update(id, value) {
    this.list.forEach(element => {
      if(element.id === id){
        element.value = value
      }
    })
    this.publish('updateItem', this.list);
  }

  getList() {
    return this.list
  }
}