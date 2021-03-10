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
    if (this.props.isLoggedIn) {
      await this.props.me()
      console.log(`Loading cart items...`)
      this.props.loadCartItems(this.props.user.id)
    }
  }

  handleDelete(item) {
    if (this.props.isLoggedIn) {
      this.props.deleteItem(this.props.user.id, item.id)
    } else {
      this.props.deleteGuestItem(item)
    }
  }

  render() {
    console.log(`Rendering cart...`)
    const cartItems = this.props.isLoggedIn
      ? this.props.userCart ? this.props.userCart : []
      : this.props.guestCart
    console.log(`Cart Items`, cartItems)

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
                  <QuantityForm item={item} />
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
        <div>Subtotal: ${subtotal}</div>
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
