import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebookF,faInstagram,faYoutube} from '@fortawesome/free-brands-svg-icons';
import logo from "./logo.png"

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              <img className='fab fa-typo2' src={logo} alt=''/>
            </Link>
          </div>
          <div className='footer-name'>LINGUEE</div>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Kontakt</h2>
            <Link to='/'>lingue@gmail.com</Link>
            <Link to='/'>060/1234567</Link>
          </div>
        </div>
        
      </div>
      
      <section className='social-media'>
        <div className='social-media-wrap'>
          
          
          <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <FontAwesomeIcon icon={faFacebookF}/>
            </Link>
            <Link
              className='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <FontAwesomeIcon icon={faInstagram}/>
            </Link>
            <Link
              className='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
             <FontAwesomeIcon icon={faYoutube}/>
            </Link>
          </div>
        </div>
      </section>
      <small className='website-rights'>LINGUEE © 2024</small>
    </div>
  );
}

export default Footer;
