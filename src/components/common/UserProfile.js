import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { moduleName } from '../../ducks/auth'
import { submitIncomingTransactions } from '../../ducks/transactions'

export class UserProfile extends Component {
  static propTypes = {

  }

  componentDidMount() {
    
    const { submitIncomingTransactions, user } = this.props;
    console.log('USER PRFILE componentDidMount', user)
    submitIncomingTransactions(user);
  }

  render() {
    const { user } = this.props

    return (
      <div className='header__container_user'>
        <div className='header__container_user-name'>
          User Name
        </div>
        <div className='header__container_user-balance'>
          User Balance
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  user: state[moduleName].user
}), { submitIncomingTransactions })(UserProfile);