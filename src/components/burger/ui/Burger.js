import { useState } from 'react'
import './Burger.css'

export const Burger = () => {
  const [showSidebar, setShowSidebar] = useState(false)

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }
  return (
    <>
      <button
        onClick={toggleSidebar}
        className='burger'
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
        <div className='sidebar-content'>
          <p>
            If you have any questions or suggestions, write ➡️{' '}
            <a href='https://wa.me/+79817618313'>@tainkrios</a>
          </p>
          <p>
            Your donation will help fund my adventures in Berlin as I explore
            new places and discover hidden gems. With your support, I'll be able
            to enjoy a cup of coffee ☕️ as I take in the sights and sounds of
            the city. Thank you for helping me make the most of my travels!
            <span>
              <img
                src='https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/uozz7Eg-cMn.png'
                alt='brandenburger-tor-icon'
              />
            </span>
          </p>
          <p>
            <a href='https://www.paypal.com/paypalme/tainkrios'>PayPal</a>
          </p>
          <p>
            <a href='https://revolut.me/tainkrios'>Revolut</a>
          </p>
        </div>
      </div>
      <div
        className={`overlay ${showSidebar ? 'show' : ''}`}
        onClick={toggleSidebar}
      ></div>
    </>
  )
}
