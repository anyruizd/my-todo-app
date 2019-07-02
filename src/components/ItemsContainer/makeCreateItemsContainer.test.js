/* eslint-env jest */
import makeCreateItemsContainer from './makeCreateItemsContainer'

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

test('Should call createItem', () => {
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

  expect(dependencies.createItem).toHaveBeenCalled()
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

  const expected = dependencies.data.subscribe

  expect(expected).toHaveBeenCalledWith('updateList', expect.anything())
  expect(expected).toHaveBeenCalledWith('updateFilter', expect.anything())
})
