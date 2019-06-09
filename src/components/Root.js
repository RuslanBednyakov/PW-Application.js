import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Route} from 'react-router-dom'
import AuthPage from '../components/routes/AuthPage'
import UserPage from '../components/routes/UserPage'

export class Root extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div>
        <Route path='/auth' component={AuthPage} />
        <Route path='/user' component={UserPage} />
      </div>
    )
  }
}

export default Root
