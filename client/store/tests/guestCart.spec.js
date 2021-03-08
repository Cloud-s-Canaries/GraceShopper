// import {expect} from 'chai'
// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import configureMockStore from 'redux-mock-store'
// import thunkMiddleware from 'redux-thunk'
// import history from '../../history'
// import {getGuestCartThunk} from '../guestCart'

// const middlewares = [thunkMiddleware]
// const mockStore = configureMockStore(middlewares)

// describe('Guest cart thunk creator', () => {
//   let store
//   let mockAxios

//   const initialState = {user: {}}

//   beforeEach(() => {
//     mockAxios = new MockAdapter(axios)
//     store = mockStore(initialState)
//   })

//   afterEach(() => {
//     mockAxios.restore()
//     store.clearActions()
//   })

//   describe('getGuestCartThunk', async () => {
//     it("able to get all products in the guest's cart", async () => {
//       const fakeCart = {
//         email: 'cody@email.com',
//         products: [{name: 'batman', price: 400}],
//       }

//       const ans = [{name: 'batman', price: 400}]

//       mockAxios.onGet('/api/carts/1').replyOnce(200, fakeCart)
//       await store.dispatch(getCartItemsThunk(1))
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('GET_CART')
//       expect(actions[0].cartItems).to.be.deep.equal(ans)
//     })
//   })
// })
