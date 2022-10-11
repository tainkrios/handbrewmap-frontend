import 'mapbox-gl/dist/mapbox-gl.css'
import { Nav } from './components/Nav'
import { Map } from './components/Map'
import { SelectedPlace } from './components/SelectedPlace'
import { useEffect, useState } from 'react'
import './App.css'

export const App = () => {
  const [newPlace, setNewPlace] = useState(null)

  useEffect(() => {
    if (newPlace) {
      setNewPlace(newPlace)
    }
  }, [newPlace])

  return (
    <>
      <Nav />
      <Map saveNewPlaceChange={(newPlase) => setNewPlace(newPlase)} />
      {newPlace && <SelectedPlace data={newPlace} />}
    </>
  )
}
