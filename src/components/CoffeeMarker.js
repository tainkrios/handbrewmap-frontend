import { Marker } from 'react-map-gl'
import './CoffeeMarker.css'

export const CoffeeMarker = ({ longitude, latitude, placeData, changePlace }) => {
  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
    >
      <button
        className='markerColor'
        onClick={() => {
          changePlace(placeData.properties)
        }}
      ></button>
    </Marker>
  )
}
