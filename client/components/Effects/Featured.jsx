import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import Carousel from 'react-material-ui-carousel'

function Featured({products}) {
  let sliderColor = ''
  const chants = ['Featured Memes', 'Get yours today!']
  return (
    <Carousel className="home-carousel-cont" fullHeightHover={false}>
      {products.map((prod, i) => (
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

function Changer() {
  return <div> </div>
}

const mapState = state => {
  return {
    products: state.allProducts
  }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, null)(Featured)
