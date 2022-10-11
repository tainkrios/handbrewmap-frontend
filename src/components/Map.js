import React, { useState, useEffect } from 'react'
import ReactMapGL from 'react-map-gl'
import { CoffeeMarker } from './CoffeeMarker'
import 'mapbox-gl/dist/mapbox-gl.css'
import places from './../assets/coffee.json'
// import { SelectedPlace } from './SelectedPlace'

export const Map = (props) => {
  const [viewport, setViewport] = useState({
    latitude: 52.517,
    longitude: 13.3888,
    zoom: 13,
    passive: true,
  })

  const [newPlace, setNewPlace] = useState(null)

  useEffect(() => {
    if (newPlace) {
      setNewPlace(newPlace)
    }
  }, [newPlace])

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
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
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
          changePlace={(newPlace) => setNewPlace(newPlace)}
        />
      ))}
    </ReactMapGL>
  )
}
