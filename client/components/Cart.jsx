import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  getCartItemsThunk,
  updateQuantityThunk,
  deleteFromCartThunk
} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      itemQuant: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.loadCartItems(this.props.match.params.userID)
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
    const cartItems = this.props.cartItems || []
    const optionsArr = Array(25).fill(1)
    const subtotal =
      cartItems.reduce((accum, next) => {
        return accum + next.price * next.cart.quantity
      }, 0) / 100
    console.log(`CartItems: `, cartItems)
    return (
      <div>
        {cartItems.length ? (
          <div>
            <Link to="/checkout">
              <button type="button" id="checkoutbutton">
                {' '}
                Proceed to Checkout
              </button>
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
                  <div> {item.price / 100}</div>
                  <img src={`../images/${item.imageUrl}`} />
                  <div> Quantity: {item.cart ? item.cart.quantity : 1} </div>
                  <label htmlFor="quantity">Select Quantity</label>
                  <select
                    name="quantity"
                    value={this.state.itemQuant}
                    onChange={this.handleChange}
                  >
                    {optionsArr.map((val, idx) => {
                      return (
                        <option key={val + idx} value={val + idx}>
                          {' '}
                          {val + idx}{' '}
                        </option>
                      )
                    })}
                  </select>
                  <button
                    type="button"
                    onClick={() => this.handleSubmit(item.id)}
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => this.handleDelete(Number(item.id))}
                  >
                    {' '}
                    Delete{' '}
                  </button>
                  <br />
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

const mapState = state => {
  return {
    cartItems: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    loadCartItems: userID => dispatch(getCartItemsThunk(userID)),
    updateQuant: (userID, itemID, quant) =>
      dispatch(updateQuantityThunk(userID, itemID, quant)),
    deleteItem: (userID, itemID) =>
      dispatch(deleteFromCartThunk(userID, itemID))
  }
}

export default connect(mapState, mapDispatch)(Cart)
