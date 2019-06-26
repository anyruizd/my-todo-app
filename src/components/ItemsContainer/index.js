import createItem from '../Item/'
import data from '../../data/data'
import makeCreateItemsContainer from './makeCreateItemsContainer'

const createItemsContainer = makeCreateItemsContainer({
  data,
  createItem
})

export default createItemsContainer
