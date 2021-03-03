import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getProductsThunk} from '../store/allProducts'

import AddProductForm from './AddProductForm'

class Admin extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.loadProducts()

    //this.props.addToCart()
  }

  handleClick(clickedItem) {
    // this.props.addToCart(clickedItem)
  }

  render() {
    const products = this.props.products || []
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
              <button type="button" onClick={() => this.handleClick(prod)}>
                {' '}
                Add To Cart
              </button>
            </div>
          )
        })}
        <AddProductForm />
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    loadProducts: () => dispatch(getProductsThunk())
  }
}

export default connect(mapState, mapDispatch)(Admin)
