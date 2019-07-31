/* eslint-env jest */
import { makeCreateItemsContainer } from './makeCreateItemsContainer'

test('Should return a function', () => {
  const createItemsContainer = makeCreateItemsContainer()
  expect(createItemsContainer).toBeInstanceOf(Function)
})

test('Should return an unordered list with items-container classname', () => {
  const dummyElement = document.createElement('div')
  const dependencies = {
    data: {
      subscribe: jest.fn(),
      getFilteredItems: jest.fn().mockReturnValue([])
    },
    createItem: jest.fn().mockReturnValue(dummyElement)
  }
  const createItemsContainer = makeCreateItemsContainer(dependencies)
  const itemsContainer = createItemsContainer()

  expect(itemsContainer.tagName).toBe('UL')
  expect(itemsContainer.getAttribute('class')).toBe('items-container')
})

test('Should create a new item with the given data', () => {
  const dummyElement = document.createElement('div')
  const item = {
    id: '12345',
    value: 'holi',
    completed: false
  }
  const dependencies = {
    data: {
      subscribe: jest.fn(),
      getFilteredItems: jest.fn().mockReturnValue([item])
    },
    createItem: jest.fn().mockReturnValue(dummyElement)
  }
  const createItemsContainer = makeCreateItemsContainer(dependencies)
  createItemsContainer()

  expect(dependencies.createItem).toHaveBeenCalledWith(
    { ...item,
      'onEdit': expect.anything(),
      'onRemove': expect.anything(),
      'onSelect': expect.anything()
    })
})

test('Should subscribe updateList and updateFilter', () => {
  const dummyElement = document.createElement('div')
  const dependencies = {
    data: {
      subscribe: jest.fn(),
      getFilteredItems: jest.fn().mockReturnValue(['this is a dummy list'])
    },
    createItem: jest.fn().mockReturnValue(dummyElement)
  }
  const createItemsContainer = makeCreateItemsContainer(dependencies)
  createItemsContainer()

  const subscribeCall = dependencies.data.subscribe

  expect(subscribeCall).toHaveBeenCalledWith('updateList', expect.anything())
  expect(subscribeCall).toHaveBeenCalledWith('updateFilter', expect.anything())
})
