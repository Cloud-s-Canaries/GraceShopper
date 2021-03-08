import React from 'react'
import {connect} from 'react-redux'
import {updateUserThunk} from '../store/allUsers'
import {getOneUserThunk} from '../store/singleUser'

//googleId, admin, email, & password

class EditUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      admin: '',
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getOneUser(this.props.user.id)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateUser(this.props.value.id, this.state)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const {admin, email, password} = this.state
    console.log(`This PROPS`, this.props)
    return (
      <div>
        <h3>Edit User {this.props.user.email}</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="admin">
              <small>Admin Status</small>
            </label>
            <input name="admin" onChange={this.handleChange} value={admin} />
          </div>
          <div>
            <label htmlFor="email">
              <small>Email Address</small>
            </label>
            <input name="email" onChange={this.handleChange} value={email} />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input
              name="password"
              onChange={this.handleChange}
              value={password}
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
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getOneUser: userID => dispatch(getOneUserThunk(userID)),
    updateUser: () => dispatch(updateUserThunk())
  }
}

export default connect(mapState, mapDispatch)(EditUser)
