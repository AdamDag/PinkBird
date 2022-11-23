import './Header.css'
import React from 'react';
import logo from '../images/logo.png';

const Header = () => {
  return (
    <header className="Header">
        <img src = {logo} />
       <h1>PinkBird</h1>
    </header>
  )
}

export default Header