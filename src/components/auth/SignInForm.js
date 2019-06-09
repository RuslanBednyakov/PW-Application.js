import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import validate from '../../helpers';
import ErrorField from './ErrorField'

export class SignInForm extends Component {
  static propTypes = {

  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <div>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <Field name="email" component={ErrorField} type="email" />
          <Field name="password" component={ErrorField} type="password" />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'auth',
  validate
})(SignInForm)
