import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import validate from '../../helpers';
import ErrorField from './ErrorField'

export class SignUpForm extends Component {
  static propTypes = {

  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} >
          <Field name="email" component={ErrorField} type="email" />
          <Field name="name" component={ErrorField} type='text' />
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
})(SignUpForm)
