import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import ErrorField from '../common/ErrorField'
import Loader from '../common/Loader'

export class NewTransactionForm extends Component {
  static propTypes = {

  }

  render() {
    console.log('NewTransactionForm');
    const { handleSubmit, loading } = this.props;
    return (
      <div className="new-transaction__container">
        <h2 className="new-transaction__container_title">New Transaction</h2>
        <p className="new-transaction__container_title-signature">Create your own account and join us</p>
        <form onSubmit={handleSubmit} >
          <div className="new-transaction__container_name">
            <Field name="userName" label="Name" className="new-transaction__container_input" component={ErrorField} type='text' />
          </div>
          <div className="new-transaction__container_amount">
            <Field name="password" label="Amount" className="new-transaction__container_input" component={ErrorField} type="password" />
          </div>
          <div className="new-transaction__container_submit-button">
            {loading && <Loader />}
            <button disabled={loading} type="submit" className="new-transaction__container_button">new-transaction</button>
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'new-transaction',
})(NewTransactionForm)
