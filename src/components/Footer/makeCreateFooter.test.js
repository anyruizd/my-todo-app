/* eslint-env jest */
import makeCreateFooter from './makeCreateFooter'

test('Should return a function', () => {
  const createFooter = makeCreateFooter()
  expect(createFooter).toBeInstanceOf(Function)
})

test('Should return a div element with footer class', () => {
  const dummyElement = document.createElement('div')
  const dependencies = {
    createLeftCounter: jest.fn().mockReturnValue(dummyElement),
    createFilters: jest.fn().mockReturnValue(dummyElement),
    createClearButton: jest.fn().mockReturnValue(dummyElement)
  }
  const createFooter = makeCreateFooter(dependencies)
  const footerElement = createFooter()
  expect(footerElement.tagName).toBe('DIV')
  expect(footerElement.getAttribute('class')).toBe('footer')
})

test('Should call createFilters, createLeftCounter and createClearButton', () => {
  const dummyElement = document.createElement('div')
  const dependencies = {
    createLeftCounter: jest.fn().mockReturnValue(dummyElement),
    createFilters: jest.fn().mockReturnValue(dummyElement),
    createClearButton: jest.fn().mockReturnValue(dummyElement)
  }
  const createFooter = makeCreateFooter(dependencies)
  createFooter()

  expect(dependencies.createFilters).toHaveBeenCalled()
  expect(dependencies.createLeftCounter).toHaveBeenCalled()
  expect(dependencies.createClearButton).toHaveBeenCalled()
})
