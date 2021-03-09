import React from 'react'
import {connect} from 'react-redux'
import {updateUserThunk} from '../store/allUsers'
import {getOneUserThunk} from '../store/singleUser'

//googleId, admin, email, & password

class EditUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    await this.props.getOneUser(this.props.match.params.id)
    this.setState({
      email: this.props.changeUser.email || '',
      password: this.props.changeUser.password || ''
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.updateUser(this.props.match.params.id, this.state)
    this.props.getOneUser(this.props.match.params.id)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const {email, password} = this.state
    return (
      <div>
        <h3>Edit User: {email}</h3>
        <div>Password: {password}</div>
        <form onSubmit={this.handleSubmit}>
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
            <button type="submit">Save Change </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    changeUser: state.singleUser
  }
}

const mapDispatch = dispatch => {
  return {
    getOneUser: userID => dispatch(getOneUserThunk(userID)),
    updateUser: userID => dispatch(updateUserThunk(userID))
  }
}

export default connect(mapState, mapDispatch)(EditUser)
