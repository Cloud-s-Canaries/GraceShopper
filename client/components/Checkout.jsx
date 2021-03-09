import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCartItemsThunk, updateQuantityThunk} from '../store/cart'
import {me} from '../store/user'

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      itemQuant: 1
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    await this.props.me()

    this.props.loadCartItems(this.props.user.id)
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

  handleClick() {}
  render() {
    const cartItems = this.props.isLoggedIn
      ? this.props.cartItems ? this.props.cartItems : []
      : this.props.guestCart
    const optionsArr = Array(25).fill(1)
    const subtotal =
      cartItems.reduce((accum, next) => {
        return accum + next.price * next.cart.quantity
      }, 0) / 100
    const tax = 0.08 * subtotal
    const total = subtotal + tax
    return (
      <div className="checkout-container">
        <div className="title">Checkout</div>
        <div className="checkout-ui">
          <div className="cart-items">
            {cartItems.map(item => {
              return (
                <div key={item.id} className="item">
                  <div className="image-preview">
                    <img src={`../images/${item.imageUrl}`} />
                  </div>
                  <div className="info-container">
                    <div className="item-name"> {item.name} </div>
                    <div className="item-descrip">{item.description}</div>
                    <div className="quantity-container">
                      <div>
                        {' '}
                        Quantity: {item.cart ? item.cart.quantity : 1}{' '}
                      </div>
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
                        {' '}
                        Change
                      </button>
                    </div>
                  </div>
                  <div className="price-container">
                    <div> Price</div>
                    <div> ${item.price / 100}</div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="placeorder">
            <div className="subtotal">
              <div className="flex">
                Subtotal: <span className="right">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex">
                Tax: <span className="right">${tax.toFixed(2)}</span>
              </div>
              <div>------------------------------ </div>
              <div className="flex">
                Total:<span className="right">${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="email-form">
              {this.props.isLoggedIn ? (
                <div>Deliver to: {this.props.user.email}</div>
              ) : (
                <form>
                  <label htmlFor="email">Email: </label>
                  <input name="email" />
                </form>
              )}
            </div>
            <div className="payment">
              <label htmlFor="paymethod">Payment Method</label>
              <select>
                <option> Bitcoin</option>
                <option> Etherum</option>
              </select>
              <Link to="/receipt">
                <button type="submit">Place Order</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    cartItems: state.cart,
    isLoggedIn: !!state.user.id,
    guestCart: state.guestCart
  }
}

const mapDispatch = dispatch => {
  return {
    loadCartItems: userID => dispatch(getCartItemsThunk(userID)),
    updateQuant: (userID, itemID, quant) =>
      dispatch(updateQuantityThunk(userID, itemID, quant)),
    me: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(Checkout)

// Take to receipt page
// Needs to load up all the items bought
// Need to hard code the amount paid in case of price changes/updates
// Then delete their cart
// Eventually needs to be saved in previously bought items
//
