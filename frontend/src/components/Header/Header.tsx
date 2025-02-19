import React, { useState, useEffect } from 'react';
import logo from '../../images/Mriya.png';
import stars from '../../images/stars.png';
import back from '../../images/return_alive.png';
import { Link, useLocation } from 'react-router-dom';
import { SignUp } from '../SignUp/SignUp';
import { LogIn } from '../LogIn/LogIn';
import { SignUpPopUp } from '../SignUpPopUp';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentForm, setCurrentForm] = useState('');
  const [showSignUpPopUp, setShowSignUpPopUp] = useState(false);
  const [showLogInPopUp, setShowLogInPopUp] = useState(false);
  const [token, setToken] = useState('');
  const location = useLocation();

  const handleWindowResize = () => {
    setIsMobile(window.innerWidth < 1440);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    if (token) {
      setIsMenuOpen(false);
    }
  }, [location, token]);

  const handleBurgerMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignUpSuccess = (token: string) => {
    setToken(token);
    console.log('token:', token);
  };

  const handleLogInSuccess = (token: string) => {
    setToken(token);
    console.log('token:', token);
  };

  useEffect(() => {
    if (currentForm !== '' || showSignUpPopUp || showLogInPopUp) {
      document.body.classList.add('custom-background');
    } else {
      document.body.classList.remove('custom-background');
    }
  }, [currentForm, showSignUpPopUp, showLogInPopUp]);

  return (
    <div className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__container__logo" src={logo} alt="logo" />
        </Link>
        <img className="header__container__stars" src={stars} alt="stars" />
        <a
          className="header__container__come-back-alive"
          href="https://savelife.in.ua/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="header__container__come-back-alive__image" src={back} alt="come-back-alive" />
        </a>
      </div>

      <div
        className={`header__burger-menu ${isMenuOpen ? 'header__burger-menu--open' : ''}`}
        onClick={handleBurgerMenuClick}
      >
        <div className={`header__burger-menu__line-1 ${isMenuOpen ? 'header__burger-menu__line-1--open' : ''}`}></div>
        <div className={`header__burger-menu__line-2 ${isMenuOpen ? 'header__burger-menu__line-2--open' : ''}`}></div>
        <div className={`header__burger-menu__line-3 ${isMenuOpen ? 'header__burger-menu__line-3--open' : ''}`}></div>
      </div>

      {(isMobile && isMenuOpen) || !isMobile ? (
        <div className={`header__navigation ${isMobile && isMenuOpen ? 'header__navigation--open' : ''}`}>
          <ul className="header__navigation__list">
            <Link to="/">
              <li className="header__navigation__list__item">Home</li>
            </Link>

            <Link to="/dreams">
              <li className="header__navigation__list__item">Dreams</li>
            </Link>

            <Link to="/ask-for-help">
              <li className="header__navigation__list__item">Post dream</li>
            </Link>

            <Link to="/contacts">
              <li className="header__navigation__list__item">Contacts</li>
            </Link>
          </ul>

          {token ? (
            <div className="header__navigation__profile-buttons">
              <button className="header__navigation__profile-buttons__my-profile">My profile</button>
            </div>
          ) : (
            <div className="header__navigation__profile-buttons">
              <button className="header__navigation__profile-buttons__sign-up" onClick={() => setCurrentForm('sign-up')}>
                Sign up
              </button>
              {currentForm === 'sign-up' && (
                <SignUp
                  onClose={() => setCurrentForm('')}
                  showSignUpPopUp={() => setShowSignUpPopUp(true)}
                  onChange={() => setCurrentForm('login')}
                  onSignUpSuccess={handleSignUpSuccess}
                />
              )}
              <button className="header__navigation__profile-buttons__log-in" onClick={() => setCurrentForm('login')}>
                Log in
              </button>
              {currentForm === 'login' && (
                <LogIn
                  onClose={() => setCurrentForm('')}
                  onChange={() => setCurrentForm('sign-up')}
                  showLogInPopUp={() => setShowLogInPopUp(true)}
                  onLogInSuccess={handleLogInSuccess}
                />
              )}
            </div>
          )}
        </div>
      ) : null}
      {showSignUpPopUp && <SignUpPopUp onClose={() => setShowSignUpPopUp(false)} />}
      {showLogInPopUp && <SignUpPopUp onClose={() => setShowLogInPopUp(false)} />}
    </div>
  );
};
