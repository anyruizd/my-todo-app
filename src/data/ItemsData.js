import PubSub from './PubSub'

export default class ItemsData extends PubSub {
  constructor (list = []) {
    super();
    this.list = list;
  }

  add(element) {
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