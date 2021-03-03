import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getProductsThunk, deleteItemThunk} from '../store/allProducts'

import AddProductForm from './AddProductForm'

class Admin extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.loadProducts()
  }

  handleClick(clickedItem) {
    // this.props.addToCart(clickedItem)
  }

  handleDelete(itemId) {
    this.props.deleteProduct(itemId)
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
              <button type="button" onClick={() => this.handleDelete(prod)}>
                Delete this product
              </button>
            </div>
          )
        })}
        <br />
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
    loadProducts: () => dispatch(getProductsThunk()),
    deleteProduct: id => dispatch(deleteItemThunk(id))
  }
}

export default connect(mapState, mapDispatch)(Admin)
