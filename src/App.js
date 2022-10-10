import 'mapbox-gl/dist/mapbox-gl.css'
import { Nav } from './components/Nav'
import { Map } from './components/Map'
import './App.css'
import { SelectedPlace } from './components/SelectedPlace'

export const App = () => {

  return (
    <>
      <Nav />
      <Map />
      <SelectedPlace />
    </>
  )
}
