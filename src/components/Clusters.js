import { useState, useEffect } from 'react'
import useSupercluster from 'use-supercluster'
import { Marker } from 'react-map-gl'
import { getPlaces } from '../firebase/getPlaces'
import { CoffeeMarker } from './CoffeeMarker'

export const Clusters = ({
  bounds,
  viewport,
  mapRef,
  favorites,
  saveNewPlaceChange,
  dark,
}) => {
  const [placesData, setPlacesData] = useState([])

  useEffect(() => {
    const fetchPlaces = async () => {
      const { documents } = await getPlaces()
      setPlacesData(documents)
    }
    fetchPlaces()
  }, [])

  const points = placesData.map((place) => ({
    type: 'Feature',
    properties: {
      cluster: false,
      placeId: place.id,
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

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 },
  })

  return (
    <div>
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
            dark={dark}
          />
        )
      })}
    </div>
  )
}
