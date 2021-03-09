import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import Carousel from 'react-material-ui-carousel'

function Featured({products}) {
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

const mapState = state => {
  return {
    products: state.allProducts
  }
}

export default connect(mapState, null)(Featured)
