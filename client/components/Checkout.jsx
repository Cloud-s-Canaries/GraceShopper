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
    console.log(`WATT`, this.props.user)
    const cartItems = this.props.cartItems || []
    const optionsArr = Array(25).fill(1)
    return (
      <div>
        {cartItems.map(item => {
          console.log(`ITEM`, item)
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
                {' '}
                Change
              </button>
              <br />
            </div>
          )
        })}
        <br />
        <br />
        <label htmlFor="paymethod">Payment Method</label>
        <select>
          <option> Bitcoin</option>
          <option> Etherum</option>
        </select>
        <button>Place Order</button>
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
