import { Marker } from 'react-map-gl'
import './CoffeeMarker.css'

export const CoffeeMarker = ({ placeData, changePlace }) => {
  return (
    <Marker
      latitude={placeData.lat}
      longitude={placeData.lon}
    >
      <button
      className='markerColor'
        onClick={() => {
          changePlace(placeData)
        }}
      >
        {/* <p>☕</p> */}
        {/* <img
          src={coffeeIcon}
          alt='coffeeIcon'
        /> */}
      </button>
    </Marker>
  )
}
