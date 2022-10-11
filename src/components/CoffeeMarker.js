import coffeeIcon from './../assets/coffeeIcon.svg'
import { Marker } from 'react-map-gl'

export const CoffeeMarker = (props) => {
  return (
    <Marker
      latitude={props.placeData.lat}
      longitude={props.placeData.lon}
    >
      <button
        onClick={() => {
          props.changePlace(props.placeData)
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
