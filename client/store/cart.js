import axios from 'axios'

//Action Types
const GET_CART = `GET_CART`
const ADD_TO_CART = `ADD_TO_CART`
const DELETE_FROM_CART = `DELETE_FROM_CART`
const CART_ITEM_QUANTITY = `CART_ITEM_QUANTITY`
const RESET_CART = `RESET_CART`

//Action Creators
export const getCart = cartItems => {
  return {
    type: GET_CART,
    cartItems
  }
}

export const addToCart = updatedCart => {
  return {
    type: ADD_TO_CART,
    updatedCart
  }
}

export const deleteFromCart = item => {
  return {
    type: DELETE_FROM_CART,
    item
  }
}

export const cartItemQuantity = updatedCart => {
  return {
    type: CART_ITEM_QUANTITY,
    updatedCart
  }
}

export const resetCart = () => {
  return {
    type: RESET_CART
  }
}

//Thunk Creators
export const getCartItemsThunk = userID => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/carts/${userID}`)
      const items = data.products
      dispatch(getCart(items))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addToCartThunk = (userId, productId, wholeProduct) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/carts`, {
        userId,
        productId,
        quantity: 1
      })
      if (data === 'You already have this item in your cart') {
        console.log('WHATTTTTT', wholeProduct)
        //alert('This Item is already in your cart!')
        wholeProduct.cart.quantity = 1
        wholeProduct.cart.quantity++
        dispatch(addToCartThunk(wholeProduct))
      } else {
        dispatch(addToCart(data))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateQuantityThunk = (userID, itemID, quantity) => {
  return async dispatch => {
    try {
      console.log(`Running API...`)
      const {data} = await axios.put(`/api/carts/${userID}/${itemID}`, {
        quantity
      })
      console.log(`API returned...`, data)
      dispatch(cartItemQuantity(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteFromCartThunk = (userID, itemID) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/carts/${userID}/${itemID}`)
      dispatch(deleteFromCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const resetCartThunk = userID => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/carts/${userID}`)
      dispatch(resetCart())
    } catch (err) {
      console.error(err)
    }
  }
}

const initState = []

export default function(state = initState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cartItems
    case ADD_TO_CART:
      return action.updatedCart
    case CART_ITEM_QUANTITY:
      return action.updatedCart.products
    case RESET_CART:
      return initState
    case DELETE_FROM_CART: {
      const itemsLeft = [...state].filter(
        item => item.id !== action.item.productId
      )
      return itemsLeft
    }
    default:
      return state
  }
}
