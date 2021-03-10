import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllUsersThunk, deleteUserThunk} from '../store/allUsers'

class AdminUsers extends React.Component {
  constructor() {
    super()
    this.handleUserDelete = this.handleUserDelete.bind(this)
  }

  componentDidMount() {
    this.props.loadUsers()
  }

  handleUserDelete(userId) {
    this.props.deleteUser(userId)
  }

  render() {
    const users = this.props.users || []
    return (
      <div>
        <div>
          <h3>Users</h3>
          {users.map(user => {
            return (
              <div key={user.id}>
                <div> name:{user.email}</div>
                <div>id: {user.id}</div>
                <button
                  type="button"
                  onClick={() => this.handleUserDelete(user.id)}
                >
                  Delete this User
                </button>
                <Link to={`/edit/users/${user.id}`}>
                  <button type="button">Edit User</button>
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
