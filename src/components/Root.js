import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUser, moduleName } from '../ducks/auth'
import Loader from './common/Loader'
import AuthPage from '../components/routes/AuthPage'
import ProtectedRoute from '../components/common/ProtectedRoute'
import MainContainer from './routes/MainContainer'

export class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {setingUser: true};
  }

  componentDidMount() {
    console.log('COMPONENT DID MOUNT')
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.handleSetUser(token);
      return;
    }
    this.setState({ setingUser: false });
  }

  async handleSetUser(token) {
    const data = {
      currentToken: token
    }
    console.log('before', this.state)
    await this.props.setUser(data);
    console.log('after await');
    this.setState({ setingUser: false });
  }

  render() {
    console.log('Root')
    console.log('rendering state', this.state)
    const { setingUser } = this.state;
    const { setUserTimedOut } = this.props;
    console.log(setUserTimedOut)
    if(setingUser && !setUserTimedOut ) {
      return (
        <Loader />
      );
    }
    return (
      <Switch>
        <Route path='/auth' component={AuthPage} />
        <ProtectedRoute path='/' component={MainContainer} />
      </Switch>
    )
  }
}

export default connect(state => {
  const setUserTimedOut = state[moduleName].error ? 
    state[moduleName].error.message === 'Set user timed out' :
    false;
  return { setUserTimedOut }
}, { setUser })(Root);