import './SelectedPlace.css'
import { FavoriteIcon } from './../assets/FavoriteIcon'
import { useState, useEffect } from 'react'

export const SelectedPlace = ({ data, setIsFav }) => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  )


  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites'))
    if (favorites) {
      setFavorites(favorites)
    }
  }, [])

  const addFavorites = () => {
    if (!favorites?.includes(data.placeId)) {
      setFavorites([...favorites, data.placeId])
      setIsFav(!isFavorite)
    } else {
      const unFavorites = favorites.filter((value) => value !== data.placeId)
      setFavorites(unFavorites)
      setIsFav(!isFavorite)
    }
  }

  const isFavorite = favorites?.includes(data.placeId)

  return (
    <div className='selectedPlaces'>
      <div className='img-container'>
        <img
          src={require(`./../assets/img/${data.img_src}.jpg`)}
          alt='PlaceView'
        />
      </div>
      <div>
        <a
          href={data.contact_website}
          target='_blank'
          rel='noopener noreferrer'
        >
          <h2>{data.name}</h2>
        </a>
        <p>{`📍${data.addr_street} ${data.addr_housenumber}`}</p>
      </div>
      <div
        onClick={addFavorites}
        className={isFavorite ? 'favorite_fill' : 'favorite'}
      >
        <FavoriteIcon />
      </div>
    </div>
  )
}
