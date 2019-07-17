import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { moduleName } from '../../ducks/auth'

export class UserProfile extends Component {
  static propTypes = {

  }

  componentDidMount() {
    
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
}))(UserProfile);