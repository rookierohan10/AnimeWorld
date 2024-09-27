import React from 'react'
import './css files/Navbar.css'
import { CircleUserRound, Heart, ShoppingCart } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='logo-section'>
        <div className='logo'>AW</div>
        <div className='name'>Animeworld</div>
      </div>
      <div className='navbar-links'>
        <div><Heart /></div>
        <div><ShoppingCart /></div>
        <div><CircleUserRound /></div>
      </div>
      <div></div>
    </nav>
  )
}

export default Navbar