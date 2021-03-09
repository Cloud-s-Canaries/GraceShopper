import React from 'react'
import {connect} from 'react-redux'
import {updateGCQuantThunk} from '../store/guestCart'
import {updateQuantityThunk} from '../store/cart'

class QuantityForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.item.cart.quantity || 1
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {}

  handleSubmit(item, evt) {
    evt.preventDefault()
    if (this.props.isLoggedIn) {
      this.props.updateQuant(this.props.user.id, item.id, this.state.value)
    } else {
      this.props.updateGCQuant(item, this.state.value)
    }
  }

  handleChange(evt) {
    this.setState({value: evt.target.value})
  }

  render() {
    const {item} = this.props
    const optionsArr = Array(25).fill(1)
    return (
      <div>
        <label htmlFor="quantity">Select Quantity</label>
        <form onSubmit={evt => this.handleSubmit(item, evt)}>
          <select
            name="quantity"
            value={this.state.itemQuant}
            onChange={this.handleChange}
          >
            {optionsArr.map((val, idx) => {
              return (
                <option key={val + idx} value={val + idx}>
                  {' '}
                  {val + idx}{' '}
                </option>
              )
            })}
          </select>
          <input type="submit" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateGCQuant: (wholeItem, quant) =>
      dispatch(updateGCQuantThunk(wholeItem, quant)),
    updateQuant: (userID, itemID, quant) =>
      dispatch(updateQuantityThunk(userID, itemID, quant))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuantityForm)
