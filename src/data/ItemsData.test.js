/* eslint-env jest */

import ItemsData from './ItemsData'

test('Should return the list', () => {
  const data = new ItemsData()
  const list = data.getList()

  expect(list).toEqual([])
})

test('Should return the items list with new elements added', () => {
  const data = new ItemsData()
  const newItem = {
    value: 'Hello',
    completed: true
  }
  data.addItem(newItem)
  data.addItem(newItem)

  const received = data.getList()

  expect(received).toHaveLength(2)
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
  expect(receivedId).toMatch(/item-\d{5}$/)
})

describe('Invalid items to add', () => {
  const invalidItems = [
    { name: 'number', value: 2 },
    { name: 'string', value: 'holi' },
    { name: 'empty object', value: {} },
    { name: 'function', value: jest.fn() },
    { name: 'array', value: [] }
  ]

  invalidItems.forEach(item => {
    test(`Should do nothing if there's a ${item.name} to add`, () => {
      const data = new ItemsData()
      data.addItem(item.value)
      const itemReceived = data.getList()
      expect(itemReceived).toEqual([])
    })
  })
})

test('Should call publish method when new item added', () => {

})
