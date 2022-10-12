import 'mapbox-gl/dist/mapbox-gl.css'
import { Nav } from './components/Nav'
import { Map } from './components/Map'
import { SelectedPlace } from './components/SelectedPlace'
import { useState } from 'react'
import './App.css'

export const App = () => {
  const [newPlace, setNewPlace] = useState(null)
  console.log('App:' + newPlace) 

  return (
    <>
      <Nav />
      <Map saveNewPlaceChange={setNewPlace} />
      {newPlace && <SelectedPlace data={newPlace} />}
    </>
  )
}
