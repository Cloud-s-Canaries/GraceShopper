import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCartItemsThunk, deleteFromCartThunk} from '../store/cart'
import {deleteFromGuestCartThunk} from '../store/guestCart'
import {me} from '../store/user'
import QuantityForm from './QuantityForm'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  async componentDidMount() {
    await this.props.me()
    this.props.loadCartItems(this.props.user.id)
  }

  handleDelete(item) {
    if (this.props.isLoggedIn) {
      this.props.deleteItem(this.props.user.id, item.id)
    } else {
      this.props.deleteGuestItem(item)
    }
  }

  render() {
    const cartItems = this.props.isLoggedIn
      ? this.props.userCart ? this.props.userCart : []
      : this.props.guestCart

    const subtotal =
      cartItems.reduce((accum, next) => {
        return accum + next.price * next.cart.quantity
      }, 0) / 100
    return (
      <div>
        {cartItems.length ? (
          <div className="cart-container">
            {cartItems.map(item => {
              return (
                <div key={item.id} className="cart-items cart-view">
                  <div className="cart-image-preview">
                    <img src={item.imageUrl} className="cart-image-preview" />
                  </div>
                  <div className="info-container cart-info">
                    <div className="item-name"> Name: {item.name} </div>
                    <div className="cart-price">Price: ${item.price / 100}</div>

                    <div className="quantity">
                      {' '}
                      Quantity: {item.cart.quantity || 1}{' '}
                    </div>
                    <QuantityForm item={item} />
                  </div>
                  <div className="delete-button-container">
                    <button
                      className="delete-button"
                      onClick={() => this.handleDelete(item)}
                    >
                      X
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div> Your Cart is Empty</div>
        )}
        <div>
          <div className="subtotal">Subtotal: ${subtotal.toFixed(2)}</div>
          <div>
            <Link to="/checkout">
              <button id="checkoutbutton"> Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    guestCart: state.guestCart,
    isLoggedIn: !!state.user.id,
    userCart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCartItems: userID => dispatch(getCartItemsThunk(userID)),
    deleteItem: (userID, itemID) =>
      dispatch(deleteFromCartThunk(userID, itemID)),
    me: () => dispatch(me()),
    deleteGuestItem: entireItem =>
      dispatch(deleteFromGuestCartThunk(entireItem))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
