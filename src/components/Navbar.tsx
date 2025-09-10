import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
const NavBar = () => {
  return (
    <div className="norm">
      <div className="nav-wrapper white">
        <Link to="/" className="cus">Shopping Cart</Link>
      </div>
    </div>
  )
}

export default NavBar
