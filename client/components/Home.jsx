import React from 'react'
import {connect} from 'react-redux'
import Carousel from 'react-material-ui-carousel'
import {AccountCircle} from '@material-ui/icons'
import {getProductsThunk} from '../store/allProducts'
import Featured from './Effects/Featured'
import CustomSlider from './Effects/CustomSlider'
import NicheMemes from './Effects/NicheMemes'
import {Button, AccessAlarmsRounded} from '@material-ui/icons/'
import RamdomVideo from './Effects/RandomVideo'
import Searchbar from './Effects/SearchBar'

class Home extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.loadProducts()
  }

  render() {
    const products = this.props.products || []
    const comps = [Featured, NicheMemes, AccessAlarmsRounded]
    return (
      <>
        <Featured />
        <RamdomVideo />
      </>
    )
  }
}

const mapState = state => {
  return {products: state.allProducts}
}

const mapDispatch = dispatch => {
  return {loadProducts: () => dispatch(getProductsThunk())}
}

export default connect(mapState, mapDispatch)(Home)
