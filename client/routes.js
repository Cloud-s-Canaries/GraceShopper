import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import AllProducts from './components/AllProducts'
import SingleItem from './components/SingleItem'
import Cart from './components/Cart'
import Admin from './components/Admin'
import Checkout from './components/Checkout'
import GuestCart from './components/GuestCart'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
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
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/guestcart" component={GuestCart} />
          {isAdmin && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/admin" component={Admin} />
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
          <Route component={Login} />
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
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
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
