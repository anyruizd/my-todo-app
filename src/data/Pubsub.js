export class PubSub {
  constructor () {
    this.subscribers = []
  }

  subscribe (eventName, callback) {
    this.subscribers.push({
      eventName,
      callback
    })
  }

  unsubscribe (eventName, callback) {
    this.subscribers = this.subscribers.filter(subscriber => {
      return !(subscriber.eventName === eventName &&
        subscriber.callback === callback)
    })
  }

  publish (eventName, data) {
    this.subscribers
      .filter(subscriber => subscriber.eventName === eventName)
      .forEach(subscriber => subscriber.callback(data))
  }
}
