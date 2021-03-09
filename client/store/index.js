import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleProduct from './singleProduct'
import allProducts from './allProducts'
import cart from './cart'
import guestCart from './guestCart'
import allUsers from './allUsers'
import singleUser from './singleUser'
import media from './media'

const reducer = combineReducers({
  user,
  singleProduct,
  allProducts,
  cart,
  guestCart,
  allUsers,
  singleUser,
  media
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
