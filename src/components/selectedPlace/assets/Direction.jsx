import { DirectionIcon } from './DirectionIcon'
import './Direction.css'

export const Direction = ({ lat, lng }) => {
  const mapsSelector = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    if (isMobile) {
      window.open(`geo:${lat},${lng}?q=${lat},${lng}&z=15`)
    } else {
      window.open(`https://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`)
    }
  }

  return (
    <button
      className='direction'
      onClick={mapsSelector}
    >
      <DirectionIcon />
    </button>
  )
}
