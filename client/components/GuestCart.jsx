import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {
  getGuestCartThunk,
  deleteFromGuestCartThunk,
  updateGCQuantThunk
} from '../store/guestCart'

class GuestCart extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleSubmit(item, evt) {
    const quant = document.getElementById(`quantity-${item.id}`).value
    evt.preventDefault()
    this.props.updateGCQuant(item, quant)
  }

  handleDelete(entireItem) {
    this.props.deleteItem(entireItem)
  }

  render() {
    const cartItems = this.props.cartItems || []

    const optionsArr = Array(25).fill(1)
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
    deleteItem: entireItem => dispatch(deleteFromGuestCartThunk(entireItem)),
    getGuestCart: cartItems => dispatch(getGuestCartThunk(cartItems)),
    updateGCQuant: (wholeItem, quant) =>
      dispatch(updateGCQuantThunk(wholeItem, quant))
  }
}

export default connect(mapState, mapDispatch)(GuestCart)
