import axios from 'axios'
import history from '../history'

const defaultUser = {}
/**
 * ACTION TYPES
 *
 *
 */
const GET_USER = 'GET_USER'
const GET_ALL_USERS = 'GET_ALL_USERS'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
//const ADD_CART_ITEM = `ADD_CART_ITEM`

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})

const getAllUsers = users => {
  return {
    type: GET_ALL_USERS,
    users
  }
}

const removeUser = userID => ({type: REMOVE_USER, userID})

const updateUser = updatedUser => ({type: UPDATE_USER, updatedUser})

// const removeCartItem = (itemID) => {
//   return {
//     action: REMOVE_CART_ITEM,
//     itemID,
//   }
// }

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const getAllUsersThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(getAllUsers(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteUserThunk = userID => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`api/users/${userID}`)
      dispatch(removeUser(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateUserThunk = (userID, updatedUser) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/${userID}`, updatedUser)
      dispatch(updateUser(data[1]))
    } catch (err) {
      console.log(err)
    }
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {...state, users: action.users}
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return {...state, upDatedUser: action.user}
    case REMOVE_CART_ITEM:
    default:
      return state
  }
}
