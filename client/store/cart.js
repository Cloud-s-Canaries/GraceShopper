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

export const deleteFromCart = itemID => {
  return {
    type: DELETE_FROM_CART,
    itemID
  }
}

export const cartItemQuantity = newQuantity => {
  return {
    type: CART_ITEM_QUANTITY,
    newQuantity
  }
}

//Thunk Creators
export const getCartItemsThunk = userID => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/carts/${userID}`)
      //Console.log Data
      dispatch(getCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addToCartThunk = newItem => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/carts`, newItem)
      dispatch(addToCart(data))
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
      return [...action.newItem, ...state]
    case DELETE_FROM_CART: {
      const itemsLeft = [...state].filter(item => item.id !== action.itemID)
      return itemsLeft
    }
    default:
      return state
  }
}
