import './Nav.css'
import { DarkMode } from './UI/DarkMode'
import { LightMode } from './UI/LightMode'

export const Nav = ({ dark, setDark }) => {
  const toggleTheme = () => {
    setDark(!dark)
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
