import createItem from '../Item/'
import data from '../../data/data'
import makeCreateItemsContainer from './createItemsContainer'

const createItemsContainer = makeCreateItemsContainer({
  data,
  createItem
})

export default createItemsContainer
