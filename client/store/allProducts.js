import axios from 'axios'

//Actiontypes
const GET_PRODUCTS = `GET_PRODUCTS`

//ACTION CREATORS
export const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

///THUNK CREATORS
export const getProductsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getProducts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initState = []

export default function(state = initState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return [...state, ...action.products]
    default:
      return state
  }
}
