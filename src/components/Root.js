import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthPage from '../components/routes/AuthPage'

import ProtectedRoute from '../components/common/ProtectedRoute'
import MainContainer from '../components/main/MainContainer';

export class Root extends Component {

  render() {
    return (
      <Switch>
        <Route path='/auth' component={AuthPage} />
        <ProtectedRoute path='/' component={MainContainer} />
      </Switch>
    )
  }
}

export default Root