/* eslint-env jest */

import PubSub from './Pubsub'

describe('PubSub()', () => {
  const pubsub = new PubSub()
  const onOpen = jest.fn()
  const onClose = jest.fn()

  describe('subscribe()', () => {
    test('Should subscribe the new events and its callbacks', () => {
      const events = [
        { eventName: 'open', callback: onOpen },
        { eventName: 'close', callback: onClose }
      ]
      events.forEach(({ eventName, callback }) => {
        pubsub.subscribe(eventName, callback)
      })

      const subscribers = pubsub.subscribers
      expect(subscribers).toHaveLength(2)
      expect(subscribers).toEqual(events)
    })
  })

  describe('unsubscribe()', () => {
    test('Should unsubscribe the event and callback passed by', () => {
      pubsub.unsubscribe('close', onClose)
      const subscribers = pubsub.subscribers
      expect(subscribers).toHaveLength(1)
      expect(subscribers).toContainEqual({ eventName: 'open', callback: onOpen })
      expect(subscribers).not.toContainEqual({ eventName: 'close', callback: onClose })
    })
  })

  describe('publish()', () => {
    test('Should not publish event when there are not subscriptions', () => {
      pubsub.publish('close', 'Good bye!')
      expect(onClose).not.toHaveBeenCalled()
    })

    test('Should publish event when published', () => {
      pubsub.publish('open', 'Hello!')
      expect(onOpen).toHaveBeenCalledTimes(1)
      expect(onOpen).toHaveBeenCalledWith('Hello!')
    })
  })
})
