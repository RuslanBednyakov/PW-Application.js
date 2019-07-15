import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import {signUp, signIn, moduleName} from '../../ducks/auth'
import SignInForm from '../auth/SignInForm'
import SignUpForm from '../auth/SignUpForm'

export class AuthPage extends Component {
  static propTypes = {
    // from store
    isAuthenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    signUp: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    error: PropTypes.string
  }

  render() {
    console.log('Auth Page');
    console.log('Auth props', this.props)
    const { match, isAuthenticated, loading, error } = this.props;
    return (
      <Switch>
        <Route 
          path={`${match.url}/sign-in`} 
          render={() => <SignInForm onSubmit={this.handleSignIn} isAuthenticated={isAuthenticated} loading={loading} authError={error} />} 
        />
        <Route 
          path={`${match.url}/sign-up`} 
          render={() => <SignUpForm onSubmit={this.handleSignUp} isAuthenticated={isAuthenticated} loading={loading} authError={error} />}
        />
        <Redirect to={`${match.url}/sign-in`} />
      </Switch>
    )
  }

  handleSignIn = (value) => {
    const { signIn } = this.props;
    signIn(value);
  }

  handleSignUp = (value) => {
    const { signUp } = this.props;
    signUp(value);
  }
}

export default connect(state => ({
  loading: state[moduleName].loading,
  isAuthenticated: state[moduleName].isAuthenticated,
  error: state[moduleName].error && state[moduleName].error.response.data.message
}), { signUp, signIn })(AuthPage);