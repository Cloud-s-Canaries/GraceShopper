import axios from 'axios'

//Action Types
const GET_GUEST_CART = `GET_GUEST_CART`
const ADD_TO_GUEST_CART = `ADD_TO_GUEST_CART`
const DELETE_FROM_GUEST_CART = `DELETE_FROM_GUEST_CART`
const GUEST_CART_ITEM_QUANTITY = `CART_ITEM_QUANTITY`

//Action creators
export const getGuestCart = cartItems => {
  return {
    type: GET_GUEST_CART,
    cartItems
  }
}

export const toGuestCart = newItem => {
  return {
    type: ADD_TO_GUEST_CART,
    newItem
  }
}

export const deleteFromGuestCart = item => {
  return {
    type: DELETE_FROM_GUEST_CART,
    item
  }
}

export const guestCartItemQuantity = updatedCart => {
  return {
    type: GUEST_CART_ITEM_QUANTITY,
    updatedCart
  }
}

///"Thunk" Creators

export function toGuestCartThunk(newItem) {
  return dispatch => {
    console.log(`ITEM (THUNK`, newItem)
    //Window Storage

    dispatch(toGuestCart(newItem))
  }
}

export function getGuestCartThunk(cartItems) {
  return dispatch => {
    console.log(`ITEMS (THUNK)`, cartItems)
    dispatch(getGuestCart(cartItems))
  }
}

const initState = []

export default function(state = initState, action) {
  switch (action.type) {
    case GET_GUEST_CART:
      return action.cartItems
    case ADD_TO_GUEST_CART:
      ///LOCAL STORAGE.SETITEM HERE
      localStorage.setItem(
        'Guest_Cart',
        JSON.stringify([...state, action.newItem])
      )

      return [...state, action.newItem]
    case DELETE_FROM_GUEST_CART:
      const itemsLeft = [...state].filter(
        item => item.id !== action.item.productId
      )
      return itemsLeft
    case GUEST_CART_ITEM_QUANTITY:
      const updatedItem = [...state].filter(
        item => item.id !== action.updatedCart.id
      )
      return [...updatedItem, action.updatedCart]
    default:
      return state
  }
}
