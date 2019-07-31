/* eslint-env jest */
import { makeCreateLeftCounter } from './makeCreateLeftCounter'

test('Should return a function', () => {
  const createLeftCounter = makeCreateLeftCounter()
  expect(createLeftCounter).toBeInstanceOf(Function)
})

test('Should create a div element with left-counter class', () => {
  const dependencies = {
    data: {
      getActive: jest.fn().mockReturnValue([]),
      subscribe: jest.fn()
    }
  }
  const createLeftCounter = makeCreateLeftCounter(dependencies)
  const leftCounterElement = createLeftCounter()

  expect(leftCounterElement.tagName).toBe('DIV')
  expect(leftCounterElement.getAttribute('class')).toBe('left-counter')
})

test('Should return the counter with initial state', () => {
  const dependencies = {
    data: {
      getActive: jest.fn().mockReturnValue([]),
      subscribe: jest.fn()
    }
  }
  const createLeftCounter = makeCreateLeftCounter(dependencies)
  const leftCounterElement = createLeftCounter()

  expect(leftCounterElement.innerHTML).toBe('0 items left')
})

test('Should subscribe to updateList', () => {
  const dependencies = {
    data: {
      getActive: jest.fn().mockReturnValue([]),
      subscribe: jest.fn()
    }
  }
  const createLeftCounter = makeCreateLeftCounter(dependencies)
  createLeftCounter()

  expect(dependencies.data.subscribe).toHaveBeenCalledWith('updateList', expect.anything())
})

test('Should update left counter from its initial state', () => {
  const dependencies = {
    data: {
      getActive: jest.fn().mockReturnValue(['an item', 'two items']),
      subscribe: jest.fn()
    }
  }
  const createLeftCounter = makeCreateLeftCounter(dependencies)
  const leftCounterElement = createLeftCounter()

  expect(leftCounterElement.innerHTML).toBe('2 items left')
})
