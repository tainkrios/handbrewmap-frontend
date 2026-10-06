import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react'
import { PropTypes } from 'prop-types'

import { ThemeContext } from 'Contexts/ThemeContext'
import { FavoritesContext } from 'Contexts/FavoritesContext'

import ReactMapGL, { GeolocateControl, Marker } from 'react-map-gl'
import useSupercluster from 'use-supercluster'

import { CoffeeMarker } from 'Components/coffeeMarker'

import { getPlaces } from '../../../firebase/getPlaces'

import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css'

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_APP_MAPBOX_API_KEY

const INITIAL_VIEWPORT = {
  latitude: 52.517,
  longitude: 13.3879,
  zoom: 13,
  passive: true,
}

const MAP_STYLES = {
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  top: 0,
}

export const Map = ({ saveNewPlaceChange }) => {
  const { dark } = useContext(ThemeContext)
  const { favorites } = useContext(FavoritesContext)
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT)
  const [placesData, setPlacesData] = useState([])
  const [lastDoc, setLastDoc] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const mapRef = useRef()
  const loadMoreRef = useRef()
  const controllerRef = useRef(new AbortController())

  const BATCH_SIZE = 50

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchPlaces = useCallback(async (cursorDoc = null, isInitial = false) => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    try {
      const { documents, lastDoc: newLastDoc } = await getPlaces(
        BATCH_SIZE,
        cursorDoc,
        controllerRef.current.signal,
      )

      if (documents.length < BATCH_SIZE) {
        setHasMore(false)
      }

      setLastDoc(newLastDoc)
      setPlacesData((prev) =>
        isInitial ? documents : [...prev, ...documents],
      )
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error(error)
      }
    } finally {
      setIsLoading(false)
    }
  }, [hasMore])

  useEffect(() => {
    fetchPlaces(null, true)
    const controller = controllerRef.current
    return () => {
      controller.abort()
    }
  }, [fetchPlaces])

  useEffect(() => {
    const handleIntersection = (entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        fetchPlaces(lastDoc, false)
      }
    }

    const observer = new IntersectionObserver(handleIntersection)

    const element = loadMoreRef.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [lastDoc, hasMore, isLoading, fetchPlaces])

  const points = placesData.map((place) => ({
    type: 'Feature',
    properties: {
      cluster: false,
      placeId: place.id,
      google_place_id: place.place_id,
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

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'ArrowUp') {
      setViewport((prev) => ({ ...prev, latitude: prev.latitude + 0.001 }))
    } else if (event.key === 'ArrowDown') {
      setViewport((prev) => ({ ...prev, latitude: prev.latitude - 0.001 }))
    } else if (event.key === 'ArrowLeft') {
      setViewport((prev) => ({ ...prev, longitude: prev.longitude - 0.001 }))
    } else if (event.key === 'ArrowRight') {
      setViewport((prev) => ({ ...prev, longitude: prev.longitude + 0.001 }))
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.getMap().easeTo({
        duration: 500,
        easing: (t) => t * (2 - t),
        transition: {
          style: dark
            ? 'mapbox://styles/mapbox/dark-v11'
            : 'mapbox://styles/mapbox/light-v11',
        },
      })
    }
  }, [dark])

  return (
    <>
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        maxZoom={20}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        onMove={(evt) => {
          setViewport(evt.viewState)
          setBounds(mapRef.current.getMap().getBounds().toArray().flat())
        }}
        mapStyle={
          dark
            ? 'mapbox://styles/mapbox/dark-v11'
            : 'mapbox://styles/mapbox/light-v11'
        }
        style={MAP_STYLES}
      >
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties

          if (isCluster) {
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
                  onClick={() => {
                    mapRef.current.flyTo({
                      center: [longitude, latitude],
                      zoom: Math.min(
                        supercluster.getClusterExpansionZoom(cluster.id),
                        20,
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
              dark={dark}
            />
          )
        })}
        <GeolocateControl />
        {isLoading && (
          <div className={`loading-indicator ${dark ? 'dark' : ''}`}>
            <div className='spinner'></div>
          </div>
        )}
      </ReactMapGL>
      <div ref={loadMoreRef} className='load-more-sentinel'></div>
    </>
  )
}

Map.propTypes = {
  saveNewPlaceChange: PropTypes.func.isRequired,
}
