import { DarkMode } from '../assets/DarkMode'
import { LightMode } from '../assets/LightMode'
import './Nav.css'

export const Nav = ({ dark, setDark }) => {
  const toggleTheme = () => {
    const isDark = dark === false ? true : false
    setDark(isDark)
    localStorage.setItem('dark', JSON.stringify(isDark))
  }
  return (
    <>
      <div className={dark ? 'navigation dark' : 'navigation'}>
        <h1>Berlin Coffee Map</h1>
        <button onClick={toggleTheme}>
          {dark ? <DarkMode /> : <LightMode />}
        </button>
      </div>
    </>
  )
}
