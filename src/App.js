import React, { useState } from 'react'
import ReactMapGL, {
  NavigationControl,
  GeolocateControl,
  Marker,
} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import places from './coffee.json'
import coffeeIcon from './assets/coffeeIcon.svg'
import { Nav } from './components/Nav'
import './App.css'

export const App = () => {
  const [viewport, setViewport] = useState({
    latitude: 52.543,
    longitude: 13.437,
    zoom: 14,
    passive: true,
  })

  const mapStyles = {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
  }

  return (
    <div>
      <Nav />
      <ReactMapGL
        style={mapStyles}
        {...viewport}
        onMove={(evt) => setViewport(evt.viewport)}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        onViewportChange={(viewport) => {
          setViewport(viewport)
        }}
      >
        {places.coffeePlaces.map((place) => (
          <Marker
            key={place.uid}
            latitude={place.lat}
            longitude={place.lon}
          >
            <button>
              <img
                src={coffeeIcon}
                alt='coffeeIcon'
              />
            </button>
          </Marker>
        ))}
        <GeolocateControl position='bottom-right' />
        <NavigationControl position='bottom-right' />
      </ReactMapGL>
    </div>
  )
}
