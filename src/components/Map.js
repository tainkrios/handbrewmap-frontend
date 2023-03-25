import React, { useRef, useState, useEffect } from 'react'
import ReactMapGL, { GeolocateControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css'
import { Clusters } from './Clusters'

export const Map = ({ saveNewPlaceChange, favorites, dark }) => {
  const [viewport, setViewport] = useState({
    latitude: 52.517,
    longitude: 13.3879,
    zoom: 13,
    passive: true,
  })


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setViewport({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 13,
            passive: true,
          })
        },
        (error) => console.error(error)
      )
    }
  }, [])

  const mapStyles = {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
  }

  const mapRef = useRef()

  
  const [bounds, setBounds] = useState([
    13.344915992258336, 52.498172201467696, 13.430884007741298,
    52.53581973404496,
  ])

  return (
    <ReactMapGL
      ref={mapRef}
      {...viewport}
      maxZoom={20}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onMove={(evt) => {
        setViewport(evt.viewState)
        setBounds(mapRef.current.getMap().getBounds().toArray().flat())
      }}
      mapStyle={
        dark
          ? 'mapbox://styles/mapbox/dark-v11'
          : 'mapbox://styles/mapbox/light-v11'
      }
      style={mapStyles}
    >
      <Clusters
        bounds={bounds}
        viewport={viewport}
        mapRef={mapRef}
        saveNewPlaceChange={saveNewPlaceChange}
        dark={dark}
        favorites={favorites}
      />
      <GeolocateControl />
    </ReactMapGL>
  )
}
