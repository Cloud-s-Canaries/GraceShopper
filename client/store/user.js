import axios from 'axios'
import history from '../history'

const defaultUser = {}
/**
 * ACTION TYPES
 *  node-sass client/style.scss public/style.css
 *
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const DELETE_GUEST_CART = 'DELETE_GUEST_CART'
/**
 * ACTION CREATORS
 */

const removeUser = () => ({type: REMOVE_USER})

const getUser = user => ({type: GET_USER, user})

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

export const auth = (email, password, method) => async dispatch => {
  let res

  const savedCart = JSON.parse(localStorage.getItem('Guest_Cart'))

  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    if (savedCart) {
      // Call axios to put items from local storage into db here

      const userId = res.data.id
      const array = savedCart.map(prod => {
        return {userId, productId: prod.id, quantity: prod.cart.quantity || 1}
      })

      await axios.post('/api/carts/guestlogin', {
        array
      })

      localStorage.removeItem('Guest_Cart')
      dispatch({type: DELETE_GUEST_CART})

      history.push(`/cart`)
    } else {
      history.push('/home')
    }
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
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
