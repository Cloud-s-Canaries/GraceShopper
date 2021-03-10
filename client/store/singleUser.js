import axios from 'axios'

//Action Types
const GET_ONE_USER = `GET_ONE_USER`
const UPDATE_USER = 'UPDATE_USER'
//Action Creators
const getOneUser = user => {
  return {
    type: GET_ONE_USER,
    user
  }
}
const updateUser = updatedUser => ({type: UPDATE_USER, updatedUser})

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

export const updateUserThunk = (userID, updatedUser) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/${userID}`, updatedUser)
      console.log('data-------------', data)
      dispatch(updateUser(data))
    } catch (err) {
      console.error(err)
    }
  }
}
//Reducer
const initState = {}
export default function(state = initState, action) {
  switch (action.type) {
    case GET_ONE_USER:
      return action.user
    case UPDATE_USER:
      return action.updatedUser
    default:
      return state
  }
}
