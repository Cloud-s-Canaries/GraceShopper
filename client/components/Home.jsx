import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'
import {AccountCircle} from '@material-ui/icons'
import {getProductsThunk} from '../store/allProducts'

class Home extends React.Component {
  constructor() {
    super()
    this.items = [
      {
        name: 'Random Name #1',
        description: 'Probably the most random thing you have ever seen!'
      },
      {
        name: 'Random Name #2',
        description: 'Hello World!'
      }
    ]
  }

  componentDidMount() {
    this.props.loadProducts()
  }

  render() {
    const products = this.props.products || []
    return (
      <div>
        <Carousel className="home-carousel-cont" fullHeightHover={false}>
          {products.map((prod, i) => (
            <div key={prod.id} className="home-carousel">
              <Link to={`/products/${prod.id}`}>
                <div> {prod.name} </div>
                <div> {prod.rating}</div>
                <img src={`../images/${prod.imageUrl}`} />
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
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
