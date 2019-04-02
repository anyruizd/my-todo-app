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
    this.publish('addItem', this.list);
  }

  remove(id) {
    this.list = this.list.filter(element => element.id !== id);
    this.publish('removeItem', this.list);
  }

  getList() {
    return this.list
  }
}