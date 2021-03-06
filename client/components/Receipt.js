import React from 'react'
import {connect} from 'react-redux'
import {getCartItemsThunk} from '../store/cart'
import {me} from '../store/user'

class Receipt extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    // Pretty sure I won't need this
    await this.props.me()
    this.props.loadCartItems(this.props.user.id)
  }

  render() {
    const cartItems = this.props.isLoggedIn
      ? this.props.cartItems ? this.props.cartItems : []
      : this.props.guestCart
    const subtotal =
      cartItems.reduce((accum, next) => {
        return accum + next.price * next.cart.quantity
      }, 0) / 100
    const tax = 0.08 * subtotal
    const total = subtotal + tax
    return (
      <div className="checkout-container">
        <div className="title">Receipt</div>
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
                <div>Delivered to: {this.props.user.email}</div>
              ) : (
                <form>
                  <label htmlFor="email">Email: </label>
                  <input name="email" />
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    guestCart: state.guestCart,
    user: state.user,
    cartItems: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCartItems: userID => dispatch(getCartItemsThunk(userID)),
    me: () => dispatch(me())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipt)
