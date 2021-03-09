import axios from 'axios'

//Action Types
const GET_ITEM = `GET_ITEM`

//ACtion CREATORS
export const getItem = item => {
  return {
    type: GET_ITEM,
    item
  }
}

//Thunk Creators
export const getItemThunk = itemID => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${itemID}`)
      dispatch(getItem(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initState = {}

export default function(state = initState, action) {
  switch (action.type) {
    case GET_ITEM:
      return action.item
    default:
      return state
  }
}
