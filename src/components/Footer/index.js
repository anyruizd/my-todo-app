import createLeftCounter from '../LeftCounter/'
import createFilters from '../Filters/'
import createClearButton from '../ClearButton/'
import makeCreateFooter from './makeCreateFooter'

const createFooter = makeCreateFooter({
  createLeftCounter,
  createFilters,
  createClearButton
})

export default createFooter
