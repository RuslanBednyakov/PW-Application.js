import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Link, Redirect } from 'react-router-dom'
import { validate, asyncValidate } from '../../helpers'
import ErrorField from '../common/ErrorField'
import Loader from '../common/Loader'
import './style/SignUp.css'

export class SignUpForm extends Component {
  static propTypes = {
    // from props
    isAuthenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const { handleSubmit, isAuthenticated, loading, authError, pristine, submitting  } = this.props;
    if(isAuthenticated) {
      return (
        <Redirect to="/"/>
      )
    };
    return (
      <div className="sign-up__container">
        <h2 className="sign-up__container_title">Join us!</h2>
        <p className="sign-up__container_title-signature">Create your own account and join us</p>
        <form onSubmit={handleSubmit} >
          <div className="sign-up__container_email">
            <Field name="email" label="Email" className="sign-up__container_input" component={ErrorField} type="email" />
          </div>
          <div className="sign-up__container_name">
            <Field name="name" label="Name" className="sign-up__container_input" component={ErrorField} type='text' />
          </div>
          <div className="sign-up__container_password">
            <Field name="password" label="Password" className="sign-up__container_input" component={ErrorField} type="password" />
          </div>
          <div className="sign-up__container_password-confirm">
            <Field name="confirmPassword" label="Confirm Password" className="sign-up__container_input" component={ErrorField} type="password" />
          </div>
          <div className="sign-in__container_error">
            {authError}
          </div>
          <div className="sign-up__container_submit-button">
            {loading && <Loader />}
            <button disabled={pristine || submitting} type="submit" className="sign-up__container_button">Sign-up</button>
          </div>
        </form>
        <div className="sign-up__container_redirect">
          <p className="sign-up__container_redirect-text">
            Already have an account? <Link to="sign-in" className="sign-in__container_redirect_link">Sign-In</Link>
          </p>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'sign-up',
  validate,
  asyncValidate,
  asyncBlurFields: ['email']
})(SignUpForm)
