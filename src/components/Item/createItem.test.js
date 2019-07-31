/* eslint-env jest */
import { createItem } from './createItem'

test('Should return an li element', () => {
  const element = createItem()
  const expected = element.tagName
  expect(expected).toBe('LI')
})

test('Should render element with provided properties', () => {
  const properties = {
    id: 'item-12345',
    value: 'Hola1',
    completed: false
  }
  const expected = `
    <div class="item__checkbox">
      <input type="checkbox" value="None" id="item-12345" name="check">
      <label for="item-12345"></label>
    </div>
    <span class="item__text">Hola1</span>
    <input class="item__edit" type="text" value="Hola1">
    <button class="item__remove"></button>
  `
  const element = createItem(properties)
  expect(element.innerHTML).toBe(expected)
})

test('Should be checked and have item--selected class when completed true', () => {
  const properties = {
    id: 'item-12345',
    value: 'Hola1',
    completed: true
  }
  const expected = `
    <div class="item__checkbox">
      <input checked="" type="checkbox" value="None" id="item-12345" name="check">
      <label for="item-12345"></label>
    </div>
    <span class="item__text">Hola1</span>
    <input class="item__edit" type="text" value="Hola1">
    <button class="item__remove"></button>
  `
  const element = createItem(properties)
  expect(element.innerHTML).toBe(expected)
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
