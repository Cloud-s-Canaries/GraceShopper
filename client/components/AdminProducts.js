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
    const stars = [1, 2, 3, 4, 5]

    return (
      <div>
        <AddProductForm />
        <div className="meme-container">
          {products.map(prod => {
            return (
              <div key={prod.id} className="meme-card">
                <img src={prod.imageUrl} />
                <Link to={`/products/${prod.id}`}>
                  <div className="meme-info">
                    <div> Name: {prod.name} </div>
                    <div>
                      Rating:{' '}
                      {stars.slice(0, prod.rating).map(star => {
                        return <>⭐ </>
                      })}
                    </div>
                    <div> Price: {prod.price} </div>
                  </div>
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
        </div>
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
