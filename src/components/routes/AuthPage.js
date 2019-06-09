import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Route, NavLink} from 'react-router-dom'
import SignInForm from '../auth/SignInForm'
import SignUpForm from '../auth/SignUpForm'

export class AuthPage extends Component {
  static propTypes = {

  }

  render() {
    const {match} = this.props;
    return (
      <div>
        <h2>Auth Page!</h2>
        <NavLink to={`${match.url}/sign-in`} activeStyle={{color: 'red'}}> Sign In </NavLink>
        <NavLink to={`${match.url}/sign-up`} activeStyle={{color: 'red'}}> Sign Up </NavLink>
        <Route path={`${match.url}/sign-in`} render={() => <SignInForm onSubmit={this.handleSignIn} />} />
        <Route path={`${match.url}/sign-up`} render={() => <SignUpForm onSubmit={this.handleSignUp} />} />
      </div>
    )
  }

  handleSignIn = (value) => {
    console.log('sign in', value)
  }

  handleSignUp = (value) => {
    console.log('sign up', value)
  }
}

export default AuthPage
