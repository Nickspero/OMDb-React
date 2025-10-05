import React from 'react'
import "./Home.css"
import { useNavigate } from 'react-router-dom'

const Home = () => { 

    let navigate = useNavigate()

  return (
    <>
    <div className="home-page">
    <div className="home__container">
    <img className='logo' src="/assets/omdb.png" alt="" />
    <button className='homeBtn' onClick={()=>navigate("/search")}>Search Titles</button>
    </div>
    </div>
    </>
  )
}

export default Home
