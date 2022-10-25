import React, { useRef, useState } from 'react'
import ReactMapGL, { GeolocateControl, Marker } from 'react-map-gl'
import { CoffeeMarker } from './CoffeeMarker'
import useSupercluster from 'use-supercluster'
import places from './../assets/coffee.json'
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css'

export const Map = ({ saveNewPlaceChange }) => {
  const [viewState, setViewState] = useState({
    latitude: 52.517,
    longitude: 13.3879,
    zoom: 13,
    passive: true,
  })

  const mapStyles = {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
  }

  // const {current: map} = useMap()

  const mapRef = useRef()

  const points = places.coffeePlaces.map((place) => ({
    type: 'Feature',
    properties: {
      cluster: false,
      placeId: place.uid,
      category: 'coffee-place',
      img_src: place.img_src,
      addr_housenumber: place.addr_housenumber,
      addr_street: place.addr_street,
      name: place.name,
      contact_website: place.contact_website,
    },
    geometry: {
      type: 'Point',
      coordinates: [place.lon, place.lat],
    },
  }))

  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null

    // console.log(bounds)

  const { clusters, supercluster } = useSupercluster({
    points,
    zoom: viewState.zoom,
    bounds,
    options: { radius: 75, maxZoom: 20 },
  })
  console.log(points)
  console.log(clusters)

  return (
    <ReactMapGL
      {...viewState}
      maxZoom={20}
      mapboxAccessToken='pk.eyJ1IjoidGFpbmtyaW9zIiwiYSI6ImNsOTF5dzh4ODBmeW8zemxjazZsOXQwNmcifQ.JLO9VoBZ8G4yv4iKdqmsrg'
      onMove={(evt) => setViewState(evt.viewState)}
      onViewportChange={(viewState) => setViewState(viewState)}
      mapStyle='mapbox://styles/mapbox/light-v10'
      style={mapStyles}
      ref={mapRef}
    >
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              latitude={latitude}
              longitude={longitude}
              onClick={mapRef.current.flyTo({
                center: [longitude, latitude],
                zoom: Math.min(
                  supercluster.getClusterExpansionZoom(cluster.id),
                  20
                ),
                duration: 'auto',
                speed: 2,
              })}
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
            placeData={cluster}
            changePlace={saveNewPlaceChange}
            onClick={mapRef.current.flyTo({
              center: [longitude, latitude],
              zoom: Math.min(supercluster.getClusterExpansionZoom(cluster.placeId), 20),
              duration: 'auto',
              speed: 2,
            })}
          />
        )
      })}
      <GeolocateControl />
    </ReactMapGL>
  )
}
