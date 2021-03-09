import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import AllProducts from './components/AllProducts'
import SingleItem from './components/SingleItem'
import Cart from './components/Cart'
import AdminProducts from './components/AdminProducts'
// import AdminUsers from './compoenents/AdminUsers'
import EditProductForm from './components/EditProductForm'
import Checkout from './components/Checkout'
import GuestCart from './components/GuestCart'
import {getGuestCartThunk} from './store/guestCart'
import Receipt from './components/Receipt'
import Home from './components/Home'
import EditUser from './components/EditUser'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    let savedCart = JSON.parse(localStorage.getItem('Guest_Cart'))

    if (savedCart && !this.props.isLoggedIn) {
      this.props.getGuestCart(savedCart)
    }
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    // admin shud take you to admin page but takes u home...
    return (
      <div>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/products/:id" component={SingleItem} />
          <Route path="/products" component={AllProducts} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/receipt" component={Receipt} />
          <Route path="/guestcart" component={GuestCart} />
          {isAdmin && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/admin/products" component={AdminProducts} />
              <Route path="/edit/products/:id" component={EditProductForm} />
              {/* <Route path="/admin/users" component={AdminUsers} /> */}
              <Route path="/checkout" component={Checkout} />
              <Route path="/:userID/edit" />
              <Route path="/:userID/cart" component={Cart} />
            </Switch>
          )}
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/:userID/cart" component={Cart} />
            </Switch>
          )}

          {/* Displays our Login component as a fallback */}
          <Route component={Home} />
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    guestCart: state.guestCart,
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    getGuestCart: cartItems => dispatch(getGuestCartThunk(cartItems))
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
