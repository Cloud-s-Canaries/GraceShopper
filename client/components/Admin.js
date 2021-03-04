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
                <div> Name: {prod.name} </div>
                <div> Rating: {prod.rating} </div>
                <div> Price: {prod.price} </div>
                <img src={`../images/${prod.imageUrl}`} />
              </Link>
              <div> Description: {prod.description} </div>
              <button type="button" onClick={() => this.handleDelete(prod.id)}>
                Delete this product
              </button>
              <EditProductForm value={prod} />
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
