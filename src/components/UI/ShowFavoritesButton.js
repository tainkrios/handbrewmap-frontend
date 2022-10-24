import './ShowFavoritesButton.css'
import { FavoriteIcon } from './../../assets/FavoriteIcon';

export const ShowFavoritesButton = (props) => {
  return (
    <button className='showFavButton' onClick={props.onClick}>
      <FavoriteIcon className='showFavButton_svg' />
    </button>
  )
}