import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useContext,
  Suspense,
  lazy,
} from 'react'
import PropTypes from 'prop-types'

import { ThemeContext } from 'Contexts/ThemeContext'
import { useFavoritesContext } from 'Contexts/FavoritesContext'

import { getItemFromStorage } from 'Firebase/getStorageItem'

import { Direction } from '../assets/Direction'
import { CloseButton } from '../assets/CloseButton'
import { Instagram } from '../assets/Instagram'
import { FavoriteIcon } from '../assets/FavoriteIcon'

import './SelectedPlace.css'

const IsOpen = lazy(() =>
  import('Components/isOpen').then((module) => ({ default: module.IsOpen })),
)

const IsOpenSkeleton = ({ dark }) => {
  return (
    <div className={`isopen-skeleton ${dark ? 'dark' : ''}`}>
      <div className='skeleton-text'></div>
    </div>
  )
}

export const SelectedPlace = ({ data, onSetNewPlace }) => {
  const { dark } = useContext(ThemeContext)
  const { favorites, addToFavorites, removeFromFavorites } =
    useFavoritesContext()

  const [file, setFile] = useState({})

  const isFavorite = favorites.includes(data.properties.placeId)

  useEffect(() => {}, [favorites])

  const handleFavoriteClick = useCallback(() => {
    if (isFavorite) {
      removeFromFavorites(data.properties.placeId)
    } else {
      addToFavorites(data.properties.placeId)
    }
  }, [isFavorite, data.properties.placeId, addToFavorites, removeFromFavorites])

  useEffect(() => {
    const fetchStorage = async () => {
      try {
        const { url } = await getItemFromStorage(
          `${data.properties.img_src} .jpg`,
        )
        setFile(url)
      } catch (error) {
        console.error('Error fetching image:', error)
        setFile(null)
      }
    }
    fetchStorage()
  }, [data.properties.img_src])

  const fontSizeStyle = useMemo(
    () => ({
      fontSize: data.properties.name.length >= 14 ? '15px' : '18px',
    }),
    [data.properties.name],
  )

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
            {file ? (
              <img
                src={file}
                alt='PlaceView'
              />
            ) : (
              <p>Image not available</p>
            )}
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
            <Suspense fallback={<IsOpenSkeleton dark={dark} />}>
              <IsOpen
                placeId={data.properties.google_place_id}
                weekDays={data.properties.opening_hours}
              />
            </Suspense>
            <p className='address'>{`📍${data.properties.addr_street} ${data.properties.addr_housenumber}`}</p>
          </div>
        </div>
        <div>
          <div
            onClick={handleFavoriteClick}
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

SelectedPlace.propTypes = {
  data: PropTypes.shape({
    properties: PropTypes.shape({
      placeId: PropTypes.string.isRequired,
      img_src: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      contact_website: PropTypes.string,
      google_place_id: PropTypes.string.isRequired,
      opening_hours: PropTypes.object,
      addr_street: PropTypes.string.isRequired,
      addr_housenumber: PropTypes.string.isRequired,
    }).isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  onSetNewPlace: PropTypes.func.isRequired,
}

IsOpenSkeleton.propTypes = {
  dark: PropTypes.bool.isRequired,
}
