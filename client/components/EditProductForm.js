import React from 'react'
import {connect} from 'react-redux'
import {getItemThunk, updateItemThunk} from '../store/singleProduct'

class EditProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.loadItem(this.props.match.params.id)
  }

  handleSubmit = event => {
    const itemUpdate = {
      name: event.target.name.value,
      rating: event.target.rating.value,
      price: event.target.price.value,
      imageUrl: event.target.imageUrl.value,
      description: event.target.description.value
    }
    event.preventDefault()
    this.props.updateItem(this.props.item.id, itemUpdate)
  }

  render() {
    const {name, rating, price, description, imageUrl} = this.props.item
    console.log('this.props.item', this.props.item)
    return (
      <div>
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

const mapState = state => {
  return {
    singleProduct: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    loadItem: id => dispatch(getItemThunk(id)),
    updateItem: (itemId, itemUpdate) =>
      dispatch(updateItemThunk(itemId, itemUpdate))
  }
}

export default connect(mapState, mapDispatch)(EditProductForm)
