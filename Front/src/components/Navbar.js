
import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import './Navbar.css';

import { Button } from './Button';

import logo from "./logo.png";

import user_icon from './Assets/person.png';
import DropDown from './Dropdown.js';


import { isAuthenticated } from '../services/AuthService'; 
 
function Navbar() {

    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [button, setButton] = useState(true);
 
    const handleClick = () => setClick(!click);

    const closeMobileMenu = () => setClick(false);
 
    const onMouseEnter = () => {

        if (window.innerWidth < 960) {

            setDropdown(false);

        } else {

            setDropdown(true);

        }

    };
 
    const onMouseLeave = () => {

        if (window.innerWidth < 960) {

            setDropdown(false);

        } else {

            setDropdown(false);

        }

    };
 
    const showButton = () => {

        if (window.innerWidth <= 960) {

            setButton(false);

        } else {

            setButton(true);

        }

    };
 
    useEffect(() => {

        showButton();

    }, []);
 
    window.addEventListener('resize', showButton);
 
    return (

        <>

            <nav className='navbar'>

                <div className='navbar-container'>

                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>

                        LINGUEE

                        <img className='fab fa-typo3' src={logo} alt='' />

                    </Link>

                    <div className='menu-icon' onClick={handleClick}>

                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />

                    </div>

                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>

                        <li className='nav-item'>

                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>

                                Naslovna

                            </Link>

                        </li>

                        <li className='nav-item'>

                            <Link to='/onama' className='nav-links' onClick={closeMobileMenu}>

                                O nama

                            </Link>

                        </li>

                        <li className='nav-item'

                            onMouseEnter={onMouseEnter}

                            onMouseLeave={onMouseLeave}>

                            <Link

                                to='/upiskursa'

                                className='nav-links'

                                onClick={closeMobileMenu}

                            >

                                Upis kursa

                            </Link>
                            {dropdown && <DropDown />}
                            
                        </li>

                        <li className='nav-item'>

                            <Link

                                to='/profesori'

                                className='nav-links'

                                onClick={closeMobileMenu}

                            >

                                Profesori

                            </Link>

                        </li>

                        {isAuthenticated() && ( // Prikazujemo profil-icon samo ako je korisnik prijavljen

                            <li>

                                <Link

                                    to='/profil'

                                    className='profil-icon'

                                    onClick={closeMobileMenu}

                                >

                                    <img src={user_icon} alt="Profil icon" />

                                </Link>

                            </li>

                        )}

                    </ul>

                    {/* Prikazujemo dugme "Prijavljivanje" samo ako korisnik nije prijavljen */}

                    {!isAuthenticated() && button && <Button buttonStyle='btn--outline' linkTo='/prijavljivanje'>Prijavljivanje</Button>}

                </div>

            </nav>

        </>

    );

}
 
export default Navbar;

 

