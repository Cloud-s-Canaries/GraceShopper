import {createMemoryHistory, createBrowserHistory} from 'history'

const history =
  // process.env.NODE_ENV === 'test'
  typeof document === 'undefined'
    ? createMemoryHistory()
    : createBrowserHistory()

export default history
