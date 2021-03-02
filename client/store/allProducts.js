import axios from 'axios'

//Actiontypes
const GET_PRODUCTS = `GET_PRODUCTS`
const ADD_ITEM = `ADD_ITEM`
const DELETE_ITEM = `DELETE_ITEM`

//ACTION CREATORS
export const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

export const addItem = newItem => {
  return {
    type: ADD_ITEM,
    newItem
  }
}

export const deleteItem = itemID => {
  return {
    type: DELETE_ITEM,
    itemID
  }
}

///THUNK CREATORS
export const getProductsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
    } catch (error) {
      console.log(error)
    }
  }
}

export const addItemThunk = newItem => {
  return async dispatch => {
    const {data} = await axios.post('api/products')
    dispatch(addItem(data))
  }
}

export const deleteItemThunk = itemID => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`api/products/${itemID}`)
      dispatch(deleteItem(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initState = []

export default function(state = initState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case ADD_ITEM:
      return [action.newItem, ...state]
    case DELETE_ITEM:
      const itemsLeft = [...state].filter(item => item.id !== action.itemID)
      return itemsLeft
    default:
      return state
  }
}
