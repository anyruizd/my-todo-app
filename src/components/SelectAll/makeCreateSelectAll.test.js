/* eslint-env jest */
import { makeCreateSelectAll } from './makeCreateSelectAll'

test('Should return a function', () => {
  const createSelectAll = makeCreateSelectAll()
  expect(createSelectAll).toBeInstanceOf(Function)
})

test('Should return a button with select-all class name', () => {
  const createSelectAll = makeCreateSelectAll()
  const selectAllElement = createSelectAll()

  expect(selectAllElement.tagName).toBe('BUTTON')
  expect(selectAllElement.getAttribute('class')).toBe('select-all')
})

test('Should call data.selectAll when clicked', () => {
  const data = { selectAll: jest.fn() }
  const createSelectAll = makeCreateSelectAll({ data })
  const selectAllElement = createSelectAll()

  const event = new Event('click')
  selectAllElement.dispatchEvent(event)

  expect(data.selectAll).toHaveBeenCalled()
})
