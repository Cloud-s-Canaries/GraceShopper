import React from 'react'
import {connect} from 'react-redux'
import {getItemThunk} from '../store/singleProduct'
import {dummyData} from './AllProducts'

class SingleItem extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {}

  componentDidMount() {
    this.props.loadItem(this.props.match.params.id)
  }
  render() {
    const {item} = this.props
    return (
      <div>
        <h3> {item.name} </h3>
        <h4> {item.rating}</h4>
        <img src={item.imageUrl} />
        <p>{item.description} </p>
        <button>Add To Cart </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    item: state.item
  }
}

const mapDispatch = dispatch => {
  return {
    loadItem: itemID => dispatch(getItemThunk(itemID))
  }
}

export default connect(mapState, mapDispatch)(SingleItem)
