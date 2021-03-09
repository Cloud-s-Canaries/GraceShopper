// ACTION TYPES
const CHECKOUT = 'CHECKOUT'

// ACTION CREATORS
const checkout = itemsArr => {
  return {
    type: CHECKOUT,
    items: itemsArr
  }
}

// THUNK
export const checkoutThunk = items => {
  return async dispatch => {
    dispatch(checkout(items))
  }
}

// Initial state
const initialState = []

// Reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case CHECKOUT:
      return action.items
    default:
      return state
  }
}
