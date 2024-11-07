import React, { useState } from 'react'
import wlogo from '../assets/icons/mlogo1.jpeg'
import fixlogo from '../assets/icons/welcomelogo.jpeg'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav>
      <div className='logo'>
        <NavLink to='/'>
          <img src={wlogo} className='logo-image' alt='Logo' />
          {/* <img src={flogo} className='logo-image' alt='Logo' /> */}
        </NavLink>
      </div>

      <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? 'open' : ''}></ul>
    </nav>
  )
}

export default Navbar
