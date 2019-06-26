import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { setUser, moduleName } from '../ducks/auth'
import Loader from './common/Loader'
import AuthPage from '../components/routes/AuthPage'
import ProtectedRoute from '../components/common/ProtectedRoute'
import MainContainer from './routes/MainContainer'


export class Root extends Component {

  componentDidMount() {
    console.log('COMPONENT DID MOUNT')
    const { setUser, push } = this.props;
    const token = localStorage.getItem('token');
    if (token !== null) {
      setUser({ token });
    } else {
      push('/auth/sign-in');
    }
  }

  render() {
    console.log('Root')
    const { isAuthenticated } = this.props;
    const token = localStorage.getItem('token');
    if(!isAuthenticated && token ) {
      return (
        <Loader />
      );
    }
    return (
      <Switch>
        <Route path='/auth' component={AuthPage} />
        <ProtectedRoute path='/' component={MainContainer} />
      </Switch>
    )
  }
}

export default connect(state => ({
  isAuthenticated: state[moduleName].isAuthenticated
}), { setUser, push })(Root);