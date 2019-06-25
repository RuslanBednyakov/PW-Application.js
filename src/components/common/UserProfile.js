import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { moduleName } from '../../ducks/auth'

export class UserProfile extends Component {
  static propTypes = {

  }

  render() {
    const { user } = this.props
    return (
      <div className='header__container_user'>
        <div className='header__container_user-name'>
          {/* {user.name} */}
        </div>
        <div className='header__container_user-balance'>
          {}
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  user: state[moduleName].user
}))(UserProfile);