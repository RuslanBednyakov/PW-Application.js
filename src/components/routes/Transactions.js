import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import {signUp, signIn, moduleName} from '../../ducks/auth'
import NewTransactionForm from '../transactions/NewTransactionForm'
import TransactionsHistory from '../transactions/TransactionsHistory'

export class Transactions extends Component {
  static propTypes = {

  }

  render() {
    console.log('Transactions')
    const {match, loading} = this.props;
    return (
      <Switch>
        <Route 
          path={`${match.url}/new`} 
          render={() => <NewTransactionForm onSubmit={this.handleNewTransaction} loading={loading}/>} 
        />
        <Route 
          path={`${match.url}/history`} 
          render={() => <TransactionsHistory loading={loading}/>}
        />
        <Redirect to={`${match.url}/new`}/>
      </Switch>
    )
  }

  handleNewTransaction = (value) => {
    // const { signIn } = this.props;
    // signIn(value);
    console.log('handleNewTransaction!!!!!!!!!!!!!!!')
    console.log(value)
  }
}

export default connect(state => ({
  loading: state[moduleName].loading,
  isAuthenticated: state[moduleName].isAuthenticated
}), { signUp, signIn })(Transactions);
