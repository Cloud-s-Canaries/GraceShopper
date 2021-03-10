import React from 'react'
import {connect} from 'react-redux'
import {updateItemThunk} from '../store/allProducts'
import {getItemThunk} from '../store/singleProduct'

class EditProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      rating: '',
      price: 0,
      description: '',
      imageUrl: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    await this.props.singleItem(this.props.match.params.id)
    this.setState(this.props.item)
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.updateItem(this.props.match.params.id, this.state)
    this.props.singleItem(this.props.match.params.id)
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

        <div> Name: {this.props.item.name} </div>
        <div> Rating: {this.props.item.rating} </div>
        <div> Price: {this.props.item.price} </div>
        <img src={this.props.item.imageUrl} />

        <div> Description: {description} </div>
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
            <button type="submit">Save Changes </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    item: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    updateItem: (itemId, itemUpdate) =>
      dispatch(updateItemThunk(itemId, itemUpdate)),
    singleItem: itemId => dispatch(getItemThunk(itemId))
  }
}

export default connect(mapState, mapDispatch)(EditProductForm)
