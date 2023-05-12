import { useEffect, useState } from 'react'
import { Direction } from '../assets/Direction'
import { CloseButton } from '../assets/CloseButton'
import { Instagram } from '../assets/Instagram'
import { FavoriteIcon } from '../assets/FavoriteIcon'
import { IsOpen } from 'components/isOpen'
import { getStorage } from '../../../firebase/getStorage'
import './SelectedPlace.css'

export const SelectedPlace = ({
  data,
  favorites,
  setFavorites,
  onSetNewPlace,
  dark,
}) => {
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites'))
    if (favorites) {
      setFavorites(favorites)
    }
  }, [setFavorites])

  const addFavorites = () => {
    if (!favorites?.includes(data.properties.placeId)) {
      setFavorites([...favorites, data.properties.placeId])
    } else {
      const unFavorites = favorites.filter(
        (value) => value !== data.properties.placeId
      )
      setFavorites(unFavorites)
    }
  }

  const [file, setFile] = useState({})

  useEffect(() => {
    const fetchStorage = async () => {
      try {
        const { filesArr } = await getStorage()
        const document = filesArr.find(
          (file) => file.name === `${data.properties.img_src} .jpg`
        )
        setFile(document.url)
      } catch (error) {
        console.error(error)
      }
    }
    fetchStorage()
  }, [data.properties.img_src])

  const fontSizeLength = data.properties.name.length
  const fontSizeStyle = {
    fontSize: fontSizeLength >= 14 ? '15px' : '18px',
  }

  const isFavorite = favorites?.includes(data.properties.placeId)

  return (
    <div className='wrapper'>
      <div className={dark ? 'closeButton dark' : 'closeButton'}>
        <CloseButton
          onClick={() => {
            onSetNewPlace(null)
          }}
        />
      </div>
      <div className={dark ? 'selectedPlaces dark' : 'selectedPlaces'}>
        <div className='description-container'>
          <div className='img-container'>
            <img
              src={file}
              alt='PlaceView'
            />
          </div>
          <div className='description'>
            <a
              href={data.properties.contact_website}
              target='_blank'
              rel='noopener noreferrer'
            >
              <h3 style={fontSizeStyle}>
                <Instagram />
                {data.properties.name}
              </h3>
            </a>
            <IsOpen weekDays={data.properties.opening_hours} />
            <p className='adress'>{`📍${data.properties.addr_street} ${data.properties.addr_housenumber}`}</p>
          </div>
        </div>
        <div>
          <div
            onClick={addFavorites}
            className={isFavorite ? 'favorite fill' : 'favorite'}
          >
            <FavoriteIcon />
          </div>
          <Direction
            className='direction'
            lat={data.latitude}
            lng={data.longitude}
          />
        </div>
      </div>
    </div>
  )
}
