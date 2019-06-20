import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {moduleName} from '../../ducks/auth'

class ProtectedRoute extends Component {

  render() {
    console.log('Protected Route')
    const {component, ...rest} = this.props;
    console.log(rest)
    return <Route {...rest} render={this.renderProtected} />
  }

  renderProtected = (routeProps) => {
    const {component: ProtectedComponent, isAuthenticated} = this.props;
    return isAuthenticated ? <ProtectedComponent {...routeProps} /> : <Redirect to='/auth/sign-in' />
  }
}

export default connect(state => ({
  isAuthenticated: state[moduleName].isAuthenticated
}), null, null, {pure: false})(ProtectedRoute);