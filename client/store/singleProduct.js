import axios from 'axios'

//Action Types
const GET_ITEM = `GET_ITEM`
const UPDATE_ITEM = `UPDATE_ITEM`

//ACtion CREATORS
export const getItem = item => {
  return {
    type: GET_ITEM,
    item
  }
}

export const updateItem = updatedItem => {
  return {
    type: UPDATE_ITEM,
    updatedItem
  }
}

//Thunk Creators
export const getItemThunk = itemID => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/${itemID}`)
      dispatch(getItem(data))
    } catch (error) {
      console.log(error)
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
      console.log(error)
    }
  }
}

const initState = {}

export default function(state = initState, action) {
  switch (action.type) {
    case GET_ITEM:
      return {...action.item}
    case UPDATE_ITEM:
      return {...action.updatedItem}
    default:
      return state
  }
}
