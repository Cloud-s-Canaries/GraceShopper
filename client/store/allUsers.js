import axios from 'axios'

// Action types
const GET_ALL_USERS = 'GET_ALL_USERS'
const DELETE_USER = 'DELETE_USER'

// Action creators
const getAllUsers = users => {
  return {
    type: GET_ALL_USERS,
    users
  }
}

const removeUser = user => ({type: DELETE_USER, user})

// Thunks
export const getAllUsersThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(getAllUsers(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const deleteUserThunk = userID => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/users/${userID}`)
      dispatch(removeUser(data))
    } catch (err) {
      console.error(err)
    }
  }
}

// Initial state
const initialState = []

// Reducers
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    case DELETE_USER: {
      const remainingUsers = state.filter(user => user.id !== action.user.id)
      return remainingUsers
    }
    default:
      return state
  }
}
