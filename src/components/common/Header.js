import React from 'react'
import UserProfile from './UserProfile'

const Header = () => {
  return (
    <header className="header">
      <div className="container header__container">
        <div className="header__container_logo">
          <img className="header__container_logo-img" src="/img/BlackandWhite.png" alt="BlackandWhite" />
          <p className="header__container_logo-text">Lorem ipsum dolor sit amet.</p>
        </div>
        <UserProfile />
      </div>
    </header>
  );
}

export default Header