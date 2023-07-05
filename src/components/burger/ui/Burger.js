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
          <p>Donation</p>
          <p>
            <a href='https://www.paypal.com/paypalme/tainkrios'>PayPal</a>
          </p>
          <p>
            <a href='https://revolut.me/tainkrios'>Revolut</a>
          </p>
          <p>
            All money will go to buy a cup of coffee ☕️ and explore about new
            places in Berlin{' '}
            <span>
              <img
                src='https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/uozz7Eg-cMn.png'
                alt='brandenburger-tor-icon'
              />
            </span>
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
