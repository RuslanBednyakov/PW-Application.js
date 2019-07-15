import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Link, Redirect } from 'react-router-dom'
import ErrorField from '../common/ErrorField'
import './style/SignIn.css'
import Loader from '../common/Loader'

export class SignInForm extends Component {
  static propTypes = {
    // from props
    isAuthenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    console.log('Sign In', this.props)
    const { handleSubmit, isAuthenticated, loading, authError, pristine, submitting } = this.props;
    console.log('isAuthenticated', isAuthenticated)
    console.log('Sign-in Error', authError)
    if(isAuthenticated) {
      return  (
        <Redirect to='/'/>
      )
    };
    return (
      <div className="sign-in__container">
        <h2 className="sign-in__container_title">Sign in!</h2>
        <p className="sign-in__container_title-signature">Welcome to our community!</p>
        <form onSubmit={handleSubmit}>
          <div className="sign-in__container_email">
            <Field name="email" label="Email" component={ErrorField} className="sign-in__container_input" type="email" />
          </div>
          <div className="sign-in__container_password">
            <Field name="password" label="Password" component={ErrorField} className="sign-in__container_input" type="password" />
          </div>
          <div className="sign-in__container_error">
            {authError}
          </div>
          <div className="sign-in__container_submit-button">
            {loading && <Loader />}
            <button disabled={pristine || submitting} type="submit" className="sign-in__container_button">Sign-in</button>
          </div>
        </form>
        <div className="sign-in__container_redirect">
          <p className="sign-in__container_redirect-text">
            Still don't have an account?<Link to="sign-up" className="sign-in__container_redirect_link">Sign-Up</Link>
          </p>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'sign-in',
})(SignInForm)