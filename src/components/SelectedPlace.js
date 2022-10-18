import './SelectedPlace.css'
// import favorite from './../assets/favorite_icon.svg'
import { FavoriteIcon } from './../assets/FavoriteIcon'
import { useState, useEffect } from 'react'

export const SelectedPlace = ({ data }) => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorites = () => {
   setFavorites([...favorites, data.uid])
  }
  
  return (
    <div className='selectedPlaces'>
      <div className='img-container'>
        <img
          src={require(`./../assets/img/${data.img_src}.jpg`)}
          alt='PlaceView'
        />
      </div>
      <div>
        <h2>{data.name}</h2>
        <p>{data.description}</p>
        <p>{`📍${data.addr_street} ${data.addr_housenumber}`}</p>
      </div>
      <div
        onClick={addFavorites}
        className='favorite'
      >
        <FavoriteIcon />
      </div>
    </div>
  )
}
