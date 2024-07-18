import { useCallback, useContext } from 'react'
import PropTypes from 'prop-types'

import { ThemeContext } from 'Contexts/ThemeContext'

import { Marker } from 'react-map-gl'

import { useFavoritesContext } from 'Contexts/FavoritesContext'

import './CoffeeMarker.css'

export const CoffeeMarker = ({
  longitude,
  latitude,
  placeData,
  changePlace,
  map,
}) => {
  const { dark } = useContext(ThemeContext)
  const { favorites } = useFavoritesContext()

  const handleClick = useCallback(() => {
    changePlace({
      properties: placeData.properties,
      latitude,
      longitude,
    })

    if (map) {
      map.flyTo({
        center: [longitude, latitude],
      })
    }
  }, [changePlace, placeData, latitude, longitude, map])

  const isFavorite = favorites?.includes(placeData.properties.placeId)

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        handleClick()
      }
    },
    [handleClick],
  )

  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
      onClick={handleClick}
    >
      <div
        className={`marker ${dark ? 'dark' : ''}`}
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role='button'
        aria-label={`Marker for ${placeData.properties.name}`}
      >
        <button className={`markerColor ${isFavorite ? 'fav' : ''}`}></button>
        <span>{placeData.properties.name}</span>
      </div>
    </Marker>
  )
}

CoffeeMarker.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  placeData: PropTypes.shape({
    properties: PropTypes.shape({
      placeId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  changePlace: PropTypes.func.isRequired,
  map: PropTypes.object,
}
