import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <footer>
        <figure className='footer__logo'>
            <img className='footer__logo--img' src="/assets/omdb.png" alt="" />
        </figure>
        <p className="copyright">OMDb Online Movie Database Copyright &copy; 2025 </p>
    </footer>
  )
}

export default Footer
