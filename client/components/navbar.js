import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Searchbar from './Effects/SearchBar'
import {ShoppingCart} from '@material-ui/icons'
import {Menu, MenuItem} from '@material-ui/core'

const Navbar = ({handleClick, isLoggedIn, isAdmin, user}) => (
  <div>
    <Link to="/home">
      <h1>memeazon</h1>
    </Link>
    <nav>
      <Searchbar className="search" />
      <Link to="/products"> Buy Memes</Link>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to={`/${user.id}/cart`}> Cart </Link>
          {isAdmin ? (
            <div>
              {' '}
              <Link to="/admin/products"> Admin-Products</Link>{' '}
              <Link to="/admin/users"> Admin-Users</Link>{' '}
            </div>
          ) : (
            ''
          )}

          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}

          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/guestcart">
            <ShoppingCart />
            Guest
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
