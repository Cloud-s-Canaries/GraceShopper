import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../../history'
import {getAllUsersThunk} from '../allUsers'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('allUsers thunk creator', () => {
  let store
  let mockAxios

  const initialState = {user: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getAllUsersThunk', async () => {
    it("able to get all products in the user's cart", async () => {
      const fakeUsers = [{email: 'cody@email.com'}, {email: 'murphy@email.com'}]
      mockAxios.onGet('/api/users').replyOnce(200, fakeUsers)
      await store.dispatch(getAllUsersThunk())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ALL_USERS')
      expect(actions[0].users).to.be.deep.equal(fakeUsers)
    })
  })
})
