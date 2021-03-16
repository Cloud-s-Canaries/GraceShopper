import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getProductsThunk} from '../store/allProducts'
import {addToCartThunk} from '../store/cart'
import {toGuestCartThunk} from '../store/guestCart'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.loadProducts()
  }

  handleClick(userID, itemID, entireItem) {
    if (userID) {
      this.props.addToCart(userID, itemID, entireItem)
    }
    if (!userID) {
      this.props.toGuestCart(entireItem)
    }
  }

  render() {
    const stars = [1, 2, 3, 4, 5]
    const products = this.props.products || []
    const userID = this.props.user.id
    return (
      <div className="meme-container">
        {products.map(prod => {
          return (
            <div key={prod.id} className="meme-card">
              <img src={prod.imageUrl} className="image-preview" />
              <Link to={`/products/${prod.id}`}>
                <div className="meme-info">
                  {' '}
                  <h4> {prod.name} </h4>
                </div>
              </Link>
              <div>{`Price: $${(prod.price / 100).toFixed(2)}`}</div>
              <div>
                Rating:{' '}
                {stars.slice(0, prod.rating).map(star => {
                  return <>⭐ </>
                })}
              </div>
              <button
                type="button"
                onClick={() => this.handleClick(userID, prod.id, prod)}
                className="add-cart-button"
              >
                {' '}
                Add To Cart
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    products: state.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    loadProducts: () => dispatch(getProductsThunk()),
    addToCart: (userID, prodID, quant) =>
      dispatch(addToCartThunk(userID, prodID, quant)),
    toGuestCart: newItem => dispatch(toGuestCartThunk(newItem))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
