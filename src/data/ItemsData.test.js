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
    }
  ])
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

  expect(received).toHaveLength(1)
  expect(received[0].value).toBe(item1.value)
})

test('Should call publish when item removed', () => {
  const data = new ItemsData()
  const callback = jest.fn()
  const item1 = {
    value: 'Hello1',
    completed: true
  }

  data.subscribe('updateList', callback)
  data.addItem(item1)
  const itemsReceived = data.getList()
  const idToRemove = itemsReceived[0].id

  data.removeItem(idToRemove)

  expect(callback.mock.calls.length).toBe(2)
  expect(callback.mock.calls[1][0]).toEqual([])
})

test('Should allow to update an item value', () => {
  const data = new ItemsData()
  const item1 = {
    value: 'Hello1',
    completed: true
  }
  data.addItem(item1)
  const initialItems = data.getList()
  const idToEdit = initialItems[0].id
  data.updateItem({ id: idToEdit, value: 'Hello2-1' })

  const itemsReceived = data.getList()
  expect(itemsReceived[0].value).toBe('Hello2-1')
})

test('Should allow to update an item state', () => {
  const data = new ItemsData()
  const item1 = {
    value: 'Hello1',
    completed: false
  }
  data.addItem(item1)
  const initialItems = data.getList()
  const idToEdit = initialItems[0].id
  data.updateItem({ id: idToEdit, completed: true })

  const itemsReceived = data.getList()
  expect(itemsReceived[0].completed).toBe(true)
})

test('Should update nothing if id does not exist', () => {
  const data = new ItemsData()
  const item1 = {
    value: 'Hello1',
    completed: false
  }
  const item2 = {
    completed: true,
    value: 'Hello2'
  }
  data.addItem(item1)
  const idToEdit = 'item-12345'
  data.updateItem({ ...item2, id: idToEdit })

  const itemsReceived = data.getList()
  expect(itemsReceived[0]).toEqual({
    ...item1,
    id: expect.any(String)
  })
})

test('Should not create a new item when updating', () => {
  const data = new ItemsData()
  const item1 = {
    value: 'Hello1',
    completed: false
  }
  const item2 = {
    completed: true,
    value: 'Hello2'
  }
  data.addItem(item1)
  const initialItems = data.getList()
  const idToEdit = initialItems[0].id
  data.updateItem({ ...item2, id: idToEdit })

  const itemsReceived = data.getList()
  expect(itemsReceived).toHaveLength(1)
})

test('Should call data.publish when item updated', () => {
  const data = new ItemsData()
  const callback = jest.fn()
  const item1 = {
    value: 'Hello1',
    completed: true
  }

  const item2 = {
    completed: true,
    value: 'Hello2'
  }

  data.subscribe('updateList', callback)
  data.addItem(item1)
  const initialItems = data.getList()
  const idToEdit = initialItems[0].id
  data.updateItem({ ...item2, id: idToEdit })

  expect(callback.mock.calls.length).toBe(2)
  expect(callback).toHaveBeenCalledWith([{
    ...item2,
    id: expect.any(String)
  }])
})

test('Should remove completed items from the list', () => {
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
  data.removeCompleted()
  const itemsReceived = data.getList()

  expect(itemsReceived).toHaveLength(1)
  expect(itemsReceived).toEqual([{
    ...item2,
    id: expect.anything()
  }])
})

test('Should call data.publish when completed item removed', () => {
  const data = new ItemsData()
  const callback = jest.fn()
  const item1 = {
    value: 'Hello1',
    completed: true
  }
  const item2 = {
    value: 'Hello2',
    completed: false
  }

  data.subscribe('updateList', callback)
  data.addItem(item1, item2)
  data.removeCompleted()

  expect(callback.mock.calls.length).toBe(3)
  // The first argument of third call should be the list with completed items removed
  expect(callback.mock.calls[2][0]).toEqual([{
    ...item2,
    id: expect.anything()
  }])
})

test('Should select all items if there is no selected/completed items', () => {
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
    completed: false
  }

  data.addItem(item1, item2, item3)
  data.selectAll()
  const itemsReceived = data.getList()

  itemsReceived.forEach(({ completed }) => {
    expect(completed).toBe(true)
  })
})

test('Should unselect all the items if there is no unselected items', () => {
  const data = new ItemsData()
  const item1 = {
    value: 'Hello1',
    completed: true
  }
  const item2 = {
    value: 'Hello2',
    completed: true
  }
  const item3 = {
    value: 'Hello3',
    completed: true
  }

  data.addItem(item1, item2, item3)
  data.selectAll()
  const itemsReceived = data.getList()

  itemsReceived.forEach(({ completed }) => {
    expect(completed).toBe(false)
  })
})

test('Should select unselected items and selected remain as they are', () => {
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
    completed: false
  }

  data.addItem(item1, item2, item3)
  data.selectAll()
  const itemsReceived = data.getList()

  itemsReceived.forEach(({ completed }) => {
    expect(completed).toBe(true)
  })
})

test('Should call data.publish when items have been selected', () => {
  const data = new ItemsData()
  const callback = jest.fn()
  const item1 = {
    value: 'Hello1',
    completed: true
  }
  const item2 = {
    value: 'Hello2',
    completed: false
  }

  data.subscribe('updateList', callback)
  data.addItem(item1, item2)
  data.selectAll()

  expect(callback.mock.calls.length).toBe(3)
  // The first argument of third call should be the list with all items completed
  expect(callback.mock.calls[2][0]).toEqual([{
    ...item1,
    id: expect.anything()
  },
  {
    ...item2,
    completed: true,
    id: expect.anything()
  }])
})

test.todo('Should update filter to active')
test.todo('Should update filter to completed')
test.todo('Should call data.publish when filter has been updated')
test.todo('Should return all items if filter is empty')
test.todo('Should return uncompleted items if filter is equal to active')
test.todo('Should return completed items if filter is equal to completed')
test.todo('Should do nothing if filter does not exist')
