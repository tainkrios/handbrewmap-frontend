import React, { useRef, useState, useEffect } from 'react'
import ReactMapGL, { GeolocateControl, Marker } from 'react-map-gl'
import { CoffeeMarker } from './CoffeeMarker'
import useSupercluster from 'use-supercluster'
import places from './../assets/coffee.json'
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css'

export const Map = ({ saveNewPlaceChange }) => {
  const [viewport, setViewport] = useState({
    latitude: 52.517,
    longitude: 13.3879,
    zoom: 14,
    passive: true,
    // customAttribution: 'designed by Me',
  })

  useEffect(() => {
    setViewport(viewport)
  }, [viewport])

  const mapStyles = {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
  }

  const mapRef = useRef()

  const points = places.coffeePlaces.map((place) => ({
    type: 'Feature',
    properties: {
      cluster: false,
      placeId: place.uid,
      category: 'coffee-place',
    },
    geometry: {
      type: 'Point',
      coordinates: [place.lon, place.lat],
    },
  }))

  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null

  const { clusters } = useSupercluster({
    points,
    zoom: viewport.zoom,
    bounds,
    options: { radius: 75, maxZoom: 20 },
  })
  console.log(clusters.properties)

  return (
    <ReactMapGL
      style={mapStyles}
      initialViewState={viewport}
      maxZoom={20}
      onMove={(evt) => setViewport(evt.viewport)}
      mapboxAccessToken='pk.eyJ1IjoidGFpbmtyaW9zIiwiYSI6ImNsOTF5dzh4ODBmeW8zemxjazZsOXQwNmcifQ.JLO9VoBZ8G4yv4iKdqmsrg'
      onViewportChange={(viewport) => setViewport(viewport)}
      mapStyle='mapbox://styles/mapbox/dark-v10'
      ref={mapRef}
    >
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates
        const { place: isPlace, point_count: pointCount } = cluster.properties

        if (isPlace) {
          return (
            <Marker
              key={cluster.id}
              latitude={latitude}
              longitude={longitude}
            >
              <div
                className='cluster-marker'
                style={{
                  width: `${10 + (pointCount / points.length) * 20}px`,
                  height: `${10 + (pointCount / points.length) * 20}px`,
                }}
              >
                {pointCount}
              </div>
            </Marker>
          )
        }
        return (
          <CoffeeMarker
            key={cluster.placeId}
            longitude={longitude}
            latitude={latitude}
            changePlace={cluster}
          />
        )
      })}
      <GeolocateControl />
    </ReactMapGL>
  )
}
