import axios from 'axios'

//Action Types
const GET_GUEST_CART = `GET_GUEST_CART`
const ADD_TO_GUEST_CART = `ADD_TO_GUEST_CART`
const DELETE_FROM_GUEST_CART = `DELETE_FROM_GUEST_CART`
const GUEST_CART_ITEM_QUANTITY = ` GUEST_CART_ITEM_QUANTITY`
const DELETE_GUEST_CART = 'DELETE_GUEST_CART'

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

export const updateGCQuantity = (item, quantity) => {
  return {
    type: GUEST_CART_ITEM_QUANTITY,
    item,
    quantity
  }
}

export const deleteGuestCart = () => {
  return {type: DELETE_GUEST_CART}
}

///"Thunk" Creators

export function toGuestCartThunk(newItem) {
  return dispatch => {
    //Window Storage

    dispatch(toGuestCart(newItem))
  }
}

export function getGuestCartThunk(cartItems) {
  return dispatch => {
    dispatch(getGuestCart(cartItems))
  }
}

export function deleteFromGuestCartThunk(item) {
  return dispatch => {
    dispatch(deleteFromGuestCart(item))
  }
}

export function updateGCQuantThunk(item, quantity) {
  return dispatch => {
    dispatch(updateGCQuantity(item, quantity))
  }
}

export function deleteGuestCartThunk() {
  return dispatch => {
    dispatch(deleteGuestCart())
  }
}

const initState = []

export default function(state = initState, action) {
  switch (action.type) {
    case GET_GUEST_CART:
      return action.cartItems
    case ADD_TO_GUEST_CART:
      ///LOCAL STORAGE.SETITEM HERE

      const itemExists = state.filter(item => item.id === action.newItem.id)

      if (itemExists.length) {
        window.alert('You already have this meme in your cart! (GUEST CART)')
        return state
      } else {
        action.newItem.cart = {quantity: 1}
        localStorage.setItem(
          'Guest_Cart',
          JSON.stringify([...state, action.newItem])
        )
        return [...state, action.newItem]
      }
    case DELETE_FROM_GUEST_CART: {
      const itemsLeft = [...state].filter(item => item.id !== action.item.id)
      localStorage.setItem('Guest_Cart', JSON.stringify(itemsLeft))
      return itemsLeft
    }
    case GUEST_CART_ITEM_QUANTITY: {
      console.log(`GC QUANT REDUCER RUNS`)
      const updatedItems = [...state].filter(item => item.id !== action.item.id)
      const newItem = action.item
      newItem.cart.quantity = Number(action.quantity)
      console.log(`NUUUUITEM`, newItem)
      localStorage.setItem(
        'Guest_Cart',
        JSON.stringify([...updatedItems, newItem])
      )
      //JSON.pparlocalStorage.getItem('Guest_Cart') // Start here ??
      return [...updatedItems, newItem]
    }
    case DELETE_GUEST_CART:
      return initState
    default:
      return state
  }
}
