import axios from 'axios'

//Action Types
const GET_CART = `GET_CART`
const ADD_TO_CART = `ADD_TO_CART`
const DELETE_FROM_CART = `DELETE_FROM_CART`
const CART_ITEM_QUANTITY = `CART_ITEM_QUANTITY`

//Action Creators
export const getCart = cartItems => {
  return {
    type: GET_CART,
    cartItems
  }
}

export const addToCart = newItem => {
  return {
    type: ADD_TO_CART,
    newItem
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

export const addToCartThunk = (userId, productId, quantity) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/carts`, {
        userId,
        productId,
        quantity
      })

      if (data === 'You already have this item in your cart') {
        console.log('HERE', data)
        alert('This Item is already in your cart!')
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
      console.log(`DATAAAAA`, data)
      dispatch(deleteFromCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initState = []

export default function(state = initState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cartItems
    case ADD_TO_CART:
      return [...state, action.newItem]
    case CART_ITEM_QUANTITY:
      return action.updatedCart.products

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
