/* eslint-env jest */
import createItem from './createItem'

test('Should return an li element', () => {
  const properties = {
    id: 'item-12345',
    value: 'Hola1',
    completed: true,
    onSelect: jest.fn(),
    onRemove: jest.fn(),
    onEdit: jest.fn()
  }
  const element = createItem(properties)
  const expected = element.tagName
  expect(expected).toBe('LI')
})

test('Should render element with provided properties', () => {
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
})
test.todo('Should have item--selected class when completed true')
test.todo('Should call onSelect when checkBocElement clicked')
test.todo('Should call onSelect with id')
test.todo('Should call onRemove when removeElement clicked')
test.todo('Should call onRemove with id')
test.todo('Shoould add item--editing class name when double click')
test.todo('Should call onEdit when itemTextElement keyPressed')
test.todo('Should call onEdit with id')
