import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getProductsThunk} from '../../store/allProducts'
import Carousel from 'react-material-ui-carousel'

class Featured extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.loadProducts()
  }

  render() {
    console.log(`props`, this.props)
    const {products} = this.props
    let sliderColor = ''
    const chants = ['Featured Memes', 'Get yours today!']
    let featuredProducts = products
    if (products.length > 5) {
      featuredProducts = products.slice(0, 4)
    }
    return (
      <Carousel className="home-carousel-cont" fullHeightHover={false}>
        {featuredProducts.map((prod, i) => (
          <div key={prod.id} className={`home-carousel${sliderColor}`}>
            <Link to={`/products/${prod.id}`}>
              <h1>{chants[i]}</h1>
              <div> {prod.name} </div>
              <div> {prod.rating}</div>
              <img src={`../images/${prod.imageUrl}`} />
            </Link>
          </div>
        ))}
      </Carousel>
    )
  }
}

const mapState = state => {
  return {
    products: state.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    loadProducts: () => dispatch(getProductsThunk())
  }
}

export default connect(mapState, mapDispatch)(Featured)
