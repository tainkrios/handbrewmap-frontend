import { useContext } from 'react'

import { ThemeContext } from '../../../contexts/ThemeContext'

import { Burger } from 'Components/burger'

import { LightMode } from '../assets/LightMode'
import { DarkMode } from '../assets/DarkMode'

import './Nav.css'

export const Nav = () => {
  const { dark, setDark } = useContext(ThemeContext)

  const toggleTheme = () => {
    const isDark = !dark
    setDark(isDark)
    localStorage.setItem('dark', JSON.stringify(isDark))
  }

  return (
    <div className={dark ? 'navigation dark' : 'navigation'}>
      <h1>Hand Brew Map</h1>
      <div className='button-nav-group'>
        <button onClick={toggleTheme}>
          {dark ? <DarkMode /> : <LightMode />}
        </button>
        <Burger />
      </div>
    </div>
  )
}
