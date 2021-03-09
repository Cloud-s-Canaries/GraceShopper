import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getProductsThunk, deleteItemThunk} from '../store/allProducts'
import {
  getAllUsersThunk,
  deleteUserThunk,
  updateUserThunk
} from '../store/allUsers'

import AddProductForm from './AddProductForm'
import EditProductForm from './EditProductForm'
import EditUser from './EditUser'

class AdminUsers extends React.Component {
  constructor() {
    super()
    this.handleItemDelete = this.handleItemDelete.bind(this)
    this.handleUserDelete = this.handleUserDelete.bind(this)
  }

  componentDidMount() {
    this.props.loadProducts()
  }

  handleItemDelete(itemId) {
    this.props.deleteProduct(itemId)
  }

  handleUserDelete(userId) {
    this.props.deleteUser(userId)
  }

  render() {
    const products = this.props.products || []
    console.log('props', this.props, 'state', this.state)
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
                <img src={`../images/${prod.imageUrl}`} />
              </Link>
              <div> Description: {prod.description} </div>
              <button
                type="button"
                onClick={() => this.handleItemDelete(prod.id)}
              >
                Delete this product
              </button>
              <EditProductForm value={prod} />
            </div>
          )
        })}
        <br />
        <AddProductForm />
        <div>
          <h3>Users</h3>
          {users.map(user => {
            return (
              <div key={user.id}>
                <div> name:{user.email}</div>
                <div>id: {user.id}</div>
                <EditUser user={user} />

                <button
                  type="button"
                  onClick={() => this.handleUserDelete(user.id)}
                >
                  Delete this User
                </button>
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
    users: state.allUsers
  }
}

const mapDispatch = dispatch => {
  return {
    loadUsers: () => dispatch(getAllUsersThunk()),
    deleteUser: id => dispatch(deleteUserThunk(id))
  }
}

export default connect(mapState, mapDispatch)(AdminUsers)
