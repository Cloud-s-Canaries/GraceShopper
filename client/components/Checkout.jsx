import React from 'react'
import {connect} from 'react-redux'
import {getCartItemsThunk, updateQuantityThunk} from '../store/cart'

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

  componentDidMount() {
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
    const cartItems = this.props.cartItems || []
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
            <br />
            <br />
          </div>
          <div className="placeorder">
            <div className="subtotal">
              <div className="flex">
                Subtotal: <span className="right">{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex">
                Tax: <span className="right">{tax.toFixed(2)}</span>
              </div>
              <div>------------------------------ </div>
              <div className="flex">
                Total:<span className="right">{total.toFixed(2)}</span>
              </div>
            </div>
            <div>
              <label htmlFor="paymethod">Payment Method</label>
              <select>
                <option> Bitcoin</option>
                <option> Etherum</option>
              </select>
              <button type="button">Place Order</button>
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
    cartItems: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    loadCartItems: userID => dispatch(getCartItemsThunk(userID)),
    updateQuant: (userID, itemID, quant) =>
      dispatch(updateQuantityThunk(userID, itemID, quant))
  }
}

export default connect(mapState, mapDispatch)(Checkout)
