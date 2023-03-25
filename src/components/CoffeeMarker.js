import { Marker } from 'react-map-gl'
import './CoffeeMarker.css'

export const CoffeeMarker = ({
  longitude,
  latitude,
  placeData,
  changePlace,
  map,
  favorites,
  dark,
}) => {
  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
      onClick={() => {
        changePlace({
          properties: placeData.properties,
          latitude,
          longitude,
        })
        if (map) {
          map.flyTo({
            center: [longitude, latitude],
          })
        }
      }}
    >
      <div className={dark ? 'marker dark' : 'marker'}>
        <button
          className={
            favorites?.includes(placeData.properties.placeId)
              ? 'markerColor fav'
              : 'markerColor'
          }
        />
        <span>{placeData.properties.name}</span>
      </div>
    </Marker>
  )
}
