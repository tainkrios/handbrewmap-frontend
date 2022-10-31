import { Marker } from 'react-map-gl'
import './CoffeeMarker.css'

export const CoffeeMarker = ({
  longitude,
  latitude,
  placeData,
  changePlace,
  map,
  // className,
}) => {
  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
    >
      <button
        className={isFav ? 'markerColor-fav' : 'markerColor'}
        onClick={() => {
          changePlace(placeData.properties)
          if (map) {
            map.flyTo({
              center: [longitude, latitude],
            })
          }
        }}
      ></button>
    </Marker>
  )
}
