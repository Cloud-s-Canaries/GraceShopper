import React from 'react'
import {connect} from 'react-redux'
import {getOneUserThunk, updateUserThunk} from '../store/singleUser'

//googleId, admin, email, & password

class EditUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      email: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    await this.props.getOneUser(this.props.match.params.id)
    this.setState({
      id: this.props.match.params.id || '',
      email: this.props.changeUser.email || ''
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.updateUser(this.props.changeUser.id, this.state)
    this.props.getOneUser(this.props.match.params.id)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const {email, id} = this.state
    return (
      <div className="meme-card">
        <div className="meme-info">
          <h3>Edit User: {this.props.changeUser.email || ''}</h3>
          <div>User ID: {id}</div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email">
              <small>Email Address</small>
            </label>
            <input name="email" onChange={this.handleChange} value={email} />
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
    changeUser: state.singleUser
  }
}

const mapDispatch = dispatch => {
  return {
    getOneUser: userID => dispatch(getOneUserThunk(userID)),
    updateUser: (userID, userUpdate) =>
      dispatch(updateUserThunk(userID, userUpdate))
  }
}

export default connect(mapState, mapDispatch)(EditUser)
