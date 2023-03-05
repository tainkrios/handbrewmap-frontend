import React, { useRef, useState, useEffect } from 'react'
import ReactMapGL, { GeolocateControl, Marker } from 'react-map-gl'
import { CoffeeMarker } from './CoffeeMarker'
import useSupercluster from 'use-supercluster'
import { getPlaces } from '../firebase/getPlaces'
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css'

export const Map = ({ saveNewPlaceChange, favorites }) => {
  const [viewport, setViewport] = useState({
    latitude: 52.517,
    longitude: 13.3879,
    zoom: 13,
    passive: true,
  })

  const [placesData, setPlacesData] = useState([])

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
        (error) => console.log(error)
      )
    }
    const fetchPlaces = async () => {
      const { documents } = await getPlaces()
      setPlacesData(documents)
    }
    fetchPlaces()
  }, [])

  // console.log(placesData);

  const mapStyles = {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
  }

  const mapRef = useRef()

  const points = placesData.map((place) => ({
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
      opening_hours: place.opening_hours,
    },
    geometry: {
      type: 'Point',
      coordinates: [parseFloat(place.lon), parseFloat(place.lat)],
    },
  }))

  const [bounds, setBounds] = useState([
    13.344915992258336, 52.498172201467696, 13.430884007741298,
    52.53581973404496,
  ])

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 },
  })

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
      mapStyle='mapbox://styles/mapbox/light-v10'
      style={mapStyles}
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
            >
              <div
                className='cluster-marker'
                style={{
                  width: `${10 + (pointCount / points.length) * 20}px`,
                  height: `${10 + (pointCount / points.length) * 20}px`,
                }}
                onClick={() => {
                  mapRef.current.flyTo({
                    center: [longitude, latitude],
                    zoom: Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    ),
                    duration: 1000,
                  })
                }}
              >
                {pointCount}
              </div>
            </Marker>
          )
        }
        return (
          <CoffeeMarker
            key={cluster.properties.placeId}
            longitude={longitude}
            latitude={latitude}
            placeData={cluster}
            changePlace={saveNewPlaceChange}
            map={mapRef.current}
            favorites={favorites}
          />
        )
      })}
      <GeolocateControl />
      {/* <ShowFavoritesButton /> */}
    </ReactMapGL>
  )
}
