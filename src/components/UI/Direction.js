import './Direction.css'
import { DirectionIcon } from '../../assets/DirectionIcon'

export const Direction = ({ lat, lng }) => {
  const mapsSelector = () => {
    if (
      navigator.platform.indexOf('iPhone') !== -1 ||
      navigator.platform.indexOf('iPad') !== -1 ||
      navigator.platform.indexOf('iPod') !== -1
    ) {
      window.open(`maps://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`)
    } else {
      window.open(`https://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`)
    }
  }

  return (
    <button
      className='showFavButton'
      onClick={mapsSelector}
    >
      <DirectionIcon className='showFavButton_svg' />
    </button>
  )
}
