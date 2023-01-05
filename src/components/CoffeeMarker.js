import { Marker } from 'react-map-gl'
import './CoffeeMarker.css'

export const CoffeeMarker = ({
  longitude,
  latitude,
  placeData,
  changePlace,
  map,
  favorites,
}) => {
  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
    >
      <div className={'marker'} >
        <button
          className={
            favorites?.includes(placeData.properties.placeId)
              ? 'markerColor fav'
              : 'markerColor'
          }
          onClick={() => {
            changePlace({
              properties: placeData.properties,
              latitude,
              longitude
            })
            if (map) {
              map.flyTo({
                center: [longitude, latitude],
              })
            }
          }}
        >
          {/* {placeData.properties.name} */}
        </button>
        <span>{placeData.properties.name}</span>
      </div>
    </Marker>
  )
}
