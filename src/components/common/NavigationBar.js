import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {moduleName} from '../../ducks/auth'


class NavigationBar extends Component {

  render(){
    return  (
      <nav className="container menu">
        <ul className="menu__list">
          <li className="menu__list_item myPage">
            <NavLink to="/my-page" className="menu__list_item-link">My Page</NavLink>
          </li>
          <li className="menu__list_item news">
            <NavLink to="/news" className="menu__list_item-link">News</NavLink>
          </li>
          <li className="menu__list_item myFriends">
            <NavLink to="/friends" className="menu__list_item-link">My Friends</NavLink>
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