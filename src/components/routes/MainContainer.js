import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Header from '../common/Header';
import NavigationBar from '../common/NavigationBar';
import Footer from '../common/Footer';
import Transactions from './Transactions'

export class MainContainer extends Component {
  static propTypes = {

  }

  render() {
    console.log('Main Container', this.props)
    return (
      <React.Fragment>
        <div className='content'>
          <Header />
          <article className='section'>
            <NavigationBar />
            <div className='container'>
              <div className ='main'>
              {/* <Route component={Transactions} /> */}
                <Switch>
                  <Route path='/transactions'  component={Transactions} />
                  <Redirect to='transactions' />
                </Switch>
              </div>
            </div>
          </article>
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}

export default MainContainer
