import React from 'react'
import {connect} from 'react-redux'
import {getCartItemsThunk, addToCartThunk} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.loadCartItems(this.props.match.params.userID)
  }

  render() {
    const cartItems = this.props.cartItems || []
    return (
      <div>
        {' '}
        {cartItems.length ? (
          cartItems.map(item => {
            return (
              <div key={item.id}>
                <> {item.name} </>
                <> {item.price}</>
                <> Quantity: {item.cart.quantity} </>
              </div>
            )
          })
        ) : (
          <div> Your Cart is Empty</div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cartItems: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    loadCartItems: userID => dispatch(getCartItemsThunk(userID))
  }
}

export default connect(mapState, mapDispatch)(Cart)
