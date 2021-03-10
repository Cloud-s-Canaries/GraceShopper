import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getProductsThunk, deleteItemThunk} from '../store/allProducts'

import AddProductForm from './AddProductForm'

class AdminProducts extends React.Component {
  constructor() {
    super()
    this.handleItemDelete = this.handleItemDelete.bind(this)
  }

  componentDidMount() {
    this.props.loadProducts()
  }

  handleItemDelete(itemId) {
    this.props.deleteProduct(itemId)
  }

  render() {
    const products = this.props.products || []
    const users = this.props.users || []

    return (
      <div>
        {products.map(prod => {
          return (
            <div key={prod.id}>
              <Link to={`/products/${prod.id}`}>
                <div> Name: {prod.name} </div>
                <div> Rating: {prod.rating} </div>
                <div> Price: {prod.price} </div>
                <img src={prod.imageUrl} />
              </Link>
              <div> Description: {prod.description} </div>
              <button
                type="button"
                onClick={() => this.handleItemDelete(prod.id)}
              >
                Delete this product
              </button>
              <Link to={`/edit/products/${prod.id}`}>
                <button type="button">Edit Product</button>
              </Link>
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
    loadProducts: () => dispatch(getProductsThunk()),
    deleteProduct: id => dispatch(deleteItemThunk(id))
  }
}

export default connect(mapState, mapDispatch)(AdminProducts)
