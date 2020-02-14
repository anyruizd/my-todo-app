/* eslint-env jest */
import { createItem } from './createItem'

test('Should return an li element', () => {
  const element = createItem()
  expect(element.tagName).toBe('LI')
})

test('Should render element with provided id, value and completed state', () => {
  const properties = {
    id: 'item-12345',
    value: 'Hola1',
    completed: false
  }
  const element = createItem(properties)
  const elementId = element.querySelector('input[type="checkbox"]').id
  const elementValue = element.querySelector('span').innerHTML
  const elementChecked = element.querySelector('input[type="checkbox"]').checked

  expect(elementId).toBe(properties.id)
  expect(elementValue).toBe(properties.value)
  expect(elementChecked).toBe(properties.completed)
})

test('Should be checked and have item--selected class when completed true', () => {
  const properties = {
    id: 'item-12345',
    value: 'Hola1',
    completed: true
  }
  const element = createItem(properties)
  const isChecked = element.querySelector('input[type="checkbox"]').checked

  expect(isChecked).toBe(true)
  expect(element.getAttribute('class')).toBe('item item--selected')
})

test('Should call onSelect with id when checkbox element clicked', () => {
  const properties = {
    id: 'item-12345',
    value: 'Hola1',
    completed: true,
    onSelect: jest.fn()
  }
  const element = createItem(properties)
  const checkBoxElement = element.querySelector('input[type="checkbox"]')
  const event = new Event('click')
  checkBoxElement.dispatchEvent(event)
  expect(properties.onSelect).toHaveBeenCalledWith(properties.id, !properties.completed)
})

test('Should call onRemove with id when removeElement clicked', () => {
  const properties = {
    id: 'item-12345',
    value: 'Hola1',
    completed: true,
    onRemove: jest.fn()
  }
  const element = createItem(properties)
  const removeElement = element.querySelector('.item__remove')
  const event = new Event('click')
  removeElement.dispatchEvent(event)
  expect(properties.onRemove).toHaveBeenCalledWith(properties.id)
})

test('Should call onEdit when itemEditElement keyPressed', () => {
  const properties = {
    id: 'item-12345',
    value: 'Hola1',
    completed: true,
    onEdit: jest.fn()
  }
  const element = createItem(properties)
  const itemEditElement = element.querySelector('.item__edit')
  const event = new KeyboardEvent('keypress', { 'keyCode': 13 })
  itemEditElement.dispatchEvent(event)
  expect(properties.onEdit).toHaveBeenCalled()
})
