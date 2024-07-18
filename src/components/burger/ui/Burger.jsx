import { useState, useEffect, useCallback, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import './Burger.css'
import { ThemeContext } from '../../../contexts/ThemeContext'

const SidebarContent = () => (
  <div className='sidebar-content'>
    <p>
      If you have any questions or suggestions, write ➡️{' '}
      <a
        href='https://wa.me/+79817618313'
        target='_blank'
        rel='noopener noreferrer'
      >
        @tainkrios
      </a>
    </p>
    <p>
      Your donation will help fund my adventures in Berlin as I explore new
      places and discover hidden gems. With your support, I'll be able to enjoy
      a cup of coffee ☕️ as I take in the sights and sounds of the city. Thank
      you for helping me make the most of my travels!
      <img
        src='https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/uozz7Eg-cMn.png'
        alt='brandenburger-tor-icon'
      />
    </p>
    <p>
      <a
        href='https://www.paypal.com/paypalme/tainkrios'
        target='_blank'
        rel='noopener noreferrer'
      >
        PayPal
      </a>
    </p>
    <p>
      <a
        href='https://revolut.me/tainkrios'
        target='_blank'
        rel='noopener noreferrer'
      >
        Revolut
      </a>
    </p>
  </div>
)

export const Burger = () => {
  const { dark } = useContext(ThemeContext)
  const [showSidebar, setShowSidebar] = useState(false)

  const toggleSidebar = useCallback(() => {
    setShowSidebar((prevShowSidebar) => !prevShowSidebar)
  }, [])

  const closeSidebar = useCallback(() => {
    setShowSidebar(false)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && showSidebar) {
        closeSidebar()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [showSidebar, closeSidebar])

  const sidebarContent = useMemo(() => <SidebarContent />, [])

  return (
    <div className={`burger ${dark ? 'dark' : ''}`}>
      <button
        onClick={toggleSidebar}
        aria-expanded={showSidebar}
        aria-controls='sidebar'
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div
        id='sidebar'
        className={`sidebar ${showSidebar ? 'show' : ''} ${dark ? 'dark' : ''}`}
      >
        {sidebarContent}
      </div>
      <div
        className={`overlay ${showSidebar ? 'show' : ''}`}
        onClick={toggleSidebar}
        aria-hidden={!showSidebar}
      ></div>
    </div>
  )
}

Burger.propTypes = {
  dark: PropTypes.bool,
}
