import React from 'react'
import {connect} from 'react-redux'
import {getCartItemsThunk} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.loadCartItems()
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
                <> Quantity: </>
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
    loadCartItems: () => dispatch(getCartItemsThunk())
  }
}

export default connect(mapState, mapDispatch)(Cart)
