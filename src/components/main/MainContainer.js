import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import Header from '../common/Header';
import NavigationBar from '../common/NavigationBar';
import Footer from '../common/Footer';

export class MainContainer extends Component {

  render() {
    return (
      <React.Fragment>
        <div className='content'>
          <Header />
          <article className='section'>
            <NavigationBar />
            <div className='container'>
              <div className ='main'>
                <Switch>

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
