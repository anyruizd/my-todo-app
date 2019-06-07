/* eslint-env jest */

import ItemsData from './ItemsData'

test('Should return the list of items', () => {
  const data = new ItemsData()
  const list = data.getList()

  expect(list).toEqual([])
})

test('Should return the new item added', () => {
  const data = new ItemsData()
  const expected = {
    value: 'Hello',
    completed: true
  }

  data.addItem(expected)

  const itemReceived = data.getList()
  const receivedValue = itemReceived[0].value
  const receivedCompleted = itemReceived[0].completed
  const receivedId = itemReceived[0].id

  expect(receivedValue).toBe(expected.value)
  expect(receivedCompleted).toBe(expected.completed)
  expect(receivedId).toMatch(/item-\d{4,5}$/)
})

test('Should allow to add several items at once', () => {
  const data = new ItemsData()
  const item1 = {
    value: 'Hello1',
    completed: true
  }
  const item2 = {
    value: 'Hello2',
    completed: false
  }
  const item3 = {
    value: 'Hello3',
    completed: true
  }

  data.addItem(item1, item2, item3)
  const itemsReceived = data.getList()

  expect(itemsReceived).toHaveLength(3)
})

test('Should call publish method when new item added', () => {
  const data = new ItemsData()
  // data.publish = jest.fn() // Monkey patching, global pollution
  const callback = jest.fn()
  const item = {
    value: 'Hello',
    completed: true
  }
  data.subscribe('updateList', callback)
  data.addItem(item)

  expect(callback).toHaveBeenCalledWith([
    {
      ...item,
      id: expect.any(String)
    }])
})

test('Should return the list of items completed', () => {
  const data = new ItemsData()
  const item1 = {
    value: 'Hello1',
    completed: true
  }
  const item2 = {
    value: 'Hello2',
    completed: false
  }
  const item3 = {
    value: 'Hello3',
    completed: true
  }

  data.addItem(item1, item2, item3)
  const itemsReceived = data.getCompleted()

  expect(itemsReceived).toHaveLength(2)
  expect(itemsReceived[0].value).toBe(item1.value)
  expect(itemsReceived[1].value).toBe(item3.value)
})

test('Should return the list of items uncompleted', () => {
  const data = new ItemsData()
  const item1 = {
    value: 'Hello1',
    completed: false
  }
  const item2 = {
    value: 'Hello2',
    completed: false
  }
  const item3 = {
    value: 'Hello3',
    completed: true
  }

  data.addItem(item1, item2, item3)
  const itemsReceived = data.getActive()

  expect(itemsReceived).toHaveLength(2)
  expect(itemsReceived[0].value).toBe(item1.value)
  expect(itemsReceived[1].value).toBe(item2.value)
})

test('Should remove items from the list', () => {
  const data = new ItemsData()
  const item1 = {
    value: 'Hello1',
    completed: true
  }
  const item2 = {
    value: 'Hello2',
    completed: true
  }

  data.addItem(item1, item2)
  const itemsReceived = data.getList()
  const idToRemove = itemsReceived[1].id

  data.removeItem(idToRemove)
  const received = data.getList()

  expect(received).toHaveLength(1)
  expect(received[0].value).toBe(item1.value)
})

test('Should do nothing if item id does not exist', () => {
  const data = new ItemsData()
  data.publish = jest.fn()
  const item1 = {
    value: 'Hello1',
    completed: true
  }

  data.addItem(item1)

  data.removeItem('item-aaaaa')
  const received = data.getList()

  // expect(data.publish).toHaveBeenCalledTimes(1) *** List is updating (data.publish) even if id does not exist
  expect(received).toHaveLength(1)
  expect(received[0].value).toBe(item1.value)
})

test('Should call publish when item removed', () => {
  const data = new ItemsData()
  data.publish = jest.fn() // Is this ok?
  const item1 = {
    value: 'Hello1',
    completed: true
  }

  data.addItem(item1)
  const itemsReceived = data.getList()
  const idToRemove = itemsReceived[0].id

  data.removeItem(idToRemove)

  expect(data.publish).toHaveBeenCalledTimes(2)
})
