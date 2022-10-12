import React, { useState } from 'react'
import ReactMapGL from 'react-map-gl'
import { CoffeeMarker } from './CoffeeMarker'
import 'mapbox-gl/dist/mapbox-gl.css'
import places from './../assets/coffee.json'

export const Map = (props) => {
  const [viewport, setViewport] = useState({
    latitude: 52.517,
    longitude: 13.3888,
    zoom: 13,
    passive: true,
  })

  const [newPlace, setNewPlace] = useState(null)
  console.log('Map:' + newPlace)

  const mapStyles = {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
  }

  return (
    <ReactMapGL
      style={mapStyles}
      {...viewport}
      onMove={(evt) => setViewport(evt.viewport)}
      mapboxAccessToken='pk.eyJ1IjoidGFpbmtyaW9zIiwiYSI6ImNsOTF5dzh4ODBmeW8zemxjazZsOXQwNmcifQ.JLO9VoBZ8G4yv4iKdqmsrg'
      mapStyle='mapbox://styles/mapbox/streets-v11'
      onViewportChange={(viewport) => {
        setViewport(viewport)
      }}
      onNewPlaceChange={props.saveNewPlaceChange(newPlace)}
    >
      {places.coffeePlaces.map((place) => (
        <CoffeeMarker
          key={place.uid}
          placeData={place}
          changePlace={setNewPlace}
        />
      ))}
    </ReactMapGL>
  )
}
