import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'

const Nav = () => {
  return (
    <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/post">Details</Link></li>
          <li><Link to="/About">About</Link></li>
        </ul>
      </nav>
      
  )
}

export default Nav