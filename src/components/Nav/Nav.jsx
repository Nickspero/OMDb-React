import React from 'react'
import "./Nav.css"
import { useNavigate } from 'react-router-dom'

const Nav = () => {

const navigate = useNavigate()

  return (
    <nav className="navbar">
          <img className="logo__img" src="/assets/omdb.png" onClick={()=>navigate("/")}></img>
          <p>The Open Movie Database</p>
          <img className="house" src="/assets/home.png" onClick={()=>navigate("/")}></img>
      </nav>
  )
}

export default Nav
