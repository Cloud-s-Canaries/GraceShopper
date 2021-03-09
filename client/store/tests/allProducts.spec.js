import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../../history'
import {getProductsThunk, addItemThunk} from '../allProducts'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('allProducts thunk creator', () => {
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

  describe('getProductsThunk', async () => {
    it('able to get all products from the database', async () => {
      const fakeProducts = [
        {name: 'batman', price: 5002},
        {name: 'superman', price: 400},
        {name: 'Flash', price: 3198571398},
        {name: 'wonder woman', price: 3},
        {name: 'Aquaman', price: 39}
      ]
      mockAxios.onGet('/api/products').replyOnce(200, fakeProducts)
      await store.dispatch(getProductsThunk())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCTS')
      expect(actions[0].products).to.be.deep.equal(fakeProducts)
    })
  })

  // describe('addItemThunk', async () => {
  //   it('able to get all products from the database', async () => {
  //     const fakeProducts = [
  //       {name: 'batman', price: 5002},
  //       {name: 'superman', price: 400},
  //       {name: 'Flash', price: 3198571398},
  //       {name: 'wonder woman', price: 3},
  //       {name: 'Aquaman', price: 39},
  //     ]
  //     mockAxios.onPost('/api/products').replyOnce(200, fakeProducts)
  //     await store.dispatch(addItemThunk())
  //     const actions = store.getActions()
  //     expect(actions[0].type).to.be.equal('GET_PRODUCTS')
  //     expect(actions[0].products).to.be.deep.equal(fakeProducts)
  //   })
  // })
})
