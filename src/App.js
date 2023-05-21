import { useState } from 'react'

import { Map } from 'components/map'
import { Nav } from 'components/nav'
import { SelectedPlace } from 'components/selectedPlace'

import 'mapbox-gl/dist/mapbox-gl.css'
import './App.css'

export const App = () => {
  const [dark, setDark] = useState(() =>
    JSON.parse(localStorage.getItem('dark')),
  )
  const [newPlace, setNewPlace] = useState(null)
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || [],
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
