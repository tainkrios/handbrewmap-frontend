import './Nav.css'

export const Nav = ({ dark, setDark }) => {
  return (
    <>
      <h1 className={dark ? 'dark' : ''}>Berlin Coffee Map</h1>
    </>
  )
}
