/* eslint-env jest */
import makeCreateFilters from './makeCreateFilters'

test('Should return a function', () => {
  const createFilters = makeCreateFilters()
  expect(createFilters).toBeInstanceOf(Object)
})

test('Should return a div with filters classname', () => {
  const createFilters = makeCreateFilters()
  const filtersElement = createFilters()

  expect(filtersElement.tagName).toBe('DIV')
  expect(filtersElement.getAttribute('class')).toBe('filters')
})

test('Should return three filter elements', () => {
  const createFilters = makeCreateFilters()
  const filtersElement = createFilters()
  const expected = `
      <button class="filters__show-all">All</button>
      <button class="filters__show-active">Active</button>
      <button class="filters__show-completed">Completed</button>
    `
  expect(filtersElement.innerHTML).toEqual(expected)
})

test('Should call data.updateFilter when showAllElement clicked', () => {
  const data = { updateFilter: jest.fn() }
  const createFilters = makeCreateFilters({ data })
  const filtersElement = createFilters()
  const event = new Event('click')
  const showAllElement = filtersElement.querySelector('.filters__show-all')
  showAllElement.dispatchEvent(event)

  expect(data.updateFilter).toHaveBeenCalledWith('')
})
test('Should call data.updateFilter when showActiveElement clicked', () => {
  const data = { updateFilter: jest.fn() }
  const createFilters = makeCreateFilters({ data })
  const filtersElement = createFilters()
  const event = new Event('click')
  const showActiveElement = filtersElement.querySelector('.filters__show-active')
  showActiveElement.dispatchEvent(event)

  expect(data.updateFilter).toHaveBeenCalledWith('active')
})

test('Should call data.updateFilter when showCompletedElement clicked', () => {
  const data = { updateFilter: jest.fn() }
  const createFilters = makeCreateFilters({ data })
  const filtersElement = createFilters()
  const event = new Event('click')
  const showCompletedElement = filtersElement.querySelector('.filters__show-completed')
  showCompletedElement.dispatchEvent(event)

  expect(data.updateFilter).toHaveBeenCalledWith('completed')
})
