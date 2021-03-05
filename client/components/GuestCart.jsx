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
    //console.log(`EVENT TARGET VAL `, evt.target.quantity)
    const quant = document.getElementById(`quantity-${item.id}`).value
    console.log(`QUANT`, quant)
    evt.preventDefault()
    this.props.updateGCQuant(item, quant)
  }

  handleDelete(entireItem) {
    this.props.deleteItem(entireItem)
  }

  render() {
    const cartItems = this.props.cartItems || []

    const optionsArr = Array(25).fill(1)
    console.log(`Guest cart loading...`)

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
                  <div> Quantity: {item.quantity || 1} </div>
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
