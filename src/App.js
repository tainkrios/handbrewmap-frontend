import 'mapbox-gl/dist/mapbox-gl.css'
import { Nav } from './components/Nav'
import { Map } from './components/Map'
import { SelectedPlace } from './components/SelectedPlace'
import { useState } from 'react'
import './App.css'

export const App = () => {
  const [newPlace, setNewPlace] = useState(null)
  // const [isFav, setIsFav] = useState(null)

  return (
    <>
      <Nav />
      <Map
        saveNewPlaceChange={setNewPlace}
        // isFav={isFav}
      />
      {newPlace && (
        <SelectedPlace
          data={newPlace}
          // setIsFav={setIsFav}
        />
      )}
    </>
  )
}
