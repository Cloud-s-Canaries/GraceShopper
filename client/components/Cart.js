import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  getCartItemsThunk,
  updateQuantityThunk,
  deleteFromCartThunk
} from '../store/cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadCartItems(this.props.match.params.userID)
  }

  render() {
    const cartItems = this.props.isLoggedIn
      ? this.props.cartIems ? this.props.cartItems : []
      : this.props.guestCart
    const optionsArr = Array(25).fill(1)
    const subtotal =
      cartItems.reduce((accum, next) => {
        return accum + next.price * next.cart.quantity
      }, 0) / 100
    return (
      <div>
        {cartItems.length ? (
          <div>
            <Link to="/checkout">
              <button id="checkoutbutton"> Proceed to Checkout</button>
            </Link>
            {cartItems.map(item => {
              return (
                <div key={item.id}>
                  <div> {item.name} </div>
                  <div> {item.price / 100}</div>
                  <img src={`../images/${item.imageUrl}`} />
                  <div> Quantity: {item.cart.quantity || 1} </div>
                  <label htmlFor="quantity">Select Quantity</label>
                  <form onSubmit={evt => this.handleSubmit(item, evt)}>
                    <select name="quantity" id={`quantity-${item.id}`}>
                      {optionsArr.map((val, idx) => {
                        return <option value={val + idx}> {val + idx} </option>
                      })}
                    </select>

                    <input type="submit" />
                  </form>
                  <button onClick={() => this.handleDelete(item)}>
                    {' '}
                    Delete{' '}
                  </button>
                  <br />
                </div>
              )
            })}
          </div>
        ) : (
          <div> Your Cart is Empty</div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    guestCart: state.guestCart,
    isLoggedIn: !!state.user.id,
    cartItems: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCartItems: userID => dispatch(getCartItemsThunk(userID)),
    updateQuant: (userID, itemID, quant) =>
      dispatch(updateQuantityThunk(userID, itemID, quant)),
    deleteItem: (userID, itemID) =>
      dispatch(deleteFromCartThunk(userID, itemID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
