import 'mapbox-gl/dist/mapbox-gl.css'
import { Nav } from './components/Nav'
import { Map } from './components/Map'
import { SelectedPlace } from './components/SelectedPlace'
import { useState } from 'react'
import './App.css'

export const App = () => {
  const [dark, setDark] = useState(false)
  const [newPlace, setNewPlace] = useState(null)
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  )

  return (
    <>
      <Nav
        dark={dark}
        setDark={setDark}
      />
      <Map
        favorites={favorites}
        saveNewPlaceChange={setNewPlace}
        dark={dark}
      />
      {newPlace && (
        <SelectedPlace
          data={newPlace}
          onSetNewPlace={setNewPlace}
          setFavorites={setFavorites}
          favorites={favorites}
          dark={dark}
        />
      )}
    </>
  )
}
