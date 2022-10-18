import React, { useState } from 'react'
import ReactMapGL, { GeolocateControl } from 'react-map-gl'
import { CoffeeMarker } from './CoffeeMarker'
import 'mapbox-gl/dist/mapbox-gl.css'
import places from './../assets/coffee.json'
import './Map.css'

export const Map = ({ saveNewPlaceChange }) => {
  const [viewport, setViewport] = useState({
    latitude: 52.517,
    longitude: 13.3888,
    zoom: 13,
    passive: true,
    customAttribution: 'designed by Me',
  })

  const mapStyles = {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
  }

  return (
    <>
      <ReactMapGL
        style={mapStyles}
        {...viewport}
        onMove={(evt) => setViewport(evt.viewport)}
        mapboxAccessToken='pk.eyJ1IjoidGFpbmtyaW9zIiwiYSI6ImNsOTF5dzh4ODBmeW8zemxjazZsOXQwNmcifQ.JLO9VoBZ8G4yv4iKdqmsrg'
        mapStyle='mapbox://styles/mapbox/light-v10'
        onViewportChange={(viewport) => {
          setViewport(viewport)
        }}
      >
        {places.coffeePlaces.map((place) => (
          <CoffeeMarker
            key={place.uid}
            placeData={place}
            changePlace={saveNewPlaceChange}
          />
        ))}
        <GeolocateControl />
      </ReactMapGL>
    </>
  )
}
