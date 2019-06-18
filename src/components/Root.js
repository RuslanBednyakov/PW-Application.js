import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUser, moduleName } from '../ducks/auth'
import AuthPage from '../components/routes/AuthPage'
import ProtectedRoute from '../components/common/ProtectedRoute'
import MainContainer from '../components/main/MainContainer'
import Loader from '../components/common/Loader'

export class Root extends Component {

  componentDidMount() {
    const token = localStorage.getItem('token');
    const data = {
      currentToken: token
    }
    if (token !== null) {
      this.props.setUser(data);
    }
  }

  render() {
    console.log('Root')
    return (
      <Switch>
        <Route path='/auth' component={AuthPage} />
        <ProtectedRoute path='/' component={MainContainer} />
      </Switch>
    )
  }
}

export default connect(state => ({
  loading: state[moduleName].loading,
}), { setUser }, null, {pure: false})(Root);