import { useState } from 'react'

import { ThemeProvider } from 'Contexts/ThemeContext'
import { FavoritesProvider } from 'Contexts/FavoritesContext'

import { Map } from 'Components/map'
import { Nav } from 'Components/nav'
import { SelectedPlace } from 'Components/selectedPlace'

import 'mapbox-gl/dist/mapbox-gl.css'
import './App.css'

export const App = () => {
  const [newPlace, setNewPlace] = useState(null)

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Nav />
        <Map saveNewPlaceChange={setNewPlace} />
        {newPlace && (
          <SelectedPlace
            data={newPlace}
            onSetNewPlace={setNewPlace}
          />
        )}
      </FavoritesProvider>
    </ThemeProvider>
  )
}
