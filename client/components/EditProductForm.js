import React from 'react'
import {connect} from 'react-redux'
import {updateItemThunk} from '../store/allProducts'

class EditProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.value.name,
      rating: this.props.value.rating,
      price: this.props.value.price,
      description: this.props.value.description || '',
      imageUrl: this.props.value.imageUrl
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateItem(this.props.value.id, this.state)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const {name, rating, price, description, imageUrl} = this.state
    return (
      <div>
        <h3>Edit Product</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">
              <small>Product name</small>
            </label>
            <input name="name" onChange={this.handleChange} value={name} />
          </div>
          <div>
            <label htmlFor="rating">
              <small>Rating</small>
            </label>
            <input name="rating" onChange={this.handleChange} value={rating} />
          </div>
          <div>
            <label htmlFor="price">
              <small>Price</small>
            </label>
            <input name="price" onChange={this.handleChange} value={price} />
          </div>
          <div>
            <label htmlFor="description">
              <small>Product Description</small>
            </label>
            <input
              name="description"
              onChange={this.handleChange}
              value={description}
            />
          </div>
          <div>
            <label htmlFor="imageUrl">
              <small>Product Image</small>
            </label>
            <input
              name="imageUrl"
              onChange={this.handleChange}
              value={imageUrl}
            />
          </div>
          <div>
            <button type="submit">Edit Product </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    updateItem: (itemId, itemUpdate) =>
      dispatch(updateItemThunk(itemId, itemUpdate))
  }
}

export default connect(null, mapDispatch)(EditProductForm)
