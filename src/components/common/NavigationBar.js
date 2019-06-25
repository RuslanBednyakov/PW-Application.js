import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {moduleName} from '../../ducks/auth'


class NavigationBar extends Component {

  render(){
    return  (
      <nav className="container menu">
        <ul className="menu__list">
          <li className="menu__list_item new-transaction">
            <NavLink to="/transactions/new" className="menu__list_item-link">New Transaction</NavLink>
          </li>
          <li className="menu__list_item transaction-history">
            <NavLink to="/transactions/history" className="menu__list_item-link">Transaction History</NavLink>
          </li>
          <li className="menu__list_item logOut">
            <NavLink to="/log-out" className="menu__list_item-link">Log Out</NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}

export default NavigationBar;