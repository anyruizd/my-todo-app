/* eslint-env jest */

import { PubSub } from './Pubsub'

describe('PubSub()', () => {
  describe('subscribe()', () => {
    test('Should subscribe the new events and its callbacks', () => {
      const pubsub = new PubSub()
      const onOpen = jest.fn()
      const onClose = jest.fn()
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
    test('Should unsubscribe the event and callback passed', () => {
      const pubsub = new PubSub()
      const onClose = jest.fn()
      pubsub.subscribe('close', onClose)
      pubsub.unsubscribe('close', onClose)
      const subscribers = pubsub.subscribers
      expect(subscribers).toHaveLength(0)
    })
  })

  describe('publish()', () => {
    test('Should not publish event when there are not subscriptions', () => {
      const pubsub = new PubSub()
      const onClose = jest.fn()
      pubsub.publish('close', 'Good bye!')
      expect(onClose).not.toHaveBeenCalled()
    })

    test('Should call callback with arguments passed when published', () => {
      const pubsub = new PubSub()
      const onOpen = jest.fn()
      pubsub.subscribe('open', onOpen)
      pubsub.publish('open', 'Hello!')
      expect(onOpen).toHaveBeenCalledTimes(1)
      expect(onOpen).toHaveBeenCalledWith('Hello!')
    })

    test('Should not call other callbacks different from the one related to event', () => {
      const pubsub = new PubSub()
      const onOpen = jest.fn()
      const onClose = jest.fn()
      const events = [
        { eventName: 'open', callback: onOpen },
        { eventName: 'close', callback: onClose }
      ]
      events.forEach(({ eventName, callback }) => {
        pubsub.subscribe(eventName, callback)
      })
      pubsub.publish('open', 'Hello!')
      expect(onClose).not.toHaveBeenCalled()
    })
  })
})
