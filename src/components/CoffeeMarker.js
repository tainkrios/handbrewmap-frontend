import coffeeIcon from './../assets/coffeeIcon.svg'
import { Marker } from 'react-map-gl'

export const CoffeeMarker = ({ placeData, changePlace }) => {
  return (
    <Marker
      latitude={placeData.lat}
      longitude={placeData.lon}
    >
      <button
        onClick={() => {
          changePlace(placeData)
        }}
      >
        <img
          src={coffeeIcon}
          alt='coffeeIcon'
        />
      </button>
    </Marker>
  )
}
