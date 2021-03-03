import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getProductsThunk, deleteItemThunk} from '../store/allProducts'

import AddProductForm from './AddProductForm'
import EditProductForm from './EditProductForm'

class Admin extends React.Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.loadProducts()
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
              <button type="button" onClick={() => this.handleDelete(prod.id)}>
                Delete this product
              </button>
              <button type="button">Edit this product</button>
            </div>
          )
        })}
        <br />
        <AddProductForm />
        {/* <EditProductForm /> */}
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
