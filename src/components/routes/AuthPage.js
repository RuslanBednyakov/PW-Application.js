import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import {signUp, signIn, moduleName} from '../../ducks/auth'
import SignInForm from '../auth/SignInForm'
import SignUpForm from '../auth/SignUpForm'

export class AuthPage extends Component {
  static propTypes = {

  }

  render() {
    console.log('Auth Page')
    const {match, isAuthenticated, loading} = this.props;
    return (
      <Switch>
        <Route 
          path={`${match.url}/sign-in`} 
          render={() => <SignInForm onSubmit={this.handleSignIn} isAuthenticated={isAuthenticated} loading={loading}/>} 
        />
        <Route 
          path={`${match.url}/sign-up`} 
          render={() => <SignUpForm onSubmit={this.handleSignUp} isAuthenticated={isAuthenticated} loading={loading}/>}
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
  isAuthenticated: state[moduleName].isAuthenticated
}), { signUp, signIn }, null, {pure: false})(AuthPage);