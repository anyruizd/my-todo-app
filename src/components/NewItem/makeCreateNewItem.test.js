/* eslint-env jest */

import { makeCreateNewItem } from './makeCreateNewItem'

test('Should return a function', () => {
  const createNewItem = makeCreateNewItem()
  expect(createNewItem).toBeInstanceOf(Function)
})

test('Should create an input element with its classname and placeholder', () => {
  const createNewItem = makeCreateNewItem()
  const newItemElement = createNewItem()

  expect(newItemElement.tagName).toBe('INPUT')
  expect(newItemElement.getAttribute('class')).toBe('new-item')
  expect(newItemElement.getAttribute('placeholder')).toBe('What needs to be done?')
})

test('Should call data.addItem when enter', () => {
  const dependencies = { data: { addItem: jest.fn() } }
  const createNewItem = makeCreateNewItem(dependencies)
  const newItemElement = createNewItem()
  newItemElement.value = 'value'
  const event = new KeyboardEvent('keypress', { 'keyCode': 13 })
  newItemElement.dispatchEvent(event)

  expect(dependencies.data.addItem).toHaveBeenCalled()
})
