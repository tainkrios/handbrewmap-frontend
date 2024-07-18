import { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { useFavorites } from 'Hooks/useFavorites'

export const FavoritesContext = createContext()

export const FavoritesProvider = ({ children }) => {
  const favoritesHook = useFavorites()

  return (
    <FavoritesContext.Provider value={favoritesHook}>
      {children}
    </FavoritesContext.Provider>
  )
}

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useFavoritesContext = () => useContext(FavoritesContext)
