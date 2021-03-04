import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  getCartItemsThunk,
  updateQuantityThunk,
  deleteFromCartThunk
} from '../store/cart'
import {getGuestCartThunk} from '../store/guestCart'

class GuestCart extends React.Component {
  constructor() {
    super()
    this.state = {
      itemQuant: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleChange(evt) {
    this.setState({itemQuant: evt.target.value})
  }

  handleSubmit(itemID) {
    this.props.updateQuant(
      this.props.match.params.userID,
      itemID,
      this.state.itemQuant
    )
  }

  handleDelete(itemID) {
    this.props.deleteItem(Number(this.props.match.params.userID), itemID)
  }

  render() {
    let cartItems = []
    let savedCart = JSON.parse(localStorage.getItem('Guest_Cart'))
    console.log(`GUESTCRRR`, savedCart)
    if (this.props.cartItems.length > 0) {
      cartItems = this.props.cartItems
    } else if (savedCart.length > 0) {
      this.props.getGuestCart(savedCart)
    } else {
      cartItems = []
    }

    const optionsArr = Array(25).fill(1)

    console.log(`KARTITEMS`, this.props.cartItems)
    return (
      <div>
        {cartItems.length ? (
          <div>
            <Link to="/checkout">
              <button id="checkoutbutton"> Proceed to Checkout</button>
            </Link>
            <br />
            <br />
            <br />
            <br />
            <br />
            {cartItems.map(item => {
              return (
                <div key={item.id}>
                  <div> {item.name} </div>
                  <div> {item.price}</div>
                  <img src={`../images/${item.imageUrl}`} />
                  <div> Quantity: {item.cart ? item.cart.quantity : 1} </div>
                  <label htmlFor="quantity">Select Quantity</label>
                  <select
                    name="quantity"
                    value={this.state.itemQuant}
                    onChange={this.handleChange}
                  >
                    {optionsArr.map((val, idx) => {
                      return <option value={val + idx}> {val + idx} </option>
                    })}
                  </select>
                  <button onClick={() => this.handleSubmit(item.id)}>
                    Change
                  </button>
                  <button onClick={() => this.handleDelete(Number(item.id))}>
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

const mapState = state => {
  return {
    cartItems: state.guestCart
  }
}

const mapDispatch = dispatch => {
  return {
    deleteItem: (userID, itemID) =>
      dispatch(deleteFromCartThunk(userID, itemID)),
    getGuestCart: cartItems => dispatch(getGuestCartThunk(cartItems))
  }
}

export default connect(mapState, mapDispatch)(GuestCart)
