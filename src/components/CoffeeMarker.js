import { Marker } from 'react-map-gl'
import './CoffeeMarker.css'

export const CoffeeMarker = ({ longitude, latitude, cluster, changePlace }) => {
  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
    >
      <button
        className='markerColor'
        onClick={() => {
          changePlace(cluster)
        }}
      ></button>
    </Marker>
  )
}
