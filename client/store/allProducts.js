import axios from 'axios'

//Actiontypes
const GET_PRODUCTS = `GET_PRODUCTS`
const ADD_ITEM = `ADD_ITEM`
const DELETE_ITEM = `DELETE_ITEM`
const UPDATE_ITEM = `UPDATE_ITEM`

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

export const deleteItem = item => {
  return {
    type: DELETE_ITEM,
    item
  }
}

export const updateItem = updatedItem => {
  return {
    type: UPDATE_ITEM,
    updatedItem
  }
}

///THUNK CREATORS
export const getProductsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getProducts(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addItemThunk = newItem => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/products', newItem)
      dispatch(addItem(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const deleteItemThunk = itemID => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/products/${itemID}`)
      dispatch(deleteItem(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateItemThunk = (itemID, submittedChanges) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/products/${itemID}`,
        submittedChanges
      )

      dispatch(updateItem(data))
    } catch (error) {
      console.error(error)
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
    case UPDATE_ITEM: {
      const itemsLeft = [...state].filter(
        item => item.id !== action.updatedItem.id
      )
      return [...itemsLeft, action.updatedItem]
    }
    case DELETE_ITEM: {
      const itemsLeft = [...state].filter(item => item.id !== action.item.id)
      return itemsLeft
    }
    default:
      return state
  }
}
