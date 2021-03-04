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

    //this.props.addToCart()
  }

  handleClick(userID, itemID, entireItem) {
    if (userID) {
      this.props.addToCart(userID, itemID, 1)
    }
    if (!userID) {
      this.props.toGuestCart(entireItem)
    }
  }

  render() {
    console.log(`PROS`, this.props)
    const products = this.props.products || []
    const userID = this.props.user.id
    return (
      <div>
        {products.map(prod => {
          return (
            <div key={prod.id}>
              <Link to={`/products/${prod.id}`}>
                <div> {prod.name} </div>
                <div> {prod.rating}</div>
                <img src={`../images/${prod.imageUrl}`} />
              </Link>
              <button
                type="button"
                onClick={() => this.handleClick(userID, prod.id)}
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
