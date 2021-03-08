import React from 'react'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

function NicheMemes({products}) {
  return (
    <div>
      ...Coming soon
      <div />
    </div>
  )
}

const mapState = state => {
  return {
    products: state.allProducts
  }
}

export default connect(mapState, null)(NicheMemes)
