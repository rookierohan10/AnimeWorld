import React from 'react'
import './css files/Navbar.css'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='logo-section'>
        <div className='logo'>AW</div>
        <div className='name'>Animeworld</div>
      </div>
      <div className='navbar-links'>
        <a>Home</a>
        <a>Items</a>
        <a>Profile</a>
      </div>
      <div></div>
    </nav>
  )
}

export default Navbar