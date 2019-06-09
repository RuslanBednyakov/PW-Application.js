import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SignInForm from '../auth/SignInForm'

export class AuthPage extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div>
        <h2>Auth Page!</h2>
        <SignInForm />
      </div>
    )
  }
}

export default AuthPage
