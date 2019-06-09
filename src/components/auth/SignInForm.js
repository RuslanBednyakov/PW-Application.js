import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

export class SignInForm extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div>
        <h2>Sign In</h2>
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <Field name="email" component="input" type="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field name="password" component="input" type="password" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'auth'
})(SignInForm)
