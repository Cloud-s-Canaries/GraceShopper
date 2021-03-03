import React from 'react'
import {connect} from 'react-redux'
import {getCartItemsThunk, updateQuantityThunk} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      itemQuant: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({itemQuant: evt.target.value})
  }

  componentDidMount() {
    this.props.loadCartItems(this.props.match.params.userID)
  }

  handleSubmit(itemID) {
    this.props.updateQuant(
      this.props.match.params.userID,
      itemID,
      this.state.itemQuant
    )
  }

  render() {
    const cartItems = this.props.cartItems || []
    const optionsArr = Array(25).fill(1)

    return (
      <div>
        {' '}
        {cartItems.length ? (
          cartItems.map(item => {
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
    loadCartItems: userID => dispatch(getCartItemsThunk(userID)),
    updateQuant: (userID, itemID, quant) =>
      dispatch(updateQuantityThunk(userID, itemID, quant))
  }
}

export default connect(mapState, mapDispatch)(Cart)
