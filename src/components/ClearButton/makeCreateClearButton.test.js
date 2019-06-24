/* eslint-env jest */
import makeCreateClearButton from './makeCreateClearButton'

test('Should return a button element', () => {
  const createClearButton = makeCreateClearButton()
  const buttonElement = createClearButton()

  expect(buttonElement.tagName).toBe('BUTTON')
})

test('Should have a clear completed classname and text', () => {
  const createClearButton = makeCreateClearButton()
  const buttonElement = createClearButton()

  expect(buttonElement.getAttribute('class')).toBe('clear-completed')
  expect(buttonElement.innerHTML).toBe('Clear Completed')
})

test('Should call data.removeCompleted() when clicked', () => {
  const data = { removeCompleted: jest.fn() }
  const createClearButton = makeCreateClearButton({ data })
  const buttonElement = createClearButton()
  const event = new Event('click')
  buttonElement.dispatchEvent(event)

  expect(data.removeCompleted).toHaveBeenCalled()
})
