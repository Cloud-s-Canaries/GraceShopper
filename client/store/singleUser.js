import axios from 'axios'

//Action Types
const GET_ONE_USER = `GET_ONE_USER`
//Action Creators
const getOneUser = user => {
  return {
    type: GET_ONE_USER,
    user
  }
}

//Thunk Creators
export const getOneUserThunk = userID => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userID}`)
      dispatch(getOneUser(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//Reducer
const initState = {}
export default function(state = initState, action) {
  switch (action.type) {
    case GET_ONE_USER:
      return action.singleUser
    default:
      return state
  }
}
