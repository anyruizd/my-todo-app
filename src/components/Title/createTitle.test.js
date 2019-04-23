/* eslint-env jest */

import createTitle from './createTitle'

describe('createTitle()', () => {
  test('Should create an h1 element', () => {
    const title = createTitle()
    expect(title.tagName).toBe('H1')
  })

  test('Should has title class', () => {
    const title = createTitle()
    expect(title.getAttribute('class')).toBe('title')
  })

  test('Should has todos title text', () => {
    const title = createTitle()
    expect(title.innerHTML).toBe('todos')
  })
})
