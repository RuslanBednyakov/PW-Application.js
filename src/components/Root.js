import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
// import { push } from 'connected-react-router'
import { withRouter } from 'react-router-dom'
import { setUser, moduleName } from '../ducks/auth'
import Loader from './common/Loader'
import AuthPage from '../components/routes/AuthPage'
import ProtectedRoute from '../components/common/ProtectedRoute'
import MainContainer from './routes/MainContainer'


export class Root extends Component {
  static propTypes = {
    // from store
    isAuthenticated: PropTypes.bool.isRequired,
    setUser: PropTypes.func.isRequired
  }

  componentDidMount() {
    console.log('COMPONENT DID MOUNT')
    const { setUser } = this.props;
    const token = localStorage.getItem('token');
    console.log('COMPONENT DID MOUNT', token)
    if (token !== null) {
      setUser(token);
    }
    // else {
    //   push('/auth/sign-in');
    // }
  }

  render() {
    console.log('Root');
    console.log('Root props', this.props);
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

export default withRouter(connect(state => ({
  isAuthenticated: state[moduleName].isAuthenticated
}), { setUser })(Root));