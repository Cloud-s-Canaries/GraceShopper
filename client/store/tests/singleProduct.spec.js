import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../../history'
import {getItemThunk} from '../singleProduct'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('singleProduct thunk creator', () => {
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

  describe('getItemThunk', async () => {
    it('able to get all products from the database', async () => {
      const fakeProduct = {name: 'batman', price: 5002}

      mockAxios.onGet('/api/products/1').replyOnce(200, fakeProduct)
      await store.dispatch(getItemThunk(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ITEM')
      expect(actions[0].item).to.be.deep.equal(fakeProduct)
    })
  })
})
